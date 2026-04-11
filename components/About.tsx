export default function About() {
  return (
    <section id="about" className="bg-zerologon-white px-16 py-24 border-b-4 border-zerologon-black">
      <div className="flex items-center gap-4 mb-12">
        <span className="font-bebas text-5xl leading-none text-zerologon-yellow" style={{ WebkitTextStroke: '2px #0a0a0a', opacity: 0.25 }}>01</span>
        <h2 className="font-bebas text-5xl leading-none tracking-[0.05em]">
          ABOUT <span className="text-zerologon-red">US</span>
        </h2>
        <div className="flex-1 h-1 bg-zerologon-black ml-4"></div>
      </div>

      <div className="grid grid-cols-2 gap-0 border-4 border-zerologon-black shadow-zerologon-lg">
        <div className="px-12 py-12 border-r-4 border-zerologon-black">
          <p className="text-sm leading-relaxed text-gray-700 mb-6">
            <span className="font-bebas text-5xl float-left leading-none mr-1 text-zerologon-red">Z</span>
            erologon is the official cybersecurity cell of our college, born from a shared obsession with understanding how systems break. Named after the legendary Windows vulnerability CVE-2020-1472, we embody the spirit of zero-trust, zero-compromise security research.
          </p>
          <p className="text-sm leading-relaxed text-gray-700 mb-6">
            From reverse engineering malware to competing in international CTF competitions, our members represent the cutting edge of student-led security research. We don&apos;t just study cybersecurity — we live it, breathe it, and compete at the highest levels.
          </p>
          <div className="flex flex-wrap gap-2 mt-6">
            {['CTF', 'MALWARE', 'PWNING', 'OSINT', 'CRYPTO', 'WEB'].map((tag) => (
              <span key={tag} className="font-share-tech text-xs px-2 py-1 border-2 border-zerologon-black bg-zerologon-yellow uppercase tracking-widest shadow-zerologon">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-zerologon-black px-12 py-12 flex flex-col justify-center gap-8">
          {[
            { num: '50+', label: 'CTF WINS' },
            { num: '8', label: 'CORE MEMBERS' },
            { num: '100%', label: 'PASSION LEVEL' },
            { num: '∞', label: 'DETERMINATION' },
          ].map((stat, i) => (
            <div key={i} className={i !== 3 ? 'pb-8 border-b border-gray-800' : ''}>
              <div className="font-bebas text-5xl text-zerologon-yellow leading-none">{stat.num}</div>
              <div className="font-share-tech text-xs text-gray-600 uppercase tracking-[0.2em] mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
