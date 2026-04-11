export default function Footer() {
  return (
    <>
      <footer className="bg-zerologon-black border-t-4 border-zerologon-yellow px-16 py-16 grid grid-cols-3 gap-12">
        <div>
          <div className="font-bebas text-4xl text-zerologon-yellow tracking-widest mb-3">ZEROLOGON</div>
          <p className="font-share-tech text-xs text-gray-600 leading-relaxed max-w-xs">
            Cybersecurity Cell<br />
            Department of Computer Science<br />
            Est. 2022 — Breaking things since day one.
          </p>
        </div>
        <div>
          <h4 className="font-share-tech text-xs text-zerologon-yellow uppercase tracking-widest mb-4 border-b border-gray-800 pb-2">{`// Navigate`}</h4>
          <ul className="space-y-2">
            {['About', 'Members', 'Archives', 'Events', 'Gallery'].map((link) => (
              <li key={link}>
                <a href={`#${link.toLowerCase()}`} className="font-share-tech text-xs text-gray-600 hover:text-zerologon-white transition-colors flex items-center gap-2">
                  <span className="text-zerologon-red">{'>'}</span>
                  {link}
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

      <div className="bg-zerologon-black border-t border-gray-800 px-16 py-4 flex justify-between items-center font-share-tech text-xs text-gray-700">
        <span>© 2026 ZEROLOGON CYBERSECURITY CELL. ALL RIGHTS RESERVED.</span>
        <div className="space-x-4">
          <span>CVE-2020-1472</span>
          <a href="#" className="text-zerologon-yellow hover:text-zerologon-white">PRIVACY</a>
          <span>·</span>
          <a href="#" className="text-zerologon-yellow hover:text-zerologon-white">TERMS</a>
        </div>
      </div>
    </>
  );
}
