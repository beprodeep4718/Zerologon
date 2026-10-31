import event from "@/data/events.json";

export default function UpcomingEvents() {
  return (
    <section
      id="upcoming"
      className="bg-zerologon-yellow px-4 py-16 sm:px-6 lg:px-16 lg:py-24 border-b-4 border-zerologon-black relative overflow-hidden"
    >
      <div className="hidden md:block absolute -right-8 top-1/2 -translate-y-1/2 font-bebas text-8xl lg:text-9xl text-black/5 tracking-widest transform rotate-90 pointer-events-none whitespace-nowrap">
        UPCOMING
      </div>

      <div className="flex items-center gap-2 sm:gap-4 mb-8 sm:mb-12 relative z-10">
        <span
          className="font-bebas text-4xl sm:text-5xl leading-none"
          style={{ opacity: 0.12 }}
        >
          04
        </span>
        <h2 className="font-bebas text-3xl sm:text-5xl leading-none tracking-[0.05em]">
          UPCOMING <span className="text-zerologon-red">EVENTS</span>
        </h2>
        <div className="hidden sm:block flex-1 h-1 bg-zerologon-black ml-4"></div>
      </div>

      <div className="relative z-10 bg-zerologon-black text-zerologon-white border-4 border-zerologon-black shadow-zerologon transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-zerologon-lg overflow-hidden">
        <div className="bg-zerologon-red px-4 py-3 sm:px-5 sm:py-4">
          <span className="font-share-tech text-xs text-zerologon-white uppercase tracking-[0.2em] border-2 border-zerologon-white px-2 py-1">
            {event.badge}
          </span>
        </div>
        <div className="px-4 py-8 sm:px-6 sm:py-10">
          <h3 className="font-bebas text-5xl sm:text-7xl tracking-[0.05em] leading-none mb-3">
            {event.title}
          </h3>
          <p className="font-bebas text-2xl sm:text-3xl tracking-[0.05em] leading-tight text-zerologon-yellow">
            {event.subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
