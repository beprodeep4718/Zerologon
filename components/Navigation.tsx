'use client';
import { useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ScrollTrigger, useGSAP } from '@/lib/motion';
import type { ClubEvent, NavLink } from '@/lib/content/types';

export default function Navigation({ nav, nextEvent }: { nav: NavLink[]; nextEvent?: ClubEvent }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const percent = useRef<HTMLSpanElement>(null);
  const closeMenu = () => setIsMenuOpen(false);

  useGSAP(() => {
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        if (percent.current) percent.current.textContent = String(Math.round(self.progress * 100));
      },
    });
  });

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 text-paper mix-blend-difference">
        <nav aria-label="Main" className="gutter flex h-16 items-center justify-between gap-6">
          <a href="#hero" onClick={closeMenu} className="text-xl font-medium tracking-tight" translate="no">
            Zerologon
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {nav.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="underline-offset-4 hover:underline">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="-mr-2 p-2 md:hidden"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </header>

      <p
        aria-hidden="true"
        className="gutter pointer-events-none fixed bottom-3 left-0 z-50 hidden text-sm text-paper tabular-nums mix-blend-difference md:block"
      >
        <span ref={percent}>0</span>% complete
      </p>

      {isMenuOpen && (
        <div
          id="mobile-navigation"
          data-lenis-prevent
          className="gutter fixed inset-0 z-40 flex flex-col justify-center bg-crash md:hidden"
        >
          <ul className="flex flex-col gap-2">
            {nav.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={closeMenu} className="block py-1 text-5xl font-light tracking-tight">
                  {link.label}
                </a>
              </li>
            ))}
            {nextEvent && (
              <li className="mt-6">
                <a href="#upcoming" onClick={closeMenu} className="btn w-full">
                  See {nextEvent.title}
                </a>
              </li>
            )}
          </ul>
        </div>
      )}
    </>
  );
}
