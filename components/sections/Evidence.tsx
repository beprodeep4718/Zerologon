import DocStrip from '@/components/DocStrip';
import EvidenceGrid from '@/components/EvidenceGrid';
import type { Photo } from '@/lib/content/types';

export default function Evidence({ photos }: { photos: Photo[] }) {
  return (
    <section id="evidence" className="pt-24">
      <DocStrip section={5} />

      <div className="wrap flex flex-wrap items-baseline justify-between gap-4 pt-20 pb-14">
        <h2 className="big">Evidence</h2>
        <p className="label">{photos.length} exhibits</p>
      </div>

      <div className="wrap">
        <EvidenceGrid photos={photos} />
      </div>
    </section>
  );
}
