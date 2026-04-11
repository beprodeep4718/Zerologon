import { Trophy, Laptop, Lock, Microscope, Shield, BarChart3, Users, Target, Globe } from 'lucide-react';

export default function Gallery() {
  const galleryItems = [
    { layout: 'col-span-2 sm:col-span-4 md:col-span-5 md:row-span-2', label: 'CTF Victories', Icon: Trophy },
    { layout: 'col-span-1 sm:col-span-2 md:col-span-3 md:row-span-1', label: 'Hardware Lab', Icon: Laptop },
    { layout: 'col-span-1 sm:col-span-2 md:col-span-4 md:row-span-1', label: 'Crypto Workshop', Icon: Lock },
    { layout: 'col-span-1 sm:col-span-2 md:col-span-3 md:row-span-2', label: 'Research', Icon: Microscope },
    { layout: 'col-span-1 sm:col-span-2 md:col-span-2 md:row-span-2', label: 'Defense', Icon: Shield },
    { layout: 'col-span-1 sm:col-span-2 md:col-span-2 md:row-span-1', label: 'Analytics', Icon: BarChart3 },
    { layout: 'col-span-2 sm:col-span-4 md:col-span-5 md:row-span-1', label: 'Team Events', Icon: Users },
    { layout: 'col-span-1 sm:col-span-2 md:col-span-3 md:row-span-1', label: 'Training', Icon: Target },
    { layout: 'col-span-1 sm:col-span-2 md:col-span-4 md:row-span-1', label: 'Network Security', Icon: Globe },
  ];

  return (
    <section id="gallery" className="bg-zerologon-black px-4 py-16 sm:px-6 lg:px-16 lg:py-24">
      <div className="flex items-center gap-2 sm:gap-4 mb-8 sm:mb-12">
        <span className="font-bebas text-4xl sm:text-5xl leading-none" style={{ color: '#1a1a1a', WebkitTextStroke: '2px white', opacity: 0.15 }}>05</span>
        <h2 className="font-bebas text-3xl sm:text-5xl leading-none tracking-widest text-zerologon-white">GALLERY</h2>
        <div className="hidden sm:block flex-1 h-1 bg-zerologon-yellow ml-4"></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-12 md:grid-rows-3 gap-1 sm:gap-2">
        {galleryItems.map((item, i) => (
          <div key={i} className={`${item.layout} min-h-28 sm:min-h-32 md:min-h-0 bg-gray-900 border-2 border-gray-800 overflow-hidden relative group transition-all hover:border-zerologon-yellow hover:z-10 cursor-crosshair`}>
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
