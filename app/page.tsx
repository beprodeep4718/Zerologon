import Contact from '@/components/sections/Contact';
import Events from '@/components/sections/Events';
import Evidence from '@/components/sections/Evidence';
import Scope from '@/components/sections/Scope';
import Summary from '@/components/sections/Summary';
import Team from '@/components/sections/Team';
import { getEvents, getGallery, getMembers, getSite } from '@/lib/content';

// Rebuild hourly so events move from upcoming to past once their date goes by.
export const revalidate = 3600;

export default async function Report() {
  const [site, { upcoming, past }, members, photos] = await Promise.all([
    getSite(),
    getEvents(),
    getMembers(),
    getGallery(),
  ]);

  return (
    <>
      <Summary
        site={site}
        next={upcoming[0]}
        featured={past.find((event) => event.featured)}
        closedCount={past.length}
        memberCount={members.length}
      />
      <Scope site={site} />
      <Events upcoming={upcoming} past={past} />
      <Team members={members} />
      <Evidence photos={photos} />
      <Contact site={site} />
    </>
  );
}
