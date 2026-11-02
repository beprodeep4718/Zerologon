import DocStrip from '@/components/DocStrip';
import Photo from '@/components/Photo';
import type { Site } from '@/lib/content/types';

const ADVISORY = [
  ['Identifier', 'CVE-2020-1472, Zerologon'],
  ['Severity', 'Critical, CVSS 10.0'],
  ['Component', 'Windows Netlogon Remote Protocol'],
  ['Impact', 'Elevation of privilege to domain admin'],
  ['Root cause', 'AES-CFB8 used with an all-zero IV'],
  ['Found by', 'Tom Tervoort, Secura'],
  ['Patched', 'August 2020'],
];

export default function Scope({ site }: { site: Site }) {
  const [, ...whatWeDo] = site.about.paragraphs;

  return (
    <section id="scope" className="pt-24">
      <DocStrip section={2} />

      <div className="wrap py-20">
        <h2 className="big max-w-[11em]">The official cybersecurity cell of {site.college || 'our college'}.</h2>
      </div>

      <div className="relative h-[60vw] max-h-[620px]">
        <Photo
          src={site.about.photo.src}
          alt={site.about.photo.alt}
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: site.about.photo.position }}
        />
      </div>

      <div className="wrap">
        <div className="part rise border-t-0">
          <div>
            <h3 className="label">2.1 Advisory: where our name comes from</h3>
          </div>
          <div>
            <p className="statement max-w-[21em]">{site.hero.nameOrigin}</p>
            <dl className="mt-8 border-t border-rule">
              {ADVISORY.map(([term, value]) => (
                <div key={term} className="kv">
                  <dt className="label">{term}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {whatWeDo.length > 0 && (
          <div className="part rise">
            <h3 className="label">2.2 What we do</h3>
            <div className="statement max-w-[21em] space-y-4">
              {whatWeDo.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        )}
      </div>

      {site.focusAreas.length > 0 && (
        <div className="inv rise py-20">
          <div className="wrap">
            <h3 className="label">2.3 Areas in scope</h3>
            <ul className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-x-8 gap-y-3 text-3xl leading-tight tracking-tight">
              {site.focusAreas.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}
