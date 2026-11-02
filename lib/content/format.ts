import type { ClubEvent, EventType } from './types';

export const EVENT_TYPE_LABELS: Record<EventType, string> = {
  ctf: 'CTF',
  workshop: 'Workshop',
  talk: 'Talk',
};

// The head count inside a summary such as "300+ participants, 30+ teams".
export const peopleCount = ({ summary }: ClubEvent) =>
  summary?.match(/(\d+\+?)\s+(participants|attendees)/)?.[1] ?? '';

const monthFormat = new Intl.DateTimeFormat('en-US', { month: 'short', timeZone: 'UTC' });

export function formatEventDate({ date, datePrecision, academicYear, dateToBeAnnounced }: ClubEvent) {
  if (date) {
    const [year, , day] = date.split('-').map(Number);
    const monthAndYear = `${monthFormat.format(new Date(date))} ${year}`;
    return datePrecision === 'month' ? monthAndYear : `${day} ${monthAndYear}`;
  }
  return academicYear ?? (dateToBeAnnounced ? 'Date to be announced' : '');
}
