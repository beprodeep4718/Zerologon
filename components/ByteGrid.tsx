import type { CSSProperties } from 'react';

// 167 is coprime with 256, so every byte appears exactly once. The offset puts 00 at HIT.
const HIT = 122;
const bytes = Array.from({ length: 256 }, (_, i) =>
  ((i * 167 + 106) % 256).toString(16).padStart(2, '0'),
);

const cellClass = (i: number) => {
  if (i === HIT) return 'byte byte-hit';
  return i < HIT ? 'byte byte-tried' : 'byte';
};

export default function ByteGrid({ caption }: { caption: string }) {
  return (
    <figure className="w-full max-w-[34rem] lg:justify-self-end">
      <div aria-hidden="true" className="byte-grid">
        {bytes.map((byte, i) => (
          <span
            key={byte}
            className={cellClass(i)}
            style={i <= HIT ? ({ '--i': i } as CSSProperties) : undefined}
          >
            {byte}
          </span>
        ))}
      </div>
      <figcaption className="mt-4 text-sm leading-relaxed text-muted">{caption}</figcaption>
    </figure>
  );
}
