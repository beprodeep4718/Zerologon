'use client';
import { useRef } from 'react';
import { gsap, MOTION, useGSAP } from '@/lib/motion';

// Fills like the QR square on a real blue screen, from a fixed pattern so it renders the same every time.
const CELLS = 16;
const filled = Array.from({ length: CELLS * CELLS }, (_, i) => (i * 167 + 106) % 256 < 118);

export default function Crash({ nameOrigin }: { nameOrigin: string }) {
  const root = useRef<HTMLElement>(null);
  const percent = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION, () => {
        const mouth = root.current?.querySelector('[data-mouth]');
        const progress = { value: 0 };
        let smiling = false;

        // The markup says 100 for anyone without motion, who never sees it count up.
        if (percent.current) percent.current.textContent = '0';

        gsap.to(progress, {
          value: 100,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: '+=140%', pin: true, scrub: 0.3 },
          onUpdate: () => {
            if (percent.current) percent.current.textContent = String(Math.round(progress.value));

            // At 100% the sad face turns into a smile: the thing is broken, and now understood.
            const done = progress.value >= 97;
            if (done !== smiling) {
              smiling = done;
              gsap.to(mouth ?? null, { scaleX: done ? -1 : 1, duration: 0.45, ease: 'back.out(2.5)', overwrite: true });
            }
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="gutter flex min-h-svh flex-col justify-between bg-crash py-[9vh] text-paper"
    >
      <p aria-hidden="true" className="type-sad">
        :<span data-mouth className="inline-block">(</span>
      </p>

      <div className="mt-10 grid grid-cols-1 items-end gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <div>
          <p className="max-w-[20em] text-3xl leading-tight font-light tracking-tight md:text-5xl">
            {nameOrigin}
          </p>
          <p aria-hidden="true" className="mt-6 text-3xl font-light md:text-5xl">
            <span ref={percent} className="tabular-nums">100</span>% complete
          </p>
        </div>

        <div aria-hidden="true" className="flex items-end gap-5">
          <svg viewBox={`0 0 ${CELLS} ${CELLS}`} className="size-24 shrink-0 bg-paper p-1 md:size-32" shapeRendering="crispEdges">
            {filled.map((on, i) =>
              on ? <rect key={i} x={i % CELLS} y={Math.floor(i / CELLS)} width="1" height="1" fill="var(--color-crash)" /> : null,
            )}
          </svg>
          <p className="font-mono text-sm leading-relaxed">
            Stop code:
            <br />
            CVE_2020_1472
          </p>
        </div>
      </div>
    </section>
  );
}
