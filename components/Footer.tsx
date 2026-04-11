export default function Footer() {
  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Members', href: '#members' },
    { label: 'Archives', href: '#archives' },
    { label: 'Events', href: '#upcoming' },
    { label: 'Gallery', href: '#gallery' },
  ];

  return (
    <>
      <footer className="bg-zerologon-black border-t-4 border-zerologon-yellow px-4 py-12 sm:px-6 lg:px-16 lg:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
        <div>
          <div className="font-bebas text-3xl sm:text-4xl text-zerologon-yellow tracking-widest mb-3">ZEROLOGON</div>
          <p className="font-share-tech text-xs text-gray-600 leading-relaxed max-w-xs">
            Cybersecurity Cell<br />
            Department of Computer Science<br />
            Est. 2022 — Breaking things since day one.
          </p>
        </div>
        <div>
          <h4 className="font-share-tech text-xs text-zerologon-yellow uppercase tracking-widest mb-4 border-b border-gray-800 pb-2">{`// Navigate`}</h4>
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="font-share-tech text-xs text-gray-600 hover:text-zerologon-white transition-colors flex items-center gap-2">
                  <span className="text-zerologon-red">{'>'}</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-share-tech text-xs text-zerologon-yellow uppercase tracking-widest mb-4 border-b border-gray-800 pb-2">{`// Connect`}</h4>
          <ul className="space-y-2">
            {['Twitter', 'GitHub', 'Discord', 'Email', 'LinkedIn'].map((link) => (
              <li key={link}>
                <a href="#" className="font-share-tech text-xs text-gray-600 hover:text-zerologon-white transition-colors flex items-center gap-2">
                  <span className="text-zerologon-red">{'>'}</span>
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>

      <div className="bg-zerologon-black border-t border-gray-800 px-4 py-4 sm:px-6 lg:px-16 flex flex-col md:flex-row md:justify-between md:items-center gap-2 font-share-tech text-xs text-gray-700">
        <span className="text-center md:text-left">© 2026 ZEROLOGON CYBERSECURITY CELL. ALL RIGHTS RESERVED.</span>
        <div className="space-x-4 text-center md:text-right">
          <span>CVE-2020-1472</span>
          <a href="#" className="text-zerologon-yellow hover:text-zerologon-white">PRIVACY</a>
          <span>·</span>
          <a href="#" className="text-zerologon-yellow hover:text-zerologon-white">TERMS</a>
        </div>
      </div>
    </>
  );
}
