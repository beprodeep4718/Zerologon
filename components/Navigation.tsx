'use client';
import DecryptedText from "./animation/DecryptedText";

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-999 bg-zerologon-black border-b-4 border-zerologon-yellow flex items-center justify-between px-8 h-16">
      <a href="#hero" className="font-bebas text-2xl text-zerologon-yellow tracking-widest relative">
    <DecryptedText text="ZEROLOGON" /><span className="animate-blink">_</span>
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
  );
}
