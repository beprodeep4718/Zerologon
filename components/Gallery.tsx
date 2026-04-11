import { Trophy, Laptop, Lock, Microscope, Shield, BarChart3, Users, Target, Globe } from 'lucide-react';

export default function Gallery() {
  return (
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
  );
}
