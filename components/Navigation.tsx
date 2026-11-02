'use client';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Wordmark from './Wordmark';
import type { ClubEvent, NavLink } from '@/lib/content/types';

export default function Navigation({ nav, nextEvent }: { nav: NavLink[]; nextEvent?: ClubEvent }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink">
      <nav aria-label="Main" className="wrap flex h-16 items-center justify-between gap-6">
        <a href="#hero" onClick={closeMenu} className="shrink-0">
          <Wordmark />
        </a>

        <div className="hidden items-center gap-7 md:flex">
          <ul className="flex items-center gap-7">
            {nav.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-[0.9375rem] text-muted transition-colors hover:text-paper">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          {nextEvent && (
            <a href="#upcoming" className="btn btn-sm btn-outline">
              See {nextEvent.title}
            </a>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="-mr-2 rounded-md p-2 text-paper transition-colors hover:bg-raised md:hidden"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {isMenuOpen && (
        <div
          id="mobile-navigation"
          className="absolute inset-x-0 top-full border-b border-line bg-ink py-3 md:hidden"
        >
          <ul className="wrap flex flex-col">
            {nav.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={closeMenu} className="block py-2.5 text-lg text-paper">
                  {link.label}
                </a>
              </li>
            ))}
            {nextEvent && (
              <li className="pt-2 pb-1">
                <a href="#upcoming" onClick={closeMenu} className="btn btn-primary w-full">
                  See {nextEvent.title}
                </a>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
