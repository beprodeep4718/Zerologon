"use client";
import { useRef, useState } from "react";
import Photo from "./Photo";
import { EVENT_TYPE_LABELS, formatEventDate } from "@/lib/content/format";
import type { ClubEvent } from "@/lib/content/types";

const LATEST_COUNT = 5;

export default function Archives({ events }: { events: ClubEvent[] }) {
  const featured = events.find((event) => event.featured);
  const rest = events.filter((event) => event !== featured);

  const [showAll, setShowAll] = useState(false);
  const listRef = useRef<HTMLOListElement>(null);
  const visible = showAll ? rest : rest.slice(0, LATEST_COUNT);

  const toggle = () => {
    // Collapsing removes the rows above the button, so bring the list back into view.
    if (showAll) listRef.current?.scrollIntoView({ block: "center" });
    setShowAll(!showAll);
  };

  return (
    <section id="events" className="on-paper section">
      <div className="wrap">
        <h2 className="heading">Past events</h2>

        {featured && (
          <article className="mt-8 grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
            {featured.photo && (
              <div className="relative aspect-[3/2] overflow-hidden rounded-md bg-rule">
                <Photo
                  src={featured.photo.src}
                  alt={featured.photo.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                  style={{ objectPosition: featured.photo.position }}
                />
              </div>
            )}
            <div>
              <p className="text-ink-soft">{formatEventDate(featured)}</p>
              <h3 className="mt-2 text-3xl leading-tight sm:text-4xl">{featured.title}</h3>
              {featured.description && (
                <p className="mt-4 text-lg leading-relaxed text-ink-soft">{featured.description}</p>
              )}
              {featured.organisers && (
                <p className="mt-3 text-ink-soft">Organized by {featured.organisers}</p>
              )}
              {featured.stats && (
                <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {featured.stats.map((stat) => (
                    <div key={stat.label} className="flex flex-col-reverse gap-0.5">
                      <dt className="text-sm text-ink-soft">{stat.label}</dt>
                      <dd className="text-2xl font-semibold">{stat.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {featured.links.map((link) => (
                <a key={link.url} href={link.url} className="btn btn-outline mt-6">
                  {link.label}
                </a>
              ))}
            </div>
          </article>
        )}

        <ol id="archive-list" ref={listRef} className="mt-12 border-t border-rule lg:mt-16">
          {visible.map((event) => (
            <li
              key={event.id}
              className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-6 gap-y-1 border-b border-rule py-5 sm:grid-cols-[8.5rem_minmax(0,1fr)_auto]"
            >
              <div className="text-ink-soft tabular-nums">{formatEventDate(event)}</div>
              <div className="order-last col-span-2 sm:order-none sm:col-span-1">
                <h3 className="text-lg leading-snug">{event.title}</h3>
                <p className="mt-1 text-ink-soft">
                  {[event.summary, event.organisers && `Organized by ${event.organisers}`]
                    .filter(Boolean)
                    .join(". ")}
                </p>
              </div>
              <div className="flex items-baseline justify-end gap-4">
                <span className="text-ink-soft">{EVENT_TYPE_LABELS[event.type]}</span>
                {event.links.map((link) => (
                  <a key={link.url} href={link.url} className="font-medium underline underline-offset-4">
                    {link.label}
                  </a>
                ))}
              </div>
            </li>
          ))}
        </ol>

        {rest.length > LATEST_COUNT && (
          <div className="mt-8">
            <button
              type="button"
              onClick={toggle}
              aria-expanded={showAll}
              aria-controls="archive-list"
              className="btn btn-outline"
            >
              {showAll ? "Show fewer" : `Show all ${rest.length}`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
