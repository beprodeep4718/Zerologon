'use client';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { SECTIONS } from '@/lib/nav';

function toggleTheme() {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem('zl-theme', next);
  } catch {
    // The switch still works for this visit if storage is blocked.
  }
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 bg-bg">
      <div className="wrap relative flex min-h-[76px] items-center justify-between gap-4">
        <a href="#summary" onClick={closeMenu} translate="no" className="text-xl font-normal">
          Zerologon
        </a>

        <nav aria-label="Report sections" className="hidden lg:block">
          <ul className="flex gap-6">
            {SECTIONS.map((section) => (
              <li key={section.href}>
                <a href={section.href} className="link-quiet">
                  {section.number} {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <button type="button" onClick={toggleTheme} className="label min-h-11 border border-rule px-3 !text-fg">
            <span className="theme-to-dark">Dark mode</span>
            <span className="theme-to-light">Light mode</span>
          </button>
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? 'Close contents' : 'Open contents'}
            aria-expanded={isMenuOpen}
            aria-controls="contents"
            className="grid size-11 place-items-center lg:hidden"
          >
            {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav id="contents" aria-label="Report sections" className="absolute inset-x-0 top-full border-y border-rule bg-bg lg:hidden">
          <ul className="wrap py-3">
            {SECTIONS.map((section) => (
              <li key={section.href}>
                <a href={section.href} onClick={closeMenu} className="block py-2 text-3xl tracking-tight">
                  <span className="label mr-3">{section.number}</span>
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
