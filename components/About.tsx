import archives from '@/data/archives.json';
import members from '@/data/members.json';

export default function About() {
  const stats = [
    { num: String(archives.length), label: 'EVENTS RUN' },
    { num: String(members.length), label: 'CORE MEMBERS' },
    { num: '350+', label: 'PARTICIPANTS AT A SINGLE CTF' },
  ];

  return (
    <section id="about" className="bg-zerologon-white px-4 py-16 sm:px-6 lg:px-16 lg:py-24 border-b-4 border-zerologon-black">
      <div className="flex items-center gap-2 sm:gap-4 mb-8 sm:mb-12">
        <span className="font-bebas text-4xl sm:text-5xl leading-none text-zerologon-yellow" style={{ WebkitTextStroke: '2px #0a0a0a', opacity: 0.25 }}>01</span>
        <h2 className="font-bebas text-3xl sm:text-5xl leading-none tracking-[0.05em]">
          ABOUT <span className="text-zerologon-red">US</span>
        </h2>
        <div className="hidden sm:block flex-1 h-1 bg-zerologon-black ml-4"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-4 border-zerologon-black shadow-zerologon-lg">
        <div className="px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12 lg:border-r-4 lg:border-zerologon-black border-b-4 border-zerologon-black lg:border-b-0">
          <p className="text-sm sm:text-base leading-relaxed text-gray-700 mb-6">
            <span className="font-bebas text-4xl sm:text-5xl float-left leading-none mr-1 text-zerologon-red">Z</span>
            erologon is the official cybersecurity cell of our college. We&apos;re named after the Windows vulnerability CVE-2020-1472.
          </p>
          <p className="text-sm sm:text-base leading-relaxed text-gray-700 mb-6">
            We run CTFs, workshops, and talks on campus, and our members work on everything from reverse engineering malware to web exploitation.
          </p>
          <div className="flex flex-wrap gap-2 mt-6">
            {['CTF', 'MALWARE', 'PWNING', 'OSINT', 'CRYPTO', 'WEB'].map((tag) => (
              <span key={tag} className="font-share-tech text-xs px-2 py-1 border-2 border-zerologon-black bg-zerologon-yellow uppercase tracking-widest shadow-zerologon">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-zerologon-black px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12 flex flex-col justify-center gap-6 sm:gap-8">
          {stats.map((stat, i) => (
            <div key={i} className={i !== stats.length - 1 ? 'pb-8 border-b border-gray-800' : ''}>
              <div className="font-bebas text-4xl sm:text-5xl text-zerologon-yellow leading-none">{stat.num}</div>
              <div className="font-share-tech text-xs text-gray-600 uppercase tracking-[0.2em] mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
