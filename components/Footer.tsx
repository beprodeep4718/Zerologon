import Wordmark from './Wordmark';
import type { NavLink, Site } from '@/lib/content/types';

const LINK_CLASS = 'text-muted transition-colors hover:text-paper';

export default function Footer({ site, nav }: { site: Site; nav: NavLink[] }) {
  const details = ['Cybersecurity cell', site.department, site.college, `Est. ${site.founded}`].filter(Boolean);
  const contact = [
    ...site.socials,
    ...(site.email ? [{ label: 'Email', url: `mailto:${site.email}` }] : []),
  ];

  return (
    <footer className="border-t border-line">
      <div className="wrap grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] lg:py-16">
        <div>
          <Wordmark />
          <ul className="mt-4 space-y-1 text-muted">
            {details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-base [font-stretch:100%]">Navigate</h2>
          <ul className="mt-3 space-y-2">
            {nav.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={LINK_CLASS}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {contact.length > 0 && (
          <div>
            <h2 className="text-base [font-stretch:100%]">Connect</h2>
            <ul className="mt-3 space-y-2">
              {contact.map((link) => (
                <li key={link.label}>
                  <a href={link.url} className={LINK_CLASS}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="border-t border-line">
        <div className="wrap flex flex-col gap-1 py-5 text-sm text-muted sm:flex-row sm:justify-between">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <span className="font-mono">CVE-2020-1472</span>
        </div>
      </div>
    </footer>
  );
}
