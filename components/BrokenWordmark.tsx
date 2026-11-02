import { cn } from '@/lib/utils';

// ZEROLOGON drawn on a 100 x 180 grid. The O is a slashed zero, as on the club's chalkboard logo.
const GLYPHS: Record<string, string> = {
  Z: 'M0 0H100V36L40 144H100V180H0V144L60 36H0Z',
  E: 'M0 0H100V36H34V72H90V108H34V144H100V180H0Z',
  R: 'M0 0H74L100 26V82L80 102L100 180H64L46 108H34V180H0ZM34 36V72H66V36Z',
  O: 'M26 0H74L100 26V154L74 180H26L0 154V26ZM34 36H62L34 96ZM66 144H38L66 84Z',
  L: 'M0 0H34V144H100V180H0Z',
  G: 'M26 0H100V36H42L34 44V136L42 144H66V112H50V78H100V154L74 180H26L0 154V26Z',
  N: 'M0 0H36L66 104V0H100V180H64L34 76V180H0Z',
};

const WORD = 'ZEROLOGON'.split('');
const GLYPH_WIDTH = 100;
const GLYPH_HEIGHT = 180;
const GAP = 12;
const SLICES = 7;

// On phones the nine letters stack into a 3 x 3 block, squashed so it fits the screen.
const BLOCK_SQUASH = 0.72;

function Glyph({ letter, x, y, scaleY = 1 }: { letter: string; x: number; y: number; scaleY?: number }) {
  return <path d={GLYPHS[letter]} fillRule="evenodd" transform={`translate(${x} ${y}) scale(1 ${scaleY})`} />;
}

function Slices({
  id,
  width,
  height,
  className,
  children,
}: {
  id: string;
  width: number;
  height: number;
  className: string;
  children: React.ReactNode;
}) {
  const sliceHeight = height / SLICES;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMinYMax meet"
      fill="currentColor"
      className={cn('block w-full overflow-visible', className)}
      aria-hidden="true"
    >
      <defs>
        <g id={`${id}-letters`}>{children}</g>
        {Array.from({ length: SLICES }, (_, i) => (
          <clipPath key={i} id={`${id}-slice-${i}`}>
            <rect x={-width} y={i * sliceHeight} width={width * 3} height={sliceHeight + 2} />
          </clipPath>
        ))}
      </defs>
      {Array.from({ length: SLICES }, (_, i) => (
        <g key={i} className="slice">
          <g className="slice-in" clipPath={`url(#${id}-slice-${i})`}>
            <use href={`#${id}-letters`} />
          </g>
        </g>
      ))}
    </svg>
  );
}

export default function BrokenWordmark({ id, className }: { id: string; className?: string }) {
  const blockHeight = GLYPH_HEIGHT * BLOCK_SQUASH;

  return (
    <div role="img" aria-label="Zerologon" className={className}>
      <Slices
        id={`${id}-line`}
        className="hidden md:block"
        width={WORD.length * GLYPH_WIDTH + (WORD.length - 1) * GAP}
        height={GLYPH_HEIGHT}
      >
        {WORD.map((letter, i) => (
          <Glyph key={i} letter={letter} x={i * (GLYPH_WIDTH + GAP)} y={0} />
        ))}
      </Slices>

      <Slices
        id={`${id}-block`}
        className="max-h-[52svh] md:hidden"
        width={3 * GLYPH_WIDTH + 2 * GAP}
        height={3 * blockHeight + 2 * GAP}
      >
        {WORD.map((letter, i) => (
          <Glyph
            key={i}
            letter={letter}
            x={(i % 3) * (GLYPH_WIDTH + GAP)}
            y={Math.floor(i / 3) * (blockHeight + GAP)}
            scaleY={BLOCK_SQUASH}
          />
        ))}
      </Slices>
    </div>
  );
}
