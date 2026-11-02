"use client";
import { useRef, useState } from "react";
import Photo from "./Photo";
import { gsap, MOTION, POINTER, useGSAP } from "@/lib/motion";
import { EVENT_TYPE_LABELS, formatEventDate } from "@/lib/content/format";
import type { ClubEvent, Photo as EventPhoto } from "@/lib/content/types";

const LATEST_COUNT = 6;

export default function Archives({ events, photos }: { events: ClubEvent[]; photos: EventPhoto[] }) {
  const featured = events.find((event) => event.featured);
  const rest = events.filter((event) => event !== featured);

  const [showAll, setShowAll] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const root = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const visible = showAll ? rest : rest.slice(0, LATEST_COUNT);

  const previews = visible.map(
    (event, i) => event.photo ?? (photos.length ? photos[i % photos.length] : undefined),
  );

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add(MOTION, () => {
        gsap.fromTo(
          "[data-parallax]",
          { yPercent: -10 },
          {
            yPercent: 10,
            ease: "none",
            scrollTrigger: { trigger: "[data-parallax-frame]", start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });

      media.add(POINTER, () => {
        gsap.set(previewRef.current, { xPercent: -50, yPercent: -50 });
        const toX = gsap.quickTo(previewRef.current, "x", { duration: 0.5, ease: "power3" });
        const toY = gsap.quickTo(previewRef.current, "y", { duration: 0.5, ease: "power3" });
        const follow = (event: PointerEvent) => {
          toX(event.clientX);
          toY(event.clientY);
        };

        const list = listRef.current;
        list?.addEventListener("pointermove", follow);
        return () => list?.removeEventListener("pointermove", follow);
      });
    },
    { scope: root },
  );

  const toggle = () => {
    // Collapsing removes the rows above the button, so bring the list back into view.
    if (showAll) listRef.current?.scrollIntoView({ block: "start" });
    setShowAll(!showAll);
  };

  return (
    <section ref={root} id="events" className="on-paper section">
      <h2 className="gutter text-smoke">Past events</h2>

      {featured && (
        <article className="mt-8">
          <div className="gutter">
            <h3 className="type-marquee">{featured.title}</h3>
          </div>

          {featured.photo && (
            <div data-parallax-frame className="relative mt-8 aspect-[4/3] overflow-hidden md:aspect-[21/9]">
              <div data-parallax className="absolute -inset-y-[12%] inset-x-0">
                <Photo
                  src={featured.photo.src}
                  alt={featured.photo.alt}
                  fill
                  sizes="100vw"
                  className="photo-ink object-cover"
                  style={{ objectPosition: featured.photo.position }}
                />
              </div>
            </div>
          )}

          <div className="gutter mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div>
              <p className="text-smoke">{formatEventDate(featured)}</p>
              {featured.description && (
                <p className="mt-3 max-w-[32em] text-xl leading-snug tracking-tight md:text-2xl">
                  {featured.description}
                </p>
              )}
              {featured.organisers && (
                <p className="mt-3 text-smoke">Organized by {featured.organisers}</p>
              )}
              {featured.links.map((link) => (
                <a key={link.url} href={link.url} className="btn btn-ghost mt-6">
                  {link.label}
                </a>
              ))}
            </div>

            {featured.stats && (
              <dl className="grid grid-cols-2 gap-x-6 gap-y-6 self-end sm:grid-cols-4">
                {featured.stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col-reverse">
                    <dt className="text-smoke">{stat.label}</dt>
                    <dd className="text-4xl font-medium tracking-tight">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </article>
      )}

      <ol
        id="archive-list"
        ref={listRef}
        onPointerLeave={() => setHovered(null)}
        className="mt-16 border-t border-rule md:mt-24"
      >
        {visible.map((event, i) => (
          <li
            key={event.id}
            onPointerEnter={() => setHovered(i)}
            className="group relative overflow-hidden border-b border-rule"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 origin-bottom scale-y-0 bg-crash transition-transform duration-300 ease-out group-hover:scale-y-100"
            />
            <div className="gutter relative grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-6 gap-y-1 py-5 transition-colors duration-200 group-hover:text-paper md:grid-cols-[9rem_minmax(0,1fr)_auto] md:py-6">
              <div className="text-smoke tabular-nums transition-colors duration-200 group-hover:text-paper">
                {formatEventDate(event)}
              </div>
              <div className="order-last col-span-2 md:order-none md:col-span-1">
                <h3 className="type-title">{event.title}</h3>
                <p className="mt-1 text-smoke transition-colors duration-200 group-hover:text-paper">
                  {[event.summary, event.organisers && `Organized by ${event.organisers}`]
                    .filter(Boolean)
                    .join(". ")}
                </p>
              </div>
              <div className="flex items-baseline justify-end gap-4">
                <span>{EVENT_TYPE_LABELS[event.type]}</span>
                {event.links.map((link) => (
                  <a key={link.url} href={link.url} className="font-medium underline underline-offset-4">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>

      <div
        ref={previewRef}
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 z-40 hidden aspect-[4/3] w-[24vw] overflow-hidden transition-opacity duration-200 md:block ${
          hovered === null ? "opacity-0" : "opacity-100"
        }`}
      >
        {previews.map((photo, i) =>
          photo ? (
            <Photo
              key={`${photo.src}-${i}`}
              src={photo.src}
              alt=""
              fill
              sizes="24vw"
              className={`object-cover transition-opacity duration-200 ${hovered === i ? "opacity-100" : "opacity-0"}`}
              style={{ objectPosition: photo.position }}
            />
          ) : null,
        )}
      </div>

      {rest.length > LATEST_COUNT && (
        <div className="gutter mt-8">
          <button
            type="button"
            onClick={toggle}
            aria-expanded={showAll}
            aria-controls="archive-list"
            className="btn btn-ghost"
          >
            {showAll ? "Show fewer" : `Show all ${rest.length}`}
          </button>
        </div>
      )}
    </section>
  );
}
