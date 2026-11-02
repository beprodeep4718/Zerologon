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
        background: '#1322ff',
        color: '#ffffff',
      }}
    >
      <div style={{ fontSize: 220, lineHeight: 0.85 }}>:(</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ fontSize: 64, lineHeight: 1.05 }}>{site.hero.headline}</div>
        <div style={{ fontSize: 28 }}>Stop code: CVE_2020_1472</div>
      </div>
    </div>,
    size,
  );
}
