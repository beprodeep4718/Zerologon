import eventsData from '@/data/events.json';
import galleryData from '@/data/gallery.json';
import membersData from '@/data/members.json';
import siteData from '@/data/site.json';
import type { ClubEvent, Member, Photo, Site } from './types';

export async function loadSite(): Promise<Site> {
  return siteData;
}

export async function loadEvents(): Promise<ClubEvent[]> {
  return eventsData as ClubEvent[];
}

export async function loadMembers(): Promise<Omit<Member, 'initials'>[]> {
  return membersData;
}

export async function loadGallery(): Promise<Photo[]> {
  return galleryData.map(({ file, alt }) => ({ src: `/Gallery/${file}`, alt }));
}
