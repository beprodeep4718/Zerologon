import { SECTIONS } from '@/lib/nav';

// The marking line that opens each section of a security report.
export default function DocStrip({ section }: { section: number }) {
  return (
    <div className="wrap">
      <div className="label flex flex-wrap justify-between gap-4 border-y border-rule py-2.5">
        <span>TLP:CLEAR</span>
        <span>ZL-RPT-2026</span>
        <span>
          Section {section} of {SECTIONS.length}
        </span>
      </div>
    </div>
  );
}
