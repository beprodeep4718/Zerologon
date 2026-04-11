import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Ticker from '@/components/Ticker';
import About from '@/components/About';
import Members from '@/components/Members';
import Archives from '@/components/Archives';
import UpcomingEvents from '@/components/UpcomingEvents';
import Gallery from '@/components/Gallery';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-zerologon-black noise-overlay">
      <Navigation />
      <div className="fixed top-16 left-0 right-0 w-full z-99">
        <Ticker />
      </div>
      <Hero />
      <About />
      <Members />
      <Archives />
      <UpcomingEvents />
      <Gallery />
      <Footer />
    </main>
  );
}
