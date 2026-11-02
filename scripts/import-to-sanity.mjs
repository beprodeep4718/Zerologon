// Copies data/*.json and the photos in public/ into Sanity. Safe to run twice:
// Sanity de-duplicates uploads, single-instance documents are replaced, and
// events are matched by slug.
//
//   node --env-file=.env.local scripts/import-to-sanity.mjs --dry-run
//   node --env-file=.env.local scripts/import-to-sanity.mjs

import { createHash } from 'node:crypto';
import { createReadStream, existsSync, readFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import { createClient } from '@sanity/client';

const dryRun = process.argv.includes('--dry-run');
const root = join(import.meta.dirname, '..');

const readJson = (file) => JSON.parse(readFileSync(join(root, 'data', file), 'utf8'));
const publicPath = (src) => join(root, 'public', src);
const key = (value) => createHash('sha256').update(String(value)).digest('hex').slice(0, 12);

// Empty strings would fail Sanity's URL and email validation, so leave those fields unset.
const withoutEmpty = (object) =>
  Object.fromEntries(Object.entries(object).filter(([, value]) => value !== ''));

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
const token = process.env.SANITY_WRITE_TOKEN;

if (!dryRun && !(projectId && token)) {
  console.error('Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_WRITE_TOKEN in .env.local first.');
  process.exit(1);
}

const client = dryRun
  ? null
  : createClient({ projectId, dataset, token, apiVersion: '2026-02-01', useCdn: false });

const uploads = new Map();

async function uploadImage(src) {
  if (uploads.has(src)) return uploads.get(src);

  const path = publicPath(src);
  if (!existsSync(path)) throw new Error(`Photo not found: ${path}`);

  let ref = `dry-run-${key(src)}`;
  if (!dryRun) {
    const asset = await client.assets.upload('image', createReadStream(path), {
      filename: basename(path),
    });
    ref = asset._id;
  }

  uploads.set(src, ref);
  console.log(`  [${uploads.size}] ${basename(path)}`);
  return ref;
}

async function image(src, fields = {}, type = 'image') {
  return { _type: type, asset: { _type: 'reference', _ref: await uploadImage(src) }, ...fields };
}

const keyed = (items, keyOf) => items.map((item) => ({ _key: key(keyOf(item)), ...item }));

function timingOf({ date, datePrecision, dateToBeAnnounced }) {
  if (dateToBeAnnounced) return 'toBeAnnounced';
  if (!date) return 'academicYear';
  return datePrecision === 'month' ? 'month' : 'day';
}

async function buildSiteSettings() {
  const { about, socials, ...site } = readJson('site.json');
  return {
    _id: 'siteSettings',
    _type: 'siteSettings',
    ...withoutEmpty(site),
    join: withoutEmpty(site.join),
    about: {
      paragraphs: about.paragraphs,
      photo: await image(about.photo.src, { alt: about.photo.alt }, 'photo'),
    },
    socials: keyed(
      socials.map(({ label, url }) => ({ label, ...(url && { url }) })),
      (social) => social.label,
    ),
  };
}

async function buildTeam() {
  const members = [];
  for (const { name, role, batch, image: src } of readJson('members.json')) {
    members.push({
      _key: key(name),
      _type: 'member',
      name,
      role,
      batch,
      ...(src && { photo: await image(src) }),
    });
  }
  return { _id: 'team', _type: 'team', members };
}

async function buildGallery() {
  const photos = [];
  for (const { file, alt } of readJson('gallery.json')) {
    photos.push({ _key: key(file), ...(await image(`/Gallery/${file}`, { alt }, 'photo')) });
  }
  return { _id: 'gallery', _type: 'gallery', photos };
}

async function buildEvent({
  id,
  date,
  datePrecision,
  academicYear,
  dateToBeAnnounced,
  stats,
  links,
  photo,
  featured,
  ...fields
}) {
  return {
    _type: 'event',
    ...fields,
    slug: { _type: 'slug', current: id },
    timing: timingOf({ date, datePrecision, dateToBeAnnounced }),
    ...(date && { date }),
    ...(academicYear && { academicYear }),
    featured: Boolean(featured),
    ...(stats && { stats: keyed(stats.map((s) => ({ _type: 'eventStat', ...s })), (s) => s.label) }),
    links: keyed(
      links.map(({ label, url }) => ({ _type: 'eventLink', label, ...(url && { url }) })),
      (link) => link.label,
    ),
    ...(photo && { photo: await image(photo.src, { alt: photo.alt }, 'photo') }),
  };
}

async function saveEvent(doc) {
  const existing = await client.fetch('*[_type == "event" && slug.current == $slug][0]._id', {
    slug: doc.slug.current,
  });
  return existing ? client.patch(existing).set(doc).commit() : client.create(doc);
}

const singletons = [await buildSiteSettings(), await buildTeam(), await buildGallery()];

const events = [];
for (const event of readJson('events.json')) events.push(await buildEvent(event));

if (dryRun) {
  console.log(`\nDry run: ${uploads.size} photos, ${events.length} events, ${singletons.length} settings documents.`);
  console.log('Nothing was uploaded.');
  process.exit(0);
}

for (const doc of singletons) await client.createOrReplace(doc);
for (const doc of events) await saveEvent(doc);

console.log(`\nImported ${uploads.size} photos, ${events.length} events, ${singletons.length} settings documents.`);
