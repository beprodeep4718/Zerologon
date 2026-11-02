'use client';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Photo from './Photo';
import { gsap, MOTION, useGSAP } from '@/lib/motion';
import type { Photo as GalleryPhoto } from '@/lib/content/types';

const VISIBLE_COUNT = 12;
const COLUMNS = 3;

// How far each column drifts as the section passes, so they slide against each other.
const DRIFT = [-14, 10, -22];

const VIEWER_BUTTON = 'bg-void p-3 text-paper transition-colors hover:bg-crash';

function Tile({
  photo,
  sizes,
  className = '',
  onOpen,
}: {
  photo: GalleryPhoto;
  sizes: string;
  className?: string;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`View photo: ${photo.alt}`}
      className={`${className} group relative block w-full overflow-hidden bg-line`}
    >
      <Photo
        src={photo.src}
        alt=""
        fill
        sizes={sizes}
        className="photo-ink object-cover transition-[filter,scale] duration-500 group-hover:scale-105 group-hover:grayscale-0"
        style={{ objectPosition: photo.position }}
      />
    </button>
  );
}

export default function Gallery({ photos }: { photos: GalleryPhoto[] }) {
  const [showAll, setShowAll] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const visible = photos.slice(0, VISIBLE_COUNT);
  const more = photos.slice(VISIBLE_COUNT);
  const isOpen = active !== null;

  useGSAP(
    () => {
      gsap.matchMedia().add(`${MOTION} and (min-width: 768px)`, () => {
        gsap.utils.toArray<HTMLElement>('[data-column]').forEach((column, i) => {
          gsap.fromTo(
            column,
            { yPercent: -DRIFT[i] },
            {
              yPercent: DRIFT[i],
              ease: 'none',
              scrollTrigger: { trigger: '[data-columns]', start: 'top bottom', end: 'bottom top', scrub: true },
            },
          );
        });
      });
    },
    { scope: sectionRef },
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }, [isOpen]);

  const step = (delta: number) =>
    setActive((i) => (i === null ? i : (i + delta + photos.length) % photos.length));

  const toggle = () => {
    // Collapsing removes the rows below the columns, so go back to the section top.
    if (showAll) sectionRef.current?.scrollIntoView();
    setShowAll(!showAll);
  };

  return (
    <section ref={sectionRef} id="gallery" className="overflow-hidden bg-void pt-20 pb-20 md:pt-32 md:pb-40">
      <h2 className="gutter text-haze">Gallery</h2>

      <div data-columns className="gutter mt-8 grid grid-cols-2 gap-2 md:mt-40 md:grid-cols-3 md:gap-4">
        {Array.from({ length: COLUMNS }, (_, column) => (
          <div key={column} data-column className="contents md:flex md:flex-col md:gap-4">
            {visible.map((photo, i) =>
              i % COLUMNS === column ? (
                <Tile
                  key={photo.src}
                  photo={photo}
                  className={i % 2 === 0 ? 'aspect-[4/5]' : 'aspect-[4/3]'}
                  sizes="(max-width: 768px) 50vw, 33vw"
                  onOpen={() => setActive(i)}
                />
              ) : null,
            )}
          </div>
        ))}
      </div>

      {showAll && (
        <div
          id="gallery-more"
          className="gutter mt-2 grid grid-cols-2 gap-2 md:mt-40 md:grid-cols-4 md:gap-4"
        >
          {more.map((photo, i) => (
            <Tile
              key={photo.src}
              photo={photo}
              className="aspect-[4/3]"
              sizes="(max-width: 768px) 50vw, 25vw"
              onOpen={() => setActive(visible.length + i)}
            />
          ))}
        </div>
      )}

      {more.length > 0 && (
        <div className="gutter mt-10 md:mt-32">
          <button
            type="button"
            onClick={toggle}
            aria-expanded={showAll}
            aria-controls="gallery-more"
            className="btn btn-ghost"
          >
            {showAll ? 'Show fewer' : `Show all ${photos.length}`}
          </button>
        </div>
      )}

      <dialog
        ref={dialogRef}
        data-lenis-prevent
        aria-label="Photo viewer"
        onClose={() => setActive(null)}
        onClick={(e) => {
          // Clicking outside the photo closes the viewer; the photo itself passes clicks
          // through to the stage, so it closes too.
          if (e.target === e.currentTarget || (e.target as HTMLElement).dataset.stage) setActive(null);
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') step(-1);
          if (e.key === 'ArrowRight') step(1);
        }}
        className="m-0 h-dvh max-h-none w-dvw max-w-none overscroll-contain bg-void/95 p-0 text-paper"
      >
        {active !== null && (
          <div data-stage="true" className="relative h-full w-full">
            <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-4 py-3 text-haze tabular-nums">
              <span>
                {active + 1} of {photos.length}
              </span>
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close photo viewer"
                className={VIEWER_BUTTON}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div data-stage="true" className="absolute inset-x-2 top-16 bottom-4 sm:inset-x-16">
              <Photo
                key={photos[active].src}
                src={photos[active].src}
                alt={photos[active].alt}
                fill
                sizes="100vw"
                className="pointer-events-none object-contain"
              />
            </div>

            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous photo"
              className={`${VIEWER_BUTTON} absolute top-1/2 left-2 z-10 -translate-y-1/2`}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next photo"
              className={`${VIEWER_BUTTON} absolute top-1/2 right-2 z-10 -translate-y-1/2`}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </dialog>
    </section>
  );
}
