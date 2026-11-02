'use client';
import { useRef } from 'react';
import BrokenWordmark from './BrokenWordmark';
import HeroImage from './HeroImage';
import { gsap, INTRO_SECONDS, MOTION, SLICE_OFFSETS, useGSAP } from '@/lib/motion';
import type { ClubEvent, Site } from '@/lib/content/types';

export default function Hero({
  site,
  nextEvent,
  stats,
}: {
  site: Site;
  nextEvent?: ClubEvent;
  stats: { value: string; label: string }[];
}) {
  const root = useRef<HTMLElement>(null);
  const broken = useRef(0);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION, () => {
        gsap.from('.slice-in', {
          x: (i) => SLICE_OFFSETS[i % SLICE_OFFSETS.length] * 0.6,
          duration: 1.5,
          delay: INTRO_SECONDS - 0.2,
          ease: 'expo.out',
        });
        gsap.from('[data-rise]', {
          yPercent: 110,
          duration: 1.1,
          delay: INTRO_SECONDS,
          ease: 'expo.out',
          stagger: 0.035,
        });

        gsap
          .timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: root.current,
              start: 'top top',
              end: '+=130%',
              pin: true,
              scrub: 0.4,
              onUpdate: (self) => {
                broken.current = self.progress;
              },
            },
          })
          .to('.slice', { x: (i) => SLICE_OFFSETS[i % SLICE_OFFSETS.length] }, 0)
          .to('[data-hero-copy]', { y: -120, autoAlpha: 0, duration: 0.5 }, 0);
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="hero" className="relative h-svh overflow-hidden bg-void">
      <HeroImage photo={site.about.photo} broken={broken} />
      {/* Keeps the headline and header readable over bright parts of the photo. */}
      <div className="absolute inset-x-0 top-0 h-3/5 bg-gradient-to-b from-void/80 via-void/45 to-transparent" />

      <div className="absolute inset-0 flex flex-col justify-between">
        <div
          data-hero-copy
          className="gutter flex flex-col gap-6 pt-20 md:flex-row md:items-start md:justify-between md:pt-24"
        >
          <h1 className="type-hero max-w-[14em]">
            {site.hero.headline.split(' ').map((word, i) => (
              <span key={i}>
                <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                  <span data-rise className="inline-block">
                    {word}
                  </span>
                </span>{' '}
              </span>
            ))}
          </h1>

          <div className="flex shrink-0 flex-col gap-5 md:items-end md:text-right">
            <dl className="hidden gap-8 md:flex">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse">
                  <dt className="text-sm">{stat.label}</dt>
                  <dd className="text-3xl font-medium tracking-tight">{stat.value}</dd>
                </div>
              ))}
            </dl>
            {nextEvent && (
              <a href="#upcoming" className="btn self-start md:self-end">
                See {nextEvent.title}
              </a>
            )}
          </div>
        </div>

        <BrokenWordmark id="hero" className="gutter pb-4 md:pb-6" />
      </div>
    </section>
  );
}
