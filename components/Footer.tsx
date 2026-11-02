'use client';
import { useRef } from 'react';
import BrokenWordmark from './BrokenWordmark';
import { gsap, MOTION, SLICE_OFFSETS, useGSAP } from '@/lib/motion';
import type { NavLink, Site } from '@/lib/content/types';

export default function Footer({ site, nav }: { site: Site; nav: NavLink[] }) {
  const root = useRef<HTMLElement>(null);
  const details = ['Cybersecurity cell', site.department, site.college, `Est. ${site.founded}`].filter(Boolean);
  const contact = [
    ...site.socials,
    ...(site.email ? [{ label: 'Email', url: `mailto:${site.email}` }] : []),
  ];

  // The wordmark broke at the top of the page. Reaching the end puts it back together.
  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION, () => {
        gsap.fromTo(
          '.slice',
          { x: (i) => SLICE_OFFSETS[i % SLICE_OFFSETS.length] },
          {
            x: 0,
            ease: 'power2.out',
            scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom bottom', scrub: 0.4 },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <footer ref={root} className="overflow-hidden bg-void pt-20 md:pt-32">
      {site.signoff && <p className="gutter type-statement max-w-[14em]">{site.signoff}</p>}

      <div className="gutter mt-16 grid grid-cols-2 gap-8 border-t border-line pt-6 md:mt-24 md:grid-cols-4">
        <ul className="col-span-2 space-y-1 text-haze">
          {details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>

        <ul className="space-y-1">
          {nav.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="underline-offset-4 hover:underline">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {contact.length > 0 && (
          <ul className="space-y-1">
            {contact.map((link) => (
              <li key={link.label}>
                <a href={link.url} className="underline-offset-4 hover:underline">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      <BrokenWordmark id="footer" className="gutter mt-12 md:mt-20" />

      <div className="gutter flex justify-between py-4 text-sm text-haze md:pl-[calc(clamp(1rem,2.2vw,2.5rem)+9rem)]">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <span className="font-mono">CVE-2020-1472</span>
      </div>
    </footer>
  );
}
