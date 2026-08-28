import archives from "@/data/archives.json";

const typeStyles: Record<string, { bg: string; color: string }> = {
  ctf: { bg: '#FF2D00', color: 'white' },
  workshop: { bg: '#FFB000', color: '#0a0a0a' },
  talk: { bg: '#00D9C0', color: '#0a0a0a' },
};

export default function Archives() {
  const featured = archives.find((a) => a.featured);
  const rest = archives.filter((a) => !a.featured);

  return (
    <section
      id="archives"
      className="bg-zerologon-white px-4 py-16 sm:px-6 lg:px-16 lg:py-24 border-b-4 border-zerologon-black"
    >
      <div className="flex items-center gap-2 sm:gap-4 mb-8 sm:mb-12">
        <span
          className="font-bebas text-4xl sm:text-5xl leading-none text-zerologon-yellow"
          style={{ WebkitTextStroke: "2px #0a0a0a", opacity: 0.25 }}
        >
          03
        </span>
        <h2 className="font-bebas text-3xl sm:text-5xl leading-none tracking-[0.05em]">
          ARCHIVES <span className="text-zerologon-red">& CTFs</span>
        </h2>
        <div className="hidden sm:block flex-1 h-1 bg-zerologon-black ml-4"></div>
      </div>

      {/* Featured Archive Card */}
      {featured && (
        <div className="mb-6 sm:mb-8 bg-zerologon-black text-zerologon-white border-4 border-zerologon-black shadow-zerologon transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-zerologon-lg overflow-hidden">
          <div className="bg-zerologon-red px-4 py-3 sm:px-5 sm:py-4 flex justify-between items-center gap-3">
            <span className="font-share-tech text-xs text-zerologon-white uppercase tracking-[0.2em] border-2 border-zerologon-white px-2 py-1">
              FEATURED
            </span>
            <span className="font-bebas text-xl sm:text-2xl text-zerologon-black tracking-[0.05em]">
              {[featured.date, featured.day].filter(Boolean).join(" ")}
              {(featured.date || featured.day) && featured.year ? ", " : ""}
              {featured.year}
            </span>
          </div>
          <div className="px-4 py-5 sm:px-6 sm:py-6">
            <h3 className="font-bebas text-3xl sm:text-4xl tracking-[0.05em] mb-3 leading-tight">
              {featured.title}
            </h3>
            {featured.description && (
              <p className="text-sm sm:text-base leading-relaxed text-gray-300 mb-6">
                {featured.description}
              </p>
            )}

            {featured.stats && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {featured.stats.map((stat, i) => (
                  <div
                    key={i}
                    className="border-2 border-zerologon-yellow/30 px-3 py-2"
                  >
                    <div className="font-bebas text-2xl sm:text-3xl text-zerologon-yellow leading-none">
                      {stat.value}
                    </div>
                    <div className="font-share-tech text-xs text-gray-400 uppercase tracking-widest mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {featured.link && featured.link !== "N/A" && (
              <a
                href="#"
                className="inline-block font-share-tech text-xs uppercase tracking-widest text-zerologon-yellow border-2 border-zerologon-yellow px-4 py-2 hover:bg-zerologon-yellow hover:text-zerologon-black transition-all"
              >
                {featured.link}
              </a>
            )}
          </div>
        </div>
      )}

      {/* Regular Archive List */}
      <div className="border-4 border-zerologon-black shadow-zerologon-lg">
        {rest.map((archive, i) => {
          const style = typeStyles[archive.type] ?? typeStyles.ctf;
          const hasDay = Boolean(archive.date || archive.day);
          return (
            <div
              key={i}
              className="grid grid-cols-1 sm:grid-cols-[100px_1fr_auto] border-b-4 border-zerologon-black last:border-b-0 transition-all hover:bg-zerologon-black hover:[&_.archive-title]:text-zerologon-yellow hover:[&_.archive-badge]:border-zerologon-yellow hover:[&_.archive-date]:bg-zerologon-yellow hover:[&_.archive-date]:text-zerologon-black hover:[&_.archive-meta]:text-gray-500 hover:[&_.archive-link]:text-zerologon-green"
            >
              <div className="bg-zerologon-black text-zerologon-yellow font-bebas text-sm flex flex-row sm:flex-col items-center justify-between sm:justify-center px-4 py-3 sm:py-5 sm:border-r-4 border-zerologon-black transition-all archive-date">
                {hasDay ? (
                  <>
                    <div>{archive.date}</div>
                    <div className="text-lg">{archive.day}</div>
                  </>
                ) : (
                  <div className="text-lg">{archive.year}</div>
                )}
                {hasDay && (
                  <div className="text-xs text-gray-600 sm:mt-1 year">
                    {archive.year}
                  </div>
                )}
              </div>

              <div className="px-4 py-4 sm:px-6 sm:py-5">
                <div
                  className="font-share-tech text-xs uppercase tracking-widest inline-block px-2 py-1 border-2 transition-all font-bold mb-2 archive-badge"
                  style={{
                    backgroundColor: style.bg,
                    color: style.color,
                    borderColor: style.bg,
                  }}
                >
                  {archive.type.toUpperCase()}
                </div>
                <div className="font-space-mono text-sm font-bold mb-1 archive-title transition-all">
                  {archive.title}
                </div>
                <div className="font-share-tech text-xs text-gray-600 transition-all archive-meta">
                  {archive.meta}
                </div>
              </div>

              {archive.link && archive.link !== "N/A" ? (
                <a
                  href="#"
                  className="px-4 py-3 sm:px-6 sm:py-5 border-t-4 sm:border-t-0 sm:border-l-4 border-zerologon-black font-share-tech text-xs text-gray-600 uppercase tracking-widest transition-all archive-link hover:text-zerologon-green hover:border-gray-700 text-left sm:text-right"
                >
                  {archive.link}
                </a>
              ) : (
                <div className="px-4 py-3 sm:px-6 sm:py-5 border-t-4 sm:border-t-0 sm:border-l-4 border-zerologon-black font-share-tech text-xs text-gray-700 uppercase tracking-widest text-left sm:text-right">
                  N/A
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}