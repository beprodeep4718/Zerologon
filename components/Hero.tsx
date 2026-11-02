import ByteGrid from './ByteGrid';
import type { ClubEvent, Site } from '@/lib/content/types';

export default function Hero({
  site,
  nextEvent,
  stats,
}: {
  site: Site;
  nextEvent?: ClubEvent;
  stats: { value: string; label: string }[];
}) {
  return (
    <section id="hero">
      <div className="wrap grid grid-cols-1 items-center gap-12 pt-14 pb-14 sm:pt-20 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16 lg:pt-24 lg:pb-20">
        <div>
          <h1 className="display">{site.hero.headline}</h1>
          <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-muted">{site.hero.intro}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {nextEvent && (
              <a href="#upcoming" className="btn btn-primary">
                See {nextEvent.title}
              </a>
            )}
            <a href="#events" className={nextEvent ? 'btn btn-outline' : 'btn btn-primary'}>
              Past events
            </a>
          </div>
        </div>
        <ByteGrid caption={site.hero.gridCaption} />
      </div>

      <div className="border-t border-line">
        <dl className="wrap grid grid-cols-3 gap-4 py-6 sm:gap-6 sm:py-8">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse gap-1">
              <dt className="text-sm text-muted sm:text-base">{stat.label}</dt>
              <dd className="text-2xl font-semibold sm:text-3xl">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
