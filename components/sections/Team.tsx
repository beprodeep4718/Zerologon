import DocStrip from '@/components/DocStrip';
import Portrait from '@/components/Portrait';
import type { Member } from '@/lib/content/types';

export default function Team({ members }: { members: Member[] }) {
  return (
    <section id="team" className="pt-24">
      <DocStrip section={4} />

      <div className="wrap flex flex-wrap items-baseline justify-between gap-4 pt-20 pb-14">
        <h2 className="big">Report team</h2>
        <p className="label">{members.length} core members</p>
      </div>

      <div className="wrap">
        <ul className="grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-4">
          {members.map((member, i) => (
            <li key={member.name} className="rise">
              <Portrait member={member} />
              <div className="mt-2.5 grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-0.5">
                <h3 className="text-xl leading-tight font-normal">{member.name}</h3>
                <span className="label">OP-{String(i + 1).padStart(2, '0')}</span>
                <p className="text-[15px] text-muted">{member.role}</p>
                <span className="label">{member.batch}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
