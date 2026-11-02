import type { Site } from '@/lib/content/types';

export const joinHref = ({ join, email }: Site) => join.url || (email ? `mailto:${email}` : '');

export default function Join({ site }: { site: Site }) {
  const href = joinHref(site);
  if (!href) return null;

  return (
    <section id="join" className="section border-t border-line">
      <div className="wrap flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <h2 className="heading">{site.join.heading}</h2>
          <p className="mt-4 max-w-[36rem] text-lg leading-relaxed text-muted">{site.join.body}</p>
        </div>
        <a href={href} className="btn btn-primary shrink-0">
          {site.join.label}
        </a>
      </div>
    </section>
  );
}
