'use client';
import { useRef } from 'react';
import { gsap, MOTION, useGSAP } from '@/lib/motion';
import type { Site } from '@/lib/content/types';

export default function Manifesto({ site }: { site: Site }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION, () => {
        gsap.fromTo(
          '.word',
          { opacity: 0.16 },
          {
            opacity: 1,
            ease: 'none',
            stagger: 0.1,
            scrollTrigger: { trigger: '[data-words]', start: 'top 72%', end: 'bottom 60%', scrub: 0.5 },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="about" className="gutter section bg-void">
      <div data-words className="type-statement space-y-[0.5em]">
        {site.about.paragraphs.map((paragraph) => (
          <p key={paragraph}>
            {paragraph.split(' ').map((word, i) => (
              <span key={i} className="word">
                {word}{' '}
              </span>
            ))}
          </p>
        ))}
      </div>

      <div className="mt-20 border-t border-line pt-6 md:mt-32">
        <h2 className="text-haze">What we work on</h2>
        <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-xl md:grid-cols-3 md:text-3xl md:tracking-tight">
          {site.focusAreas.map((area) => (
            <li key={area}>{area}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
