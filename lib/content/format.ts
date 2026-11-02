import type { ClubEvent, EventType } from './types';

export const EVENT_TYPE_LABELS: Record<EventType, string> = {
  ctf: 'CTF',
  workshop: 'Workshop',
  talk: 'Talk',
};

const monthFormat = new Intl.DateTimeFormat('en-US', { month: 'short', timeZone: 'UTC' });

export function formatEventDate({ date, datePrecision, academicYear, dateToBeAnnounced }: ClubEvent) {
  if (date) {
    const [year, , day] = date.split('-').map(Number);
    const monthAndYear = `${monthFormat.format(new Date(date))} ${year}`;
    return datePrecision === 'month' ? monthAndYear : `${day} ${monthAndYear}`;
  }
  return academicYear ?? (dateToBeAnnounced ? 'Date to be announced' : '');
}
