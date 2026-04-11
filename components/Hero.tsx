'use client';
import { useState, useEffect } from 'react';
import DecryptedText from "./animation/DecryptedText";
import TextType from "./TextType";

// Helper: ms to type a string
const typeTime = (text: string, speed: number) => text.length * speed;

const SPEED = 20;
const DELAYS = {
  whoamiCmd:   0,
  whoamiRes:   typeTime("$ ./whoami.sh", SPEED) + 200,
  statusCmd:   typeTime("$ ./whoami.sh", SPEED) + typeTime("zerologon_cell", SPEED) + 500,
  statusLine1: typeTime("$ ./whoami.sh", SPEED) + typeTime("zerologon_cell", SPEED) + typeTime("$ ./status.sh", SPEED) + 700,
  statusLine2: typeTime("$ ./whoami.sh", SPEED) + typeTime("zerologon_cell", SPEED) + typeTime("$ ./status.sh", SPEED) + typeTime("STATUS: ACTIVE ✓", SPEED) + 900,
  statusLine3: typeTime("$ ./whoami.sh", SPEED) + typeTime("zerologon_cell", SPEED) + typeTime("$ ./status.sh", SPEED) + typeTime("STATUS: ACTIVE ✓", SPEED) + typeTime("MEMBERS: 8", SPEED) + 1100,
  intelCmd:    typeTime("$ ./whoami.sh", SPEED) + typeTime("zerologon_cell", SPEED) + typeTime("$ ./status.sh", SPEED) + typeTime("STATUS: ACTIVE ✓", SPEED) + typeTime("MEMBERS: 8", SPEED) + typeTime("CTFS_WON: ∞", SPEED) + 1400,
  intelRes:    typeTime("$ ./whoami.sh", SPEED) + typeTime("zerologon_cell", SPEED) + typeTime("$ ./status.sh", SPEED) + typeTime("STATUS: ACTIVE ✓", SPEED) + typeTime("MEMBERS: 8", SPEED) + typeTime("CTFS_WON: ∞", SPEED) + typeTime("$ ./intel.sh", SPEED) + 1600,
};

export default function Hero() {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    setStarted(true);
  }, []);

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

            {/* $ ./whoami.sh */}
            <div className="block text-gray-600">
              {started && (
                <TextType
                  as="span"
                  text="$ ./whoami.sh"
                  typingSpeed={SPEED}
                  initialDelay={DELAYS.whoamiCmd}
                  pauseDuration={99999}
                  showCursor={false}
                  loop={false}
                />
              )}
            </div>

            {/* zerologon_cell */}
            <div className="block">
              {started && (
                <TextType
                  as="span"
                  text="zerologon_cell"
                  typingSpeed={SPEED}
                  initialDelay={DELAYS.whoamiRes}
                  pauseDuration={99999}
                  showCursor={false}
                  loop={false}
                />
              )}
            </div>

            {/* $ ./status.sh */}
            <div className="block text-gray-600 mt-4">
              {started && (
                <TextType
                  as="span"
                  text="$ ./status.sh"
                  typingSpeed={SPEED}
                  initialDelay={DELAYS.statusCmd}
                  pauseDuration={99999}
                  showCursor={false}
                  loop={false}
                />
              )}
            </div>

            {/* STATUS: ACTIVE ✓ */}
            <div className="block">
              {started && (
                <TextType
                  as="span"
                  text="STATUS: ACTIVE ✓"
                  typingSpeed={SPEED}
                  initialDelay={DELAYS.statusLine1}
                  pauseDuration={99999}
                  showCursor={false}
                  loop={false}
                />
              )}
            </div>

            {/* MEMBERS: 8 */}
            <div className="block">
              {started && (
                <TextType
                  as="span"
                  text="MEMBERS: 8"
                  typingSpeed={SPEED}
                  initialDelay={DELAYS.statusLine2}
                  pauseDuration={99999}
                  showCursor={false}
                  loop={false}
                />
              )}
            </div>

            {/* CTFS_WON: ∞ */}
            <div className="block">
              {started && (
                <TextType
                  as="span"
                  text="CTFS_WON: ∞"
                  typingSpeed={SPEED}
                  initialDelay={DELAYS.statusLine3}
                  pauseDuration={99999}
                  showCursor={false}
                  loop={false}
                />
              )}
            </div>

            {/* $ ./intel.sh */}
            <div className="block text-gray-600 mt-4">
              {started && (
                <TextType
                  as="span"
                  text="$ ./intel.sh"
                  typingSpeed={SPEED}
                  initialDelay={DELAYS.intelCmd}
                  pauseDuration={99999}
                  showCursor={false}
                  loop={false}
                />
              )}
            </div>

            {/* Cycling intel messages */}
            <div className="block">
              {started && (
                <TextType
                  as="span"
                  text={[
                    "Hacking is not a crime, it's a mindset.",
                    "CTF season is always open.",
                    "Recon. Exploit. Report. Repeat.",
                    "We don't break things. We understand them.",
                  ]}
                  typingSpeed={60}
                  deletingSpeed={35}
                  initialDelay={DELAYS.intelRes}
                  pauseDuration={1800}
                  cursorCharacter="▌"
                  cursorClassName="text-zerologon-yellow"
                  showCursor
                  loop
                />
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}