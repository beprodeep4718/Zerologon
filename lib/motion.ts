import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };

export const MOTION = '(prefers-reduced-motion: no-preference)';
export const POINTER = '(prefers-reduced-motion: no-preference) and (hover: hover) and (min-width: 768px)';

// How long the opening "% complete" screen covers the page, in seconds.
export const INTRO_SECONDS = 1.5;

// How far each horizontal slice of the wordmark travels when it breaks, in SVG units.
export const SLICE_OFFSETS = [-420, 300, -180, 520, -340, 240, -600];
