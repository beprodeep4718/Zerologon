'use client';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Photo from './Photo';
import type { Photo as GalleryPhoto } from '@/lib/content/types';

// The first photos in the gallery fill these mosaic cells, in order.
const MOSAIC_LAYOUTS = [
  'col-span-2 md:col-span-6 md:row-span-2',
  'md:col-span-3',
  'md:col-span-3',
  'md:col-span-3',
  'md:col-span-3',
  'col-span-2 md:col-span-4',
  'md:col-span-4',
  'md:col-span-4',
];

const VIEWER_BUTTON =
  'rounded-md bg-ink p-2 text-paper transition-colors hover:bg-raised';

function Tile({
  photo,
  sizes,
  className,
  onOpen,
}: {
  photo: GalleryPhoto;
  sizes: string;
  className: string;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`View photo: ${photo.alt}`}
      className={`${className} relative block overflow-hidden rounded-[4px] bg-raised transition-opacity duration-150 hover:opacity-85`}
    >
      <Photo
        src={photo.src}
        alt=""
        fill
        sizes={sizes}
        className="object-cover"
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

  const mosaic = photos.slice(0, MOSAIC_LAYOUTS.length);
  const more = photos.slice(MOSAIC_LAYOUTS.length);
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

  const toggle = () => {
    // Collapsing removes the rows below the mosaic, so go back to the section top.
    if (showAll) sectionRef.current?.scrollIntoView();
    setShowAll(!showAll);
  };

  return (
    <section ref={sectionRef} id="gallery" className="section border-t border-line">
      <div className="wrap">
        <h2 className="heading">Gallery</h2>

        <div className="mt-8 grid auto-rows-[9rem] grid-cols-2 gap-1.5 sm:auto-rows-[12rem] sm:gap-2 md:grid-cols-12 lg:auto-rows-[14rem]">
          {mosaic.map((photo, i) => (
            <Tile
              key={photo.src}
              photo={photo}
              className={MOSAIC_LAYOUTS[i]}
              sizes={i === 0 ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 50vw, 33vw'}
              onOpen={() => setActive(i)}
            />
          ))}
        </div>

        {showAll && (
          <div
            id="gallery-more"
            className="mt-1.5 grid grid-cols-2 gap-1.5 sm:mt-2 sm:grid-cols-3 sm:gap-2 lg:grid-cols-4"
          >
            {more.map((photo, i) => (
              <Tile
                key={photo.src}
                photo={photo}
                className="aspect-[4/3]"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                onOpen={() => setActive(mosaic.length + i)}
              />
            ))}
          </div>
        )}

        {more.length > 0 && (
          <div className="mt-8">
            <button
              type="button"
              onClick={toggle}
              aria-expanded={showAll}
              aria-controls="gallery-more"
              className="btn btn-outline"
            >
              {showAll ? 'Show fewer' : `Show all ${photos.length}`}
            </button>
          </div>
        )}
      </div>

      <dialog
        ref={dialogRef}
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
        className="m-0 h-dvh max-h-none w-dvw max-w-none overscroll-contain bg-ink/95 p-0 text-paper"
      >
        {active !== null && (
          <div data-stage="true" className="relative h-full w-full">
            <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-4 py-3 text-sm text-muted tabular-nums">
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
