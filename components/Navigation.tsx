'use client';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import DecryptedText from "./animation/DecryptedText";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Members', href: '#members' },
    { label: 'Archives', href: '#archives' },
    { label: 'Events', href: '#upcoming' },
    { label: 'Gallery', href: '#gallery' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-999 bg-zerologon-black border-b-4 border-zerologon-yellow flex items-center justify-between gap-2 px-3 sm:px-5 lg:px-8 h-16">
        <a href="#hero" className="font-bebas text-xl sm:text-2xl text-zerologon-yellow tracking-widest relative shrink-0" onClick={() => setIsMenuOpen(false)}>
          <DecryptedText text="ZEROLOGON" /><span className="animate-blink">_</span>
        </a>

        <ul className="hidden md:flex flex-1 justify-center gap-1 overflow-x-auto">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="font-share-tech text-xs text-zerologon-white uppercase tracking-widest px-3 py-2 border-2 border-transparent transition-all hover:border-zerologon-yellow hover:text-zerologon-yellow hover:bg-yellow-500/10 whitespace-nowrap"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="md:hidden text-zerologon-yellow border-2 border-zerologon-yellow p-1.5 hover:bg-yellow-500/10 transition-colors"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <div className="hidden lg:flex font-share-tech text-xs text-zerologon-green items-center gap-2 shrink-0">
          <span className="w-2 h-2 bg-zerologon-green rounded-full animate-pulse"></span>
          SYSTEMS ONLINE
        </div>
      </nav>

      {isMenuOpen && (
        <div id="mobile-navigation" className="fixed top-16 left-0 right-0 z-998 md:hidden bg-zerologon-black border-b-4 border-zerologon-yellow px-3 py-3">
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block font-share-tech text-xs text-zerologon-white uppercase tracking-widest px-3 py-2 border-2 border-transparent transition-all hover:border-zerologon-yellow hover:text-zerologon-yellow hover:bg-yellow-500/10"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
