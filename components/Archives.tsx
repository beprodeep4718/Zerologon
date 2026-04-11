export default function Archives() {
  return (
    <section id="archives" className="bg-zerologon-white px-4 py-16 sm:px-6 lg:px-16 lg:py-24 border-b-4 border-zerologon-black">
      <div className="flex items-center gap-2 sm:gap-4 mb-8 sm:mb-12">
        <span className="font-bebas text-4xl sm:text-5xl leading-none text-zerologon-yellow" style={{ WebkitTextStroke: '2px #0a0a0a', opacity: 0.25 }}>03</span>
        <h2 className="font-bebas text-3xl sm:text-5xl leading-none tracking-[0.05em]">
          ARCHIVES <span className="text-zerologon-red">& CTFs</span>
        </h2>
        <div className="hidden sm:block flex-1 h-1 bg-zerologon-black ml-4"></div>
      </div>

      <div className="border-4 border-zerologon-black shadow-zerologon-lg">
        {[
          { date: 'DEC', day: '22', year: '2025', type: 'ctf', title: 'ImaginaryCTF 2025', meta: '1st Place - Web & Pwning', link: 'View Writeup →' },
          { date: 'NOV', day: '08', year: '2025', type: 'workshop', title: 'Advanced Malware Analysis', meta: 'Guest lecture at IIT Delhi', link: 'Materials →' },
          { date: 'SEP', day: '14', year: '2025', type: 'ctf', title: 'DEF CON 33 Preliminaries', meta: '12th place globally', link: 'View Writeup →' },
          { date: 'AUG', day: '30', year: '2025', type: 'talk', title: 'Zero Trust Security in 2025', meta: 'Security Conference Panel', link: 'Slides →' },
          { date: 'JUL', day: '04', year: '2025', type: 'ctf', title: 'Google Capture The Flag', meta: 'Qualified for finals', link: 'Results →' },
          { date: 'JUN', day: '21', year: '2025', type: 'workshop', title: 'Cryptography Workshop', meta: '50+ participants trained', link: 'GitHub →' },
        ].map((archive, i) => (
          <div key={i} className="grid grid-cols-1 sm:grid-cols-[100px_1fr_auto] border-b-4 border-zerologon-black last:border-b-0 transition-all hover:bg-zerologon-black hover:[&_.archive-title]:text-zerologon-yellow hover:[&_.archive-badge]:border-zerologon-yellow hover:[&_.archive-date]:bg-zerologon-yellow hover:[&_.archive-date]:text-zerologon-black hover:[&_.archive-meta]:text-gray-500 hover:[&_.archive-link]:text-zerologon-green">
            <div className="bg-zerologon-black text-zerologon-yellow font-bebas text-sm flex flex-row sm:flex-col items-center justify-between sm:justify-center px-4 py-3 sm:py-5 sm:border-r-4 border-zerologon-black transition-all archive-date">
              <div>{archive.date}</div>
              <div className="text-lg">{archive.day}</div>
              <div className="text-xs text-gray-600 sm:mt-1 year">{archive.year}</div>
            </div>

            <div className="px-4 py-4 sm:px-6 sm:py-5">
              <div className="font-share-tech text-xs uppercase tracking-widest inline-block px-2 py-1 border-2 transition-all font-bold mb-2 archive-badge"
                style={{
                  backgroundColor: archive.type === 'ctf' ? '#FF2D00' : archive.type === 'workshop' ? '#0057FF' : '#00FF88',
                  color: archive.type === 'talk' ? '#0a0a0a' : 'white',
                  borderColor: archive.type === 'ctf' ? '#FF2D00' : archive.type === 'workshop' ? '#0057FF' : '#00FF88',
                }}>
                {archive.type.toUpperCase()}
              </div>
              <div className="font-space-mono text-sm font-bold mb-1 archive-title transition-all">{archive.title}</div>
              <div className="font-share-tech text-xs text-gray-600 transition-all archive-meta">{archive.meta}</div>
            </div>

            <a href="#" className="px-4 py-3 sm:px-6 sm:py-5 border-t-4 sm:border-t-0 sm:border-l-4 border-zerologon-black font-share-tech text-xs text-gray-600 uppercase tracking-widest transition-all archive-link hover:text-zerologon-green hover:border-gray-700 text-left sm:text-right">
              {archive.link}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
