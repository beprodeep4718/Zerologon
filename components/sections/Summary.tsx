import DocStrip from '@/components/DocStrip';
import Zero3D from '@/components/Zero3D';
import { formatEventDate } from '@/lib/content/format';
import type { ClubEvent, Site } from '@/lib/content/types';

export default function Summary({
  site,
  next,
  featured,
  closedCount,
  memberCount,
}: {
  site: Site;
  next?: ClubEvent;
  featured?: ClubEvent;
  closedCount: number;
  memberCount: number;
}) {
  const figures = [
    { value: String(closedCount), label: 'events closed' },
    { value: String(memberCount), label: 'core members' },
    ...(site.peakParticipants ? [{ value: site.peakParticipants, label: 'at a single CTF' }] : []),
  ];

  return (
    <section id="summary">
      <DocStrip section={1} />

      <div className="wrap grid grid-cols-1 items-center gap-10 py-12 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:py-14">
        <div className="flex flex-col gap-8">
          <p data-hero className="label">Security assessment report, cover page</p>
          <h1 data-hero-heading className="big">{site.hero.headline}</h1>
          <dl data-hero className="border-t border-rule">
            <div className="kv">
              <dt className="label">Prepared by</dt>
              <dd>{site.name}, cyber security cell of {site.college}</dd>
            </div>
            <div className="kv">
              <dt className="label">Active since</dt>
              <dd>{site.founded}</dd>
            </div>
            <div className="kv">
              <dt className="label">Classification</dt>
              <dd>TLP:CLEAR, public</dd>
            </div>
          </dl>
        </div>
        <Zero3D poster="a" alt="A rough cast metal slashed zero, the club's mark" />
      </div>

      <div className="wrap">
        <div className="part rise">
          <h2 className="label">1.1 Executive summary</h2>
          <p className="statement max-w-[19em]">{site.hero.intro}</p>
        </div>

        <div className="part rise">
          <h2 className="label">1.2 Key figures</h2>
          <dl className="grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-8">
            {figures.map((figure) => (
              <div key={figure.label} className="flex flex-col-reverse gap-2.5">
                <dt className="label">{figure.label}</dt>
                <dd data-count className="text-7xl leading-none tracking-tight tabular-nums">{figure.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {featured && (
          <div className="part rise">
            <h2 className="label">1.3 Featured case study</h2>
            <a href={`#${featured.id}`} className="link-quiet">
              <span className="label block">{featured.ref}</span>
              <span className="statement">{featured.title}</span>
            </a>
          </div>
        )}
      </div>

      {next && (
        <div className="inv rise py-20">
          <a href="#events" className="wrap block">
            <p className="label">Open item, {next.date ? formatEventDate(next) : 'date to be announced'}</p>
            <p className="banner mt-3">{next.title}</p>
            {next.subtitle && <p className="mt-3">{next.subtitle}</p>}
          </a>
        </div>
      )}
    </section>
  );
}
