import type { Site } from '@/lib/content/types';

export const joinHref = ({ join, email }: Site) => join.url || (email ? `mailto:${email}` : '');

export default function Join({ site }: { site: Site }) {
  const href = joinHref(site);
  if (!href) return null;

  return (
    <section id="join" className="gutter section bg-crash text-paper">
      <h2 className="type-marquee">{site.join.heading}</h2>
      <div className="mt-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <p className="max-w-[24em] text-2xl leading-snug font-light tracking-tight md:text-4xl">
          {site.join.body}
        </p>
        <a href={href} className="btn shrink-0">
          {site.join.label}
        </a>
      </div>
    </section>
  );
}
