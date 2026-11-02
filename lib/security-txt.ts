import type { Site } from './content/types';

const FIELD_FOR_SOCIAL: Record<string, string> = {
  Discord: 'Community',
  GitHub: 'Code',
  LinkedIn: 'Updates',
  Twitter: 'Updates',
};

// The links shown on the Contact page, in the style of a security.txt file.
export function contactLines({ email, join, socials }: Site) {
  return [
    ...(email ? [{ field: 'Contact', value: email, href: `mailto:${email}` }] : []),
    ...(join.url ? [{ field: 'Join', value: join.url, href: join.url }] : []),
    ...socials.map(({ label, url }) => ({ field: FIELD_FOR_SOCIAL[label] ?? label, value: url, href: url })),
  ];
}
