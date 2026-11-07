'use client';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Photo from './Photo';
import type { Photo as Exhibit } from '@/lib/content/types';

const VISIBLE_COUNT = 12;
const VIEWER_BUTTON = 'grid size-11 place-items-center bg-bg text-fg transition-opacity hover:opacity-70';

export default function EvidenceGrid({ photos }: { photos: Exhibit[] }) {
  const [showAll, setShowAll] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const visible = showAll ? photos : photos.slice(0, VISIBLE_COUNT);
  const isOpen = active !== null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }, [isOpen]);

  const step = (delta: number) =>
    setActive((i) => (i === null ? i : (i + delta + photos.length) % photos.length));

  return (
    <>
      <div className="columns-2 gap-3.5 md:columns-3">
        {visible.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`View exhibit ${i + 1}: ${photo.alt}`}
            className={`relative mb-3.5 block w-full break-inside-avoid overflow-hidden bg-rule ${i % 3 === 1 ? 'aspect-[4/5]' : 'aspect-[4/3]'}`}
          >
            <Photo
              src={photo.src}
              alt=""
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 hover:scale-[1.03]"
              style={{ objectPosition: photo.position }}
            />
          </button>
        ))}
      </div>

      {photos.length > VISIBLE_COUNT && (
        <div className="mt-8 text-center">
          <button type="button" onClick={() => setShowAll(!showAll)} aria-expanded={showAll} className="button">
            {showAll ? 'Show fewer' : `Show all ${photos.length}`}
          </button>
        </div>
      )}

      <dialog
        ref={dialogRef}
        aria-label="Exhibit viewer"
        // Keep smooth scrolling from moving the page behind the open viewer.
        data-lenis-prevent=""
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
        className="m-0 h-dvh max-h-none w-dvw max-w-none overscroll-contain bg-bg/95 p-0 text-fg"
      >
        {active !== null && (
          <div data-stage="true" className="relative size-full">
            <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-4 px-4 py-3">
              <span className="label">
                Exhibit {active + 1} of {photos.length}
              </span>
              <button type="button" onClick={() => setActive(null)} aria-label="Close viewer" className={VIEWER_BUTTON}>
                <X className="size-5" />
              </button>
            </div>

            <div data-stage="true" className="absolute inset-x-2 top-16 bottom-4 sm:inset-x-16">
              <Photo
                key={photos[active].src}
                src={photos[active].src}
                alt={photos[active].alt}
                fill
                // On retina screens 100vw would fetch a 3840px file; 2048px is sharp enough here.
                sizes="(min-resolution: 2dppx) 1000px, 100vw"
                className="pointer-events-none object-contain"
              />
            </div>

            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous exhibit"
              className={`${VIEWER_BUTTON} absolute top-1/2 left-2 z-10 -translate-y-1/2`}
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next exhibit"
              className={`${VIEWER_BUTTON} absolute top-1/2 right-2 z-10 -translate-y-1/2`}
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        )}
      </dialog>
    </>
  );
}
