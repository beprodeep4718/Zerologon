import { formatEventDate } from '@/lib/content/format';
import type { ClubEvent } from '@/lib/content/types';

export default function UpcomingEvents({ events }: { events: ClubEvent[] }) {
  if (events.length === 0) return null;

  return (
    <section id="upcoming" className="section">
      <div className="wrap">
        <h2 className="heading">{events.length > 1 ? 'Upcoming events' : 'Upcoming event'}</h2>
        <ul className="mt-8 space-y-4">
          {events.map((event) => (
            <li
              key={event.id}
              className="grid grid-cols-1 items-end gap-6 rounded-md bg-raised p-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:p-10"
            >
              <div>
                <p className="text-muted">{formatEventDate(event)}</p>
                <h3 className="mt-2 text-4xl leading-tight sm:text-5xl">{event.title}</h3>
                {event.subtitle && <p className="mt-2 text-lg text-muted">{event.subtitle}</p>}
              </div>
              {event.links.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {event.links.map((link) => (
                    <a key={link.url} href={link.url} className="btn btn-primary">
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
