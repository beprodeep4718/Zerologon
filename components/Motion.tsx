'use client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

// Critically damped feel: things arrive and settle without overshoot, because nothing
// on this page was thrown. Only transform and opacity move, so it stays on the compositor.
const EASE = 'expo.out';
const DURATION = 1.1;
const IN_VIEW = 'top 88%';

// Splits a heading into masked lines that slide up into place.
function revealLines(el: HTMLElement, trigger?: ScrollTrigger.Vars) {
  return SplitText.create(el, {
    type: 'lines',
    mask: 'lines',
    linesClass: 'line', // masks become .line-mask, which globals.css pads for descenders
    autoSplit: true, // re-split after fonts load and on resize
    onSplit: (self) => {
      gsap.set(el, { autoAlpha: 1 });
      return gsap.from(self.lines, {
        yPercent: 110,
        duration: DURATION,
        ease: EASE,
        stagger: 0.08,
        scrollTrigger: trigger,
      });
    },
  });
}

function heroIn() {
  const root = document.documentElement;
  const heading = document.querySelector<HTMLElement>('[data-hero-heading]');
  const items = gsap.utils.toArray<HTMLElement>('[data-hero]');

  gsap.set(items, { autoAlpha: 0, y: 24 });
  if (heading) revealLines(heading);
  gsap.to(items, { autoAlpha: 1, y: 0, duration: DURATION, ease: EASE, stagger: 0.06, delay: 0.15 });
  root.classList.remove('motion-pending');
}

function sectionsIn() {
  gsap.utils.toArray<HTMLElement>('h2.big, p.big').forEach((el) =>
    revealLines(el, { trigger: el, start: IN_VIEW, once: true }),
  );

  // Blocks that enter together (a row of team members) arrive as a short cascade.
  gsap.set('.rise', { autoAlpha: 0, y: 32 });
  ScrollTrigger.batch('.rise', {
    start: IN_VIEW,
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, { autoAlpha: 1, y: 0, duration: DURATION, ease: EASE, stagger: 0.08, overwrite: true }),
  });

  // Key figures count up to their value, keeping any suffix such as "350+".
  gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
    const match = el.textContent?.match(/^(\d+)(.*)$/);
    if (!match) return;
    const [, digits, suffix] = match;
    const value = { n: 0 };
    gsap.to(value, {
      n: Number(digits),
      duration: 1.6,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: IN_VIEW, once: true },
      onUpdate: () => {
        el.textContent = `${Math.round(value.n)}${suffix}`;
      },
    });
  });
}

function smoothScroll() {
  // Menu links glide too, and still stop below the sticky header (Lenis reads scroll-padding-top).
  const lenis = new Lenis({ lerp: 0.1, anchors: true, stopInertiaOnNavigate: true });
  // One clock for both, so scroll-linked reveals never lag the eased scroll position.
  lenis.on('scroll', ScrollTrigger.update);
  const tick = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(tick);
    lenis.destroy();
  };
}

export default function Motion() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    // Reduced motion gets the plain page: no smoothing, no reveals. Everything is already in place.
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const stopScroll = smoothScroll();
      heroIn();
      sectionsIn();
      return stopScroll;
    });
    mm.add('(prefers-reduced-motion: reduce)', () => {
      document.documentElement.classList.remove('motion-pending');
    });
  });

  return null;
}
