'use client';
import { useRef } from 'react';
import { gsap, INTRO_SECONDS, MOTION, useGSAP } from '@/lib/motion';

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    gsap.matchMedia().add(MOTION, () => {
      const progress = { value: 0 };

      gsap
        .timeline({ onComplete: () => gsap.set(root.current, { display: 'none' }) })
        .to(progress, {
          value: 100,
          duration: INTRO_SECONDS - 0.4,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (count.current) count.current.textContent = String(Math.round(progress.value));
          },
        })
        .to(root.current, { yPercent: -100, duration: 0.8, ease: 'expo.inOut' });
    });
  });

  return (
    <div ref={root} aria-hidden="true" className="preloader gutter flex flex-col justify-end pb-[6vh]">
      <p className="type-sad">:(</p>
      <p className="mt-6 text-2xl font-light sm:text-4xl">
        <span ref={count} className="tabular-nums">0</span>% complete
      </p>
    </div>
  );
}
