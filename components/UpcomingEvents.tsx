'use client';
import { useRef } from 'react';
import { gsap, MOTION, ScrollTrigger, useGSAP } from '@/lib/motion';
import { formatEventDate } from '@/lib/content/format';
import type { ClubEvent } from '@/lib/content/types';

export default function UpcomingEvents({ events }: { events: ClubEvent[] }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION, () => {
        const tweens = gsap.utils
          .toArray<HTMLElement>('[data-marquee]')
          .map((track) => gsap.to(track, { xPercent: -50, duration: 28, ease: 'none', repeat: -1 }));

        // Scrolling pushes the marquee along, then it eases back to its normal speed.
        ScrollTrigger.create({
          trigger: root.current,
          onUpdate: (self) => {
            const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 300, 6);
            tweens.forEach((tween) => gsap.to(tween, { timeScale: boost, duration: 0.2, overwrite: true }));
            tweens.forEach((tween) => gsap.to(tween, { timeScale: 1, duration: 1, delay: 0.2 }));
          },
        });
      });
    },
    { scope: root },
  );

  if (events.length === 0) return null;

  return (
    <section ref={root} id="upcoming" className="section overflow-hidden bg-void">
      <h2 className="gutter text-haze">{events.length > 1 ? 'Upcoming events' : 'Up next'}</h2>

      <ul className="mt-8 space-y-16">
        {events.map((event) => (
          <li key={event.id}>
            <div data-marquee className="flex w-max whitespace-nowrap" aria-hidden="true">
              {Array.from({ length: 6 }, (_, i) => (
                <span key={i} className="type-marquee pr-[0.35em]">
                  {event.title}
                </span>
              ))}
            </div>

            <div className="gutter mt-8 flex flex-col gap-6 border-t border-line pt-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-3xl font-normal tracking-tight md:text-5xl">{event.title}</h3>
                <p className="mt-2 text-lg text-haze md:text-xl">
                  {[event.subtitle, formatEventDate(event)].filter(Boolean).join(', ')}
                </p>
              </div>
              {event.links.map((link) => (
                <a key={link.url} href={link.url} className="btn self-start md:self-auto">
                  {link.label}
                </a>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
