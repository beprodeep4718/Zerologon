'use client';
import DecryptedText from "./animation/DecryptedText";

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen bg-zerologon-black grid grid-cols-1 lg:grid-cols-2 relative overflow-hidden pt-16">
      <div className="hero-grid-bg"></div>
      <div className="scanlines"></div>

      <div className="relative z-10 flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-16 sm:py-20">
        <div className="font-share-tech text-xs text-zerologon-green tracking-[0.3em] uppercase mb-6 flex items-center gap-2">
          <span className="text-zerologon-red">{'>'}</span>
          CYBERSECURITY CELL // ACTIVE
        </div>
        <h1 className="font-bebas text-7xl sm:text-8xl lg:text-9xl leading-none text-zerologon-white mb-8">
          <DecryptedText animateOn="inViewHover" text="ZERO" /><span className="animate-blink">_</span>
          <span className="text-zerologon-yellow ml-3 lg:ml-5" style={{ WebkitTextStroke: '3px #FFE500', color: 'transparent' }}>
            <DecryptedText animateOn="inViewHover" text="LOGON" />
          </span>
        </h1>
        <p className="text-sm text-gray-500 max-w-sm leading-relaxed border-l-4 border-zerologon-red pl-4 mb-8">
          We break things to understand them. A collective of hackers, defenders, and researchers pushing the boundaries of cybersecurity.
        </p>
        <div className="flex gap-4 flex-wrap">
          <a href="#upcoming" className="btn btn-primary">Upcoming Events</a>
          <a href="#about" className="btn btn-outline">Learn More</a>
        </div>
      </div>

      {/* Terminal */}
      <div className="relative z-10 flex items-center justify-center px-6 sm:px-10 lg:px-12 py-10 lg:py-20">
        <div className="w-full border-4 border-zerologon-black shadow-zerologon-lg bg-black">
          <div className="bg-gray-900 border-b-4 border-zerologon-black px-4 py-2 flex items-center gap-2 font-share-tech text-xs text-gray-600">
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-zerologon-red"></span>
              <span className="w-3 h-3 rounded-full bg-zerologon-yellow"></span>
              <span className="w-3 h-3 rounded-full bg-zerologon-green"></span>
            </div>
            <span>zerologon@cell:~#</span>
          </div>
          <div className="px-4 sm:px-6 py-6 font-share-tech text-sm leading-8 text-zerologon-green min-h-64 lg:min-h-80">
            <div className="block text-gray-600">$ ./whoami.sh</div>
            <div className="block">zerologon_cell</div>
            <div className="block text-gray-600 mt-4">$ ./status.sh</div>
            <div className="block">STATUS: <span className="text-zerologon-yellow">ACTIVE</span> ✓</div>
            <div className="block">MEMBERS: <span className="text-zerologon-yellow">8</span></div>
            <div className="block">CTFS_WON: <span className="text-zerologon-yellow">∞</span></div>
            <div className="block mt-4 text-gray-600">$ _<span className="animate-blink">▌</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}