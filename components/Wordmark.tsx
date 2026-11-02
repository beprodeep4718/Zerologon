export default function Wordmark() {
  return (
    <span className="flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className="grid size-7 place-items-center rounded-[4px] bg-signal font-mono text-xs text-ink"
      >
        00
      </span>
      <span translate="no" className="text-lg font-semibold tracking-tight [font-stretch:112%]">
        Zerologon
      </span>
    </span>
  );
}
