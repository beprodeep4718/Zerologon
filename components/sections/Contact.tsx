import Image from 'next/image';
import DocStrip from '@/components/DocStrip';
import SectionEnd from '@/components/SectionEnd';
import { contactLines } from '@/lib/security-txt';
import type { Site } from '@/lib/content/types';

export default function Contact({ site }: { site: Site }) {
  const lines = contactLines(site);

  return (
    <section id="contact" className="pt-24">
      <DocStrip section={6} />

      <div className="wrap grid grid-cols-1 items-center gap-14 py-20 md:grid-cols-2">
        <div className="flex min-w-0 flex-col gap-5">
          <h2 className="big">{site.join.heading}</h2>
          <p className="max-w-[22em] text-2xl leading-tight">{site.join.body}</p>
          {lines.length > 0 && (
            <>
              <p className="label">/.well-known/security.txt</p>
              <dl className="overflow-x-auto border border-rule p-6 font-mono text-[15px] font-normal">
                {lines.map((line) => (
                  <div key={line.field + line.value} className="flex gap-2 leading-loose whitespace-nowrap">
                    <dt>{line.field}:</dt>
                    <dd>
                      <a href={line.href} className="underline underline-offset-4">
                        {line.value}
                      </a>
                    </dd>
                  </div>
                ))}
              </dl>
            </>
          )}
        </div>
        <div className="relative aspect-square w-full max-w-[520px] justify-self-center">
          <Image
            src="/zero-c.webp"
            alt="A rough cast metal slashed zero, seen from the side"
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
            className="object-contain"
          />
        </div>
      </div>

      {site.signoff && (
        <div className="wrap border-t border-rule py-16">
          <p className="big max-w-[10em]">{site.signoff}</p>
        </div>
      )}

      <SectionEnd name={site.name} text="End of report" />
    </section>
  );
}
