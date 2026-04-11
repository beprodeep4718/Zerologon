export default function UpcomingEvents() {
  return (
    <section id="upcoming" className="bg-zerologon-yellow px-16 py-24 border-b-4 border-zerologon-black relative overflow-hidden">
      <div className="absolute -right-8 top-1/2 -translate-y-1/2 font-bebas text-9xl text-black/5 tracking-widest transform rotate-90 pointer-events-none whitespace-nowrap">
        UPCOMING
      </div>

      <div className="flex items-center gap-4 mb-12 relative z-10">
        <span className="font-bebas text-5xl leading-none" style={{ opacity: 0.12 }}>04</span>
        <h2 className="font-bebas text-5xl leading-none tracking-[0.05em]">
          UPCOMING <span className="text-zerologon-red">EVENTS</span>
        </h2>
        <div className="flex-1 h-1 bg-zerologon-black ml-4"></div>
      </div>

      <div className="grid grid-cols-2 gap-6 relative z-10">
        {/* Featured Event */}
        <div className="col-span-2 bg-zerologon-black text-zerologon-white border-4 border-zerologon-black shadow-zerologon transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-zerologon-lg overflow-hidden">
          <div className="bg-zerologon-red px-5 py-4 flex justify-between items-center">
            <span className="font-share-tech text-xs text-zerologon-white uppercase tracking-[0.2em] border-2 border-zerologon-white px-2 py-1">
              FEATURED
            </span>
            <span className="font-bebas text-2xl text-zerologon-black tracking-[0.05em]">APR 15</span>
          </div>
          <div className="px-5 py-6">
            <h3 className="font-bebas text-4xl tracking-[0.05em] mb-3 leading-tight">INCTF 2026</h3>
            <p className="text-sm leading-relaxed text-gray-300 mb-6">
              India&apos;s biggest cybersecurity CTF. 48 hours of intense competition featuring reverse engineering, pwning, web exploitation, and cryptanalysis challenges. Register your team now!
            </p>
            <div className="flex gap-6 mb-6 flex-wrap">
              <div className="font-share-tech text-xs uppercase tracking-widest text-gray-400">
                <span className="text-zerologon-red">{`// `}</span>April 15-17, 2026
              </div>
              <div className="font-share-tech text-xs uppercase tracking-widest text-gray-400">
                <span className="text-zerologon-red">{`// `}</span>Online
              </div>
            </div>
            <button className="btn bg-zerologon-yellow text-zerologon-black font-bold uppercase tracking-widest">
              Register Team
            </button>
          </div>
        </div>

        {/* Regular Events */}
        {[
          { date: 'MAR 30', title: 'Web Security Workshop', desc: 'Deep dive into OWASP Top 10 and real-world exploitation techniques.', badge: 'WORKSHOP' },
          { date: 'APR 05', title: 'Malware Analysis Bootcamp', desc: '3-day intensive program covering static and dynamic analysis methods.', badge: 'TRAINING' },
          { date: 'APR 20', title: 'Hardware CTF Challenge', desc: 'IoT exploitation and embedded systems security challenges.', badge: 'COMPETITION' },
        ].map((event, i) => (
          <div key={i} className="bg-zerologon-white border-4 border-zerologon-black shadow-zerologon transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-zerologon-lg">
            <div className="bg-zerologon-black px-5 py-3 flex justify-between items-center">
              <span className="font-share-tech text-xs text-zerologon-yellow uppercase tracking-widest border-2 border-zerologon-yellow px-2 py-1">
                {event.badge}
              </span>
              <span className="font-bebas text-lg text-zerologon-white tracking-widest">{event.date}</span>
            </div>
            <div className="px-5 py-6">
              <h3 className="font-bebas text-2xl tracking-widest mb-3 leading-tight">{event.title}</h3>
              <p className="text-sm leading-relaxed text-gray-600 mb-6">{event.desc}</p>
              <div className="font-share-tech text-xs uppercase tracking-widest text-gray-500">
                <span className="text-zerologon-red">{`// `}</span>Learn More →
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
