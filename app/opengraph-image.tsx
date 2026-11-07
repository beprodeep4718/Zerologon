import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import { getSite } from '@/lib/content';
import { CLUB } from '@/lib/seo';

export const alt = `${CLUB.name}, the cyber security cell of ${CLUB.college}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  const [site, logo] = await Promise.all([
    getSite(),
    readFile(path.join(process.cwd(), 'public', 'zerologon-logo.png')),
  ]);

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
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse only renders plain img */}
        <img src={`data:image/png;base64,${logo.toString('base64')}`} width={112} height={112} alt="" style={{ borderRadius: 56 }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontSize: 40 }}>{CLUB.name}</span>
          <span style={{ fontSize: 26, color: '#9a9a9a' }}>
            {CLUB.shortTitle}, {CLUB.locality}
          </span>
        </div>
      </div>
      <div style={{ fontSize: 84, lineHeight: 1.02, maxWidth: 960 }}>{site.hero.headline}</div>
      <div style={{ fontSize: 26, color: '#9a9a9a' }}>{CLUB.college}</div>
    </div>,
    size,
  );
}
