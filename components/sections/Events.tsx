import { Plus } from 'lucide-react';
import DocStrip from '@/components/DocStrip';
import Photo from '@/components/Photo';
import { EVENT_TYPE_LABELS, formatEventDate, peopleCount } from '@/lib/content/format';
import type { ClubEvent } from '@/lib/content/types';

const COLUMNS =
  'grid-cols-[minmax(0,1fr)_auto_1.5rem] md:grid-cols-[5.5rem_8rem_minmax(0,1fr)_4.5rem_4.5rem_4.5rem_1.5rem]';

function CaseStudy({ event }: { event: ClubEvent }) {
  const notes = [
    event.organisers && { title: 'Leads', body: event.organisers },
    (event.description ?? event.summary) && { title: 'Summary', body: event.description ?? event.summary },
    event.challenges && { title: 'Challenge breakdown', body: event.challenges },
    event.lessons && { title: 'Lessons learned', body: event.lessons },
  ].filter((note) => !!note);

  return (
    <div className="grid grid-cols-1 gap-8 pt-2 pb-10 md:grid-cols-2 md:gap-14 md:pl-[14.5rem]">
      <div className="flex flex-col gap-5">
        {notes.map((note) => (
          <div key={note.title}>
            <h4 className="label">{note.title}</h4>
            <p className="mt-1 text-xl leading-snug tracking-tight whitespace-pre-line">{note.body}</p>
          </div>
        ))}
        {event.links.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {event.links.map((link) => (
              <a key={link.url} href={link.url} className="button">
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>

      {(event.photo || event.stats?.length) && (
        <div className="flex flex-col gap-6">
          {event.photo && (
            <div className="relative aspect-[3/2] overflow-hidden bg-rule">
              <Photo
                src={event.photo.src}
                alt={event.photo.alt}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
                style={{ objectPosition: event.photo.position }}
              />
            </div>
          )}
          {event.stats && (
            <dl className="grid grid-cols-[repeat(auto-fit,minmax(110px,1fr))] gap-5">
              {event.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse gap-1">
                  <dt className="label">{stat.label}</dt>
                  <dd className="text-4xl leading-none tracking-tight">{stat.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      )}
    </div>
  );
}

export default function Events({ upcoming, past }: { upcoming: ClubEvent[]; past: ClubEvent[] }) {
  return (
    <section id="events" className="pt-24">
      <DocStrip section={3} />

      <div className="wrap pt-20 pb-14">
        <h2 className="big">Engagement log</h2>
      </div>

      {upcoming.map((event) => (
        <div key={event.id} className="inv mb-px py-16">
          <div className="wrap flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="label">
                {event.ref}, status: open, {event.date ? formatEventDate(event) : 'date to be announced'}
              </p>
              <h3 className="banner mt-3">{event.title}</h3>
              {event.subtitle && <p className="mt-3">{event.subtitle}</p>}
            </div>
            {event.links.map((link) => (
              <a key={link.url} href={link.url} className="button">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      ))}

      <div className="wrap pt-16">
        <div className={`label hidden gap-4 border-b border-rule pb-2.5 md:grid ${COLUMNS}`} aria-hidden="true">
          <span>ID</span>
          <span>Date</span>
          <span>Engagement</span>
          <span>Type</span>
          <span>People</span>
          <span>Status</span>
        </div>
        <ol>
          {past.map((event) => (
            <li key={event.id} id={event.id} className="scroll-mt-24 border-b border-rule">
              <details open={event.featured} className="case group">
                <summary className={`log-row grid cursor-pointer list-none items-baseline gap-x-4 gap-y-1 py-4 [&::-webkit-details-marker]:hidden ${COLUMNS}`}>
                  <span className="label">{event.ref}</span>
                  <span className="label text-right md:text-left">{formatEventDate(event)}</span>
                  <h3 className="col-span-3 row-start-2 text-2xl font-normal tracking-tight md:col-span-1 md:row-start-auto">
                    {event.title}
                  </h3>
                  <span className="label hidden md:block">{EVENT_TYPE_LABELS[event.type]}</span>
                  <span className="label hidden md:block">{peopleCount(event)}</span>
                  <span className="label hidden md:block">Closed</span>
                  <Plus aria-hidden="true" className="size-5 self-center transition-transform duration-300 group-open:rotate-45" />
                </summary>
                <CaseStudy event={event} />
              </details>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
