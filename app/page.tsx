'use client';

import { Trophy, Laptop, Lock, Microscope, Shield, BarChart3, Users, Target, Globe } from 'lucide-react';

export default function Home() {
  return (
    <main className="noise-overlay bg-zerologon-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-999 bg-zerologon-black border-b-4 border-zerologon-yellow flex items-center justify-between px-8 h-16">
        <a href="#hero" className="font-bebas text-2xl text-zerologon-yellow tracking-widest relative">
          ZEROLOGON<span className="animate-blink">_</span>
        </a>
        <ul className="flex gap-1">
          <li><a href="#about" className="font-share-tech text-xs text-zerologon-white uppercase tracking-widest px-3 py-2 border-2 border-transparent transition-all hover:border-zerologon-yellow hover:text-zerologon-yellow hover:bg-yellow-500/10">About</a></li>
          <li><a href="#members" className="font-share-tech text-xs text-zerologon-white uppercase tracking-widest px-3 py-2 border-2 border-transparent transition-all hover:border-zerologon-yellow hover:text-zerologon-yellow hover:bg-yellow-500/10">Members</a></li>
          <li><a href="#archives" className="font-share-tech text-xs text-zerologon-white uppercase tracking-widest px-3 py-2 border-2 border-transparent transition-all hover:border-zerologon-yellow hover:text-zerologon-yellow hover:bg-yellow-500/10">Archives</a></li>
          <li><a href="#upcoming" className="font-share-tech text-xs text-zerologon-white uppercase tracking-widest px-3 py-2 border-2 border-transparent transition-all hover:border-zerologon-yellow hover:text-zerologon-yellow hover:bg-yellow-500/10">Events</a></li>
          <li><a href="#gallery" className="font-share-tech text-xs text-zerologon-white uppercase tracking-widest px-3 py-2 border-2 border-transparent transition-all hover:border-zerologon-yellow hover:text-zerologon-yellow hover:bg-yellow-500/10">Gallery</a></li>
        </ul>
        <div className="font-share-tech text-xs text-zerologon-green flex items-center gap-2">
          <span className="w-2 h-2 bg-zerologon-green rounded-full animate-pulse"></span>
          SYSTEMS ONLINE
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen bg-zerologon-black grid grid-cols-2 relative overflow-hidden pt-16">
        <div className="hero-grid-bg"></div>
        <div className="scanlines"></div>
        
        <div className="relative z-10 flex flex-col justify-center px-12 py-20 border-r-4 border-zerologon-yellow">
          <div className="font-share-tech text-xs text-zerologon-green tracking-[0.3em] uppercase mb-6 flex items-center gap-2">
            <span className="text-zerologon-red">{'>'}</span>
            CYBERSECURITY CELL // ACTIVE
          </div>
          <h1 className="font-bebas text-9xl leading-none text-zerologon-white mb-8">
            ZERO
            <span className="text-zerologon-yellow ml-5" style={{ WebkitTextStroke: '3px #FFE500', color: 'transparent' }}>LOGON</span>
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
        <div className="relative z-10 flex items-center justify-center px-12 py-20">
          <div className="w-full max-w-md border-4 border-zerologon-black shadow-zerologon-lg bg-black">
            <div className="bg-gray-900 border-b-4 border-zerologon-black px-4 py-2 flex items-center gap-2 font-share-tech text-xs text-gray-600">
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-zerologon-red"></span>
                <span className="w-3 h-3 rounded-full bg-zerologon-yellow"></span>
                <span className="w-3 h-3 rounded-full bg-zerologon-green"></span>
              </div>
              <span>zerologon@cell:~#</span>
            </div>
            <div className="px-6 py-6 font-share-tech text-sm leading-8 text-zerologon-green min-h-80">
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

      {/* Ticker */}
      <div className="bg-zerologon-red border-y-4 border-zerologon-black overflow-hidden whitespace-nowrap py-2">
        <div className="animate-ticker inline-block font-share-tech text-sm uppercase tracking-[0.15em] text-zerologon-white">
          CTF • FORENSICS • REV ENG • WEB EXPLOITATION • CRYPTO • PWNING • OSINT • MALWARE ANALYSIS • NETWORK SECURITY • ZEROLOGON CELL • HACK EVERYTHING • DEFEND EVERYTHING • &nbsp;&nbsp;
          CTF • FORENSICS • REV ENG • WEB EXPLOITATION • CRYPTO • PWNING • OSINT • MALWARE ANALYSIS • NETWORK SECURITY • ZEROLOGON CELL • HACK EVERYTHING • DEFEND EVERYTHING • &nbsp;&nbsp;
        </div>
      </div>

      {/* About Section */}
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

      {/* Members Section */}
      <section id="members" className="bg-zerologon-black px-16 py-24 border-b-4 border-zerologon-yellow">
        <div className="flex items-center gap-4 mb-12">
          <span className="font-bebas text-5xl leading-none text-zerologon-yellow" style={{ opacity: 0.25 }}>02</span>
          <h2 className="font-bebas text-5xl leading-none tracking-[0.05em] text-zerologon-white">
            CORE <span className="text-zerologon-red">MEMBERS</span>
          </h2>
          <div className="flex-1 h-1 bg-zerologon-yellow ml-4"></div>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {[
            { initials: 'AS', name: 'Alex Smith', role: 'Lead Researcher', skills: ['Malware', 'Reverse Eng.'] },
            { initials: 'PM', name: 'Priya Mehta', role: 'CTF Specialist', skills: ['Pwning', 'Crypto'] },
            { initials: 'RD', name: 'Raj Desai', role: 'Web Security', skills: ['OWASP', 'API Hacking'] },
            { initials: 'SB', name: 'Sofia Bergström', role: 'Forensics Expert', skills: ['Digital Forensics', 'OSINT'] },
            { initials: 'AK', name: 'Arjun Kapoor', role: 'Network Security', skills: ['Infrastructure', 'IDS'] },
            { initials: 'NR', name: 'Nina Russo', role: 'Cloud Security', skills: ['AWS', 'GCP'] },
            { initials: 'VG', name: 'Victor García', role: 'Exploit Dev', skills: ['0-days', 'Shellcoding'] },
            { initials: 'TP', name: 'Tasha Park', role: 'Hardware Hacker', skills: ['IoT', 'Embedded'] },
          ].map((member, i) => (
            <div key={i} className="border-2 border-gray-700 bg-gray-950 transition-all duration-75 relative overflow-hidden group hover:border-zerologon-yellow hover:-translate-x-1 hover:-translate-y-1 hover:shadow-zerologon hover:shadow-zerologon-yellow/30">
              <div className="absolute top-0 left-0 right-0 h-1 bg-zerologon-yellow transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></div>
              
              <div className="h-32 bg-gray-900 border-b-2 border-gray-700 flex items-center justify-center font-bebas text-3xl text-zerologon-yellow relative overflow-hidden">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,229,0,0.03) 4px, rgba(255,229,0,0.03) 8px)',
                }}></div>
                <span className="relative">{member.initials}</span>
              </div>
              
              <div className="p-4">
                <div className="font-space-mono text-sm font-bold text-zerologon-white mb-1">{member.name}</div>
                <div className="font-share-tech text-xs text-zerologon-yellow uppercase tracking-[0.15em] mb-3">{member.role}</div>
                <div className="flex flex-wrap gap-1">
                  {member.skills.map((skill, j) => (
                    <span key={j} className="font-share-tech text-xs text-gray-500 border border-gray-700 px-2 py-1 uppercase">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Archives Section */}
      <section id="archives" className="bg-zerologon-white px-16 py-24 border-b-4 border-zerologon-black">
        <div className="flex items-center gap-4 mb-12">
          <span className="font-bebas text-5xl leading-none text-zerologon-yellow" style={{ WebkitTextStroke: '2px #0a0a0a', opacity: 0.25 }}>03</span>
          <h2 className="font-bebas text-5xl leading-none tracking-[0.05em]">
            ARCHIVES <span className="text-zerologon-red">& CTFs</span>
          </h2>
          <div className="flex-1 h-1 bg-zerologon-black ml-4"></div>
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
            <div key={i} className="grid grid-cols-[100px_1fr_auto] border-b-4 border-zerologon-black last:border-b-0 transition-all hover:bg-zerologon-black hover:[&_.archive-title]:text-zerologon-yellow hover:[&_.archive-badge]:border-zerologon-yellow hover:[&_.archive-date]:bg-zerologon-yellow hover:[&_.archive-date]:text-zerologon-black hover:[&_.archive-meta]:text-gray-500 hover:[&_.archive-link]:text-zerologon-green">
              <div className="bg-zerologon-black text-zerologon-yellow font-bebas text-sm flex flex-col items-center justify-center px-4 py-5 border-r-4 border-zerologon-black transition-all archive-date">
                <div>{archive.date}</div>
                <div className="text-lg">{archive.day}</div>
                <div className="text-xs text-gray-600 mt-1 year">{archive.year}</div>
              </div>

              <div className="px-6 py-5">
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

              <a href="#" className="px-6 py-5 border-l-4 border-zerologon-black font-share-tech text-xs text-gray-600 uppercase tracking-widest transition-all archive-link hover:text-zerologon-green hover:border-gray-700">
                {archive.link}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Events Section */}
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

      {/* Gallery Section */}
      <section id="gallery" className="bg-zerologon-black px-16 py-24">
        <div className="flex items-center gap-4 mb-12">
          <span className="font-bebas text-5xl leading-none" style={{ color: '#1a1a1a', WebkitTextStroke: '2px white', opacity: 0.15 }}>05</span>
          <h2 className="font-bebas text-5xl leading-none tracking-widest text-zerologon-white">GALLERY</h2>
          <div className="flex-1 h-1 bg-zerologon-yellow ml-4"></div>
        </div>

        <div className="grid grid-cols-12 grid-rows-3 gap-1">
          {[
            { colSpan: 5, rowSpan: 2, label: 'CTF Victories', Icon: Trophy },
            { colSpan: 3, rowSpan: 1, label: 'Hardware Lab', Icon: Laptop },
            { colSpan: 4, rowSpan: 1, label: 'Crypto Workshop', Icon: Lock },
            { colSpan: 3, rowSpan: 2, label: 'Research', Icon: Microscope },
            { colSpan: 2, rowSpan: 2, label: 'Defense', Icon: Shield },
            { colSpan: 2, rowSpan: 1, label: 'Analytics', Icon: BarChart3 },
            { colSpan: 5, rowSpan: 1, label: 'Team Events', Icon: Users },
            { colSpan: 3, rowSpan: 1, label: 'Training', Icon: Target },
            { colSpan: 4, rowSpan: 1, label: 'Network Security', Icon: Globe },
          ].map((item, i) => (
            <div key={i} className="bg-gray-900 border-2 border-gray-800 overflow-hidden relative group transition-all hover:border-zerologon-yellow hover:z-10 cursor-crosshair"
              style={{
                gridColumn: `span ${item.colSpan}`,
                gridRow: `span ${item.rowSpan}`,
              }}>
              <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                <item.Icon className="w-8 h-8 text-gray-600" />
                <div className="font-share-tech text-xs text-gray-700 uppercase tracking-widest text-center text-nowrap px-2">
                  {item.label}
                </div>
              </div>
              <div className="absolute inset-0 bg-yellow-400/15 border-4 border-zerologon-yellow opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="font-share-tech text-xs text-zerologon-yellow uppercase tracking-widest bg-zerologon-black px-3 py-1 border border-zerologon-yellow">
                  View
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zerologon-black border-t-4 border-zerologon-yellow px-16 py-16 grid grid-cols-3 gap-12">
        <div>
          <div className="font-bebas text-4xl text-zerologon-yellow tracking-widest mb-3">ZEROLOGON</div>
          <p className="font-share-tech text-xs text-gray-600 leading-relaxed max-w-xs">
            Cybersecurity Cell<br />
            Department of Computer Science<br />
            Est. 2022 — Breaking things since day one.
          </p>
        </div>
        <div>
          <h4 className="font-share-tech text-xs text-zerologon-yellow uppercase tracking-widest mb-4 border-b border-gray-800 pb-2">{`// Navigate`}</h4>
          <ul className="space-y-2">
            {['About', 'Members', 'Archives', 'Events', 'Gallery'].map((link) => (
              <li key={link}>
                <a href={`#${link.toLowerCase()}`} className="font-share-tech text-xs text-gray-600 hover:text-zerologon-white transition-colors flex items-center gap-2">
                  <span className="text-zerologon-red">{'>'}</span>
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-share-tech text-xs text-zerologon-yellow uppercase tracking-widest mb-4 border-b border-gray-800 pb-2">{`// Connect`}</h4>
          <ul className="space-y-2">
            {['Twitter', 'GitHub', 'Discord', 'Email', 'LinkedIn'].map((link) => (
              <li key={link}>
                <a href="#" className="font-share-tech text-xs text-gray-600 hover:text-zerologon-white transition-colors flex items-center gap-2">
                  <span className="text-zerologon-red">{'>'}</span>
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>

      <div className="bg-zerologon-black border-t border-gray-800 px-16 py-4 flex justify-between items-center font-share-tech text-xs text-gray-700">
        <span>© 2026 ZEROLOGON CYBERSECURITY CELL. ALL RIGHTS RESERVED.</span>
        <div className="space-x-4">
          <span>CVE-2020-1472</span>
          <a href="#" className="text-zerologon-yellow hover:text-zerologon-white">PRIVACY</a>
          <span>·</span>
          <a href="#" className="text-zerologon-yellow hover:text-zerologon-white">TERMS</a>
        </div>
      </div>
    </main>
  );
}
