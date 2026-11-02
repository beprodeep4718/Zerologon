import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import UpcomingEvents from '@/components/UpcomingEvents';
import Archives from '@/components/Archives';
import Members from '@/components/Members';
import Gallery from '@/components/Gallery';
import Join, { joinHref } from '@/components/Join';
import Footer from '@/components/Footer';
import { getEvents, getGallery, getMembers, getSite } from '@/lib/content';

// Rebuild hourly so events move from upcoming to past once their date goes by.
export const revalidate = 3600;

export default async function Home() {
  const [site, { upcoming, past }, members, photos] = await Promise.all([
    getSite(),
    getEvents(),
    getMembers(),
    getGallery(),
  ]);

  const stats = [
    { value: String(past.length), label: 'events run' },
    { value: String(members.length), label: 'core members' },
    { value: site.peakParticipants, label: 'at a single CTF' },
  ];

  const nav = [
    { label: 'About', href: '#about' },
    { label: 'Past events', href: '#events' },
    { label: 'Team', href: '#team' },
    { label: 'Gallery', href: '#gallery' },
    ...(joinHref(site) ? [{ label: 'Join', href: '#join' }] : []),
  ];

  return (
    <>
      <Navigation nav={nav} nextEvent={upcoming[0]} />
      <main id="main">
        <Hero site={site} nextEvent={upcoming[0]} stats={stats} />
        <About site={site} />
        <UpcomingEvents events={upcoming} />
        <Archives events={past} />
        <Members members={members} />
        <Gallery photos={photos} />
        <Join site={site} />
      </main>
      <Footer site={site} nav={nav} />
    </>
  );
}
