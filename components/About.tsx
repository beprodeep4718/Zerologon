import Photo from './Photo';
import type { Site } from '@/lib/content/types';

export default function About({ site }: { site: Site }) {
  return (
    <section id="about" className="on-paper section">
      <div className="wrap grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[3/2] overflow-hidden rounded-md bg-rule">
          <Photo
            src={site.about.photo.src}
            alt={site.about.photo.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            style={{ objectPosition: site.about.photo.position }}
          />
        </div>

        <div>
          <h2 className="heading">About us</h2>
          <div className="mt-6 max-w-[38rem] space-y-4 text-lg leading-relaxed text-ink-soft">
            {site.about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <h3 className="mt-8 text-lg">What we work on</h3>
          <ul className="mt-3 grid max-w-[30rem] grid-cols-2 gap-x-6 gap-y-1.5 text-ink-soft">
            {site.focusAreas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
