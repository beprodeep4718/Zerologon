import { createClient } from '@sanity/client';
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';
import type { ClubEvent, Member, Photo, Site } from './types';

export const CONTENT_TAG = 'content';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';

type SanityPhoto = SanityImageSource & { alt?: string; hotspot?: { x: number; y: number } };

// Not imported until a project is connected, so these are created on first use.
const client = () =>
  // Pages are cached by Next, so go straight to the API: a publish must never read a stale CDN copy.
  createClient({ projectId, dataset, apiVersion: '2026-02-01', useCdn: false });

const query = <T>(groq: string) =>
  client().fetch<T>(groq, {}, { next: { tags: [CONTENT_TAG], revalidate: 3600 } });

const positionOf = (photo: SanityPhoto) =>
  photo.hotspot ? `${photo.hotspot.x * 100}% ${photo.hotspot.y * 100}%` : undefined;

function toPhoto(photo: SanityPhoto): Photo {
  return {
    src: createImageUrlBuilder({ projectId: projectId!, dataset }).image(photo).url(),
    alt: photo.alt ?? '',
    position: positionOf(photo),
  };
}

type SiteDocument = Omit<Site, 'about'> & {
  about: { paragraphs: string[]; photo: SanityPhoto };
};

export async function loadSite(): Promise<Site> {
  const site = await query<SiteDocument | null>(/* groq */ `*[_id == "siteSettings"][0]{
    name, description, college, department, founded, hero, about, focusAreas, peakParticipants,
    join, email, socials[]{label, url}
  }`);

  if (!site) throw new Error('No site settings found in Sanity. Run the import script first.');

  return {
    ...site,
    college: site.college ?? '',
    department: site.department ?? '',
    founded: site.founded ?? '',
    peakParticipants: site.peakParticipants ?? '',
    focusAreas: site.focusAreas ?? [],
    email: site.email ?? '',
    socials: site.socials ?? [],
    join: {
      heading: site.join?.heading ?? '',
      body: site.join?.body ?? '',
      label: site.join?.label ?? '',
      url: site.join?.url ?? '',
    },
    about: { ...site.about, photo: toPhoto(site.about.photo) },
  };
}

export async function loadEvents(): Promise<ClubEvent[]> {
  const events = await query<(Omit<ClubEvent, 'photo'> & { photo?: SanityPhoto })[]>(/* groq */ `*[_type == "event"]{
    "id": slug.current, title, subtitle, type,
    "date": select(timing in ["day", "month"] => date),
    "datePrecision": select(timing == "month" => "month", "day"),
    "academicYear": select(timing == "academicYear" => academicYear),
    "dateToBeAnnounced": timing == "toBeAnnounced",
    summary, organisers, description, stats[]{label, value}, featured, photo,
    "links": coalesce(links[]{label, url}, [])
  }`);

  return events.map((event) => ({
    ...event,
    photo: event.photo ? toPhoto(event.photo) : undefined,
  }));
}

export async function loadMembers(): Promise<Omit<Member, 'initials'>[]> {
  const members = await query<
    { name: string; role: string; batch: string; photo?: SanityPhoto }[] | null
  >(/* groq */ `*[_id == "team"][0].members[]{name, role, batch, photo}`);

  return (members ?? []).map(({ photo, ...member }) => ({
    ...member,
    image: photo ? toPhoto(photo).src : undefined,
    imagePosition: photo ? positionOf(photo) : undefined,
  }));
}

export async function loadGallery(): Promise<Photo[]> {
  const photos = await query<SanityPhoto[] | null>(/* groq */ `*[_id == "gallery"][0].photos`);
  return (photos ?? []).map(toPhoto);
}
