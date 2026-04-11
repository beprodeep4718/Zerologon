export default function Members() {
  return (
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
          { initials: 'PD', name: 'Purbayan Kr. Das', role: 'Secretary', skills: ['ECE\'26', '22101105018'] },
          { initials: 'KD', name: 'Kaustav Das', role: 'Asst. Secretary', skills: ['EE\'26', '22101102013'] },
          { initials: 'AHS', name: 'Adil Hossain Sana', role: 'Treasurer', skills: ['ME\'26', '22101103006'] },
          { initials: 'SM', name: 'Swagata Mondal', role: 'Social Media Lead', skills: ['ECE\'26', '22101105035'] },
          { initials: 'AG', name: 'Ankit Ghosh', role: 'Asst. Social Media', skills: ['CSE\'27', '23101104026'] },
          { initials: 'AS', name: 'Anjali Singh', role: 'Outreach & PR Lead', skills: ['CSE\'26', '22101104025'] },
          { initials: 'AH', name: 'Amrik Hore', role: 'Asst. PR Lead', skills: ['ECE\'27', '23101105024'] },
          { initials: 'SG', name: 'Sharthak Ghosh', role: 'CTF Lead', skills: ['EE\'27', '23101102012'] },
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
  );
}