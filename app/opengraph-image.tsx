import { ImageResponse } from 'next/og';
import { getSite } from '@/lib/content';

export const alt = 'Zerologon, a student cybersecurity cell';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  const site = await getSite();

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 64,
        background: '#0a0a0a',
        color: '#e9e9e7',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 26, color: '#9a9a9a' }}>
        <span>{site.name}</span>
        <span>TLP:CLEAR</span>
      </div>
      <div style={{ fontSize: 88, lineHeight: 1.02, maxWidth: 900 }}>{site.hero.headline}</div>
    </div>,
    size,
  );
}
