import * as local from './local';
import * as sanity from './sanity';
import type { ClubEvent, Member, Photo, Site } from './types';
import { CLUB } from '../seo';

// Content comes from data/*.json until a Sanity project is connected.
const { loadEvents, loadGallery, loadMembers, loadSite } =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ? sanity : local;

// Entries with only an academic year ("2024-25") have no exact date, so they
// sort as the start of the year it ends in, below dated events from that year.
// Events with no date yet sort after every dated one.
function sortKey({ date, academicYear }: ClubEvent) {
  if (date) return Number(date.replaceAll('-', ''));
  if (!academicYear) return Infinity;
  const [startYear, endYear] = academicYear.split('-');
  return Number(startYear.slice(0, 2) + endYear) * 10000;
}

function isUpcoming({ date, dateToBeAnnounced }: ClubEvent, today: string) {
  return date ? date >= today : Boolean(dateToBeAnnounced);
}

const initialsOf = (name: string) =>
  name
    .split(/\s+/)
    .map((word) => word[0])
    .join('');

export async function getSite(): Promise<Site> {
  const site = await loadSite();
  return {
    ...site,
    college: site.college || CLUB.college,
    socials: site.socials.filter((social) => social.url),
  };
}

// An event moves from upcoming to past on its own once its date has gone by.
export async function getEvents(): Promise<{ upcoming: ClubEvent[]; past: ClubEvent[] }> {
  const today = new Date().toISOString().slice(0, 10);
  const events = (await loadEvents())
    .map((event) => ({ ...event, links: event.links.filter((link) => link.url) }))
    .sort((a, b) => sortKey(a) - sortKey(b));

  const oldestFirst = [
    ...events.filter((event) => !isUpcoming(event, today)),
    ...events.filter((event) => isUpcoming(event, today)),
  ].map((event, i) => ({ ...event, ref: `ZL-${String(i + 1).padStart(3, '0')}` }));

  return {
    upcoming: oldestFirst.filter((event) => isUpcoming(event, today)),
    past: oldestFirst.filter((event) => !isUpcoming(event, today)).reverse(),
  };
}

export async function getMembers(): Promise<Member[]> {
  const members = await loadMembers();
  return members.map((member) => ({ ...member, initials: initialsOf(member.name) }));
}

export async function getGallery(): Promise<Photo[]> {
  return loadGallery();
}
