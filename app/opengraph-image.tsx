import { ImageResponse } from 'next/og';
import { getSite } from '@/lib/content';

export const alt = 'Zerologon, a student cybersecurity cell';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const CELL = 22;
const GAP = 3;
const HIT = 122;

export default async function OpengraphImage() {
  const site = await getSite();
  const rows = Array.from({ length: 16 }, (_, row) => row);
  const cols = Array.from({ length: 16 }, (_, col) => col);

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 72,
        padding: 72,
        background: '#0e0f11',
        color: '#f2f1ec',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ fontSize: 32, color: '#b4b6bc' }}>{site.name}</div>
        <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, marginTop: 24 }}>
          {site.hero.headline}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: GAP }}>
        {rows.map((row) => (
          <div key={row} style={{ display: 'flex', gap: GAP }}>
            {cols.map((col) => (
              <div
                key={col}
                style={{
                  width: CELL,
                  height: CELL,
                  borderRadius: 3,
                  background: row * 16 + col === HIT ? '#ffd60a' : '#17191d',
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>,
    size,
  );
}
