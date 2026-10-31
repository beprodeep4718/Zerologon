'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import photos from '@/data/gallery.json';

// The first photos in data/gallery.json fill these mosaic cells, in order.
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

const photoSrc = (file: string) => `/Gallery/${file}`;

function Tile({
  photo,
  sizes,
  className,
  onOpen,
}: {
  photo: (typeof photos)[number];
  sizes: string;
  className: string;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`View photo: ${photo.alt}`}
      className={`${className} relative block overflow-hidden bg-gray-900 border-2 border-gray-800 group transition-all hover:border-zerologon-yellow focus-visible:border-zerologon-yellow focus-visible:outline-none cursor-crosshair`}
    >
      <Image src={photoSrc(photo.file)} alt="" fill sizes={sizes} className="object-cover" />
      <span className="absolute inset-0 bg-yellow-400/15 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity flex items-center justify-center">
        <span className="font-share-tech text-xs text-zerologon-yellow uppercase tracking-widest bg-zerologon-black px-3 py-1 border border-zerologon-yellow">
          View
        </span>
      </span>
    </button>
  );
}

export default function Gallery() {
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
    <section ref={sectionRef} id="gallery" className="bg-zerologon-black px-4 py-16 sm:px-6 lg:px-16 lg:py-24 scroll-mt-16">
      <div className="flex items-center gap-2 sm:gap-4 mb-8 sm:mb-12">
        <span className="font-bebas text-4xl sm:text-5xl leading-none" style={{ color: '#1a1a1a', WebkitTextStroke: '2px white', opacity: 0.15 }}>05</span>
        <h2 className="font-bebas text-3xl sm:text-5xl leading-none tracking-widest text-zerologon-white">GALLERY</h2>
        <div className="hidden sm:block flex-1 h-1 bg-zerologon-yellow ml-4"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-12 auto-rows-[9rem] sm:auto-rows-[12rem] lg:auto-rows-[14rem] gap-1 sm:gap-2">
        {mosaic.map((photo, i) => (
          <Tile
            key={photo.file}
            photo={photo}
            className={MOSAIC_LAYOUTS[i]}
            sizes={i === 0 ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 50vw, 33vw'}
            onOpen={() => setActive(i)}
          />
        ))}
      </div>

      {showAll && (
        <div id="gallery-more" className="mt-1 sm:mt-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1 sm:gap-2">
          {more.map((photo, i) => (
            <Tile
              key={photo.file}
              photo={photo}
              className="aspect-[4/3]"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              onOpen={() => setActive(mosaic.length + i)}
            />
          ))}
        </div>
      )}

      <div className="mt-8 sm:mt-10 text-center">
        <button
          type="button"
          onClick={toggle}
          aria-expanded={showAll}
          aria-controls="gallery-more"
          className="btn btn-outline"
        >
          {showAll ? 'Show less' : `View all (${photos.length})`}
        </button>
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
        className="m-0 h-dvh w-dvw max-h-none max-w-none bg-black/95 p-0"
      >
        {active !== null && (
          <div data-stage="true" className="relative h-full w-full">
            <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-4 py-3 font-share-tech text-xs text-gray-400 tracking-widest">
              <span>
                {active + 1} / {photos.length}
              </span>
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close photo viewer"
                className="text-zerologon-yellow border-2 border-zerologon-yellow p-1.5 bg-zerologon-black hover:bg-zerologon-yellow hover:text-zerologon-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div data-stage="true" className="absolute inset-x-2 sm:inset-x-16 top-16 bottom-4">
              <Image
                key={photos[active].file}
                src={photoSrc(photos[active].file)}
                alt={photos[active].alt}
                fill
                sizes="100vw"
                className="object-contain pointer-events-none"
              />
            </div>

            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous photo"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 text-zerologon-yellow border-2 border-zerologon-yellow p-1.5 bg-zerologon-black hover:bg-zerologon-yellow hover:text-zerologon-black transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next photo"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 text-zerologon-yellow border-2 border-zerologon-yellow p-1.5 bg-zerologon-black hover:bg-zerologon-yellow hover:text-zerologon-black transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </dialog>
    </section>
  );
}
