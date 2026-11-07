import type { Site } from './content/types';
import { SITE_URL } from './utils';

// Who the club is. Kept in code so search results never depend on an empty CMS field.
export const CLUB = {
  name: 'Zerologon',
  shortTitle: 'JGEC Cyber Security Cell',
  college: 'Jalpaiguri Government Engineering College',
  collegeShort: 'JGEC',
  collegeUrl: 'https://jgec.ac.in',
  locality: 'Jalpaiguri',
  region: 'West Bengal',
  postalCode: '735102',
  country: 'IN',
} as const;

export const SEO_TITLE = `${CLUB.name} | ${CLUB.shortTitle}, ${CLUB.locality}`;

export const SEO_DESCRIPTION = `${CLUB.name} is the cyber security cell of ${CLUB.college} (${CLUB.collegeShort}), ${CLUB.locality}, ${CLUB.region}. We run CTFs, hands-on workshops and security talks for students.`;

export const SEO_KEYWORDS = [
  'Zerologon',
  'Zerologon JGEC',
  'JGEC cyber security cell',
  'JGEC cybersecurity club',
  'Jalpaiguri Government Engineering College',
  'cyber security club West Bengal',
  'CTF',
  'capture the flag',
  'ethical hacking',
  'cybersecurity workshops',
  'student cybersecurity India',
];

// schema.org data that tells search engines this site is JGEC's cyber security cell.
export function structuredData(site: Site) {
  const sameAs = site.socials.map((social) => social.url).filter(Boolean);
  const organization = {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: CLUB.name,
    alternateName: [`${CLUB.name} ${CLUB.collegeShort}`, CLUB.shortTitle, `${CLUB.college} Cyber Security Cell`],
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/zerologon-logo.png`, width: 256, height: 256 },
    description: SEO_DESCRIPTION,
    ...(site.founded && { foundingDate: site.founded }),
    ...(site.email && { email: site.email }),
    ...(sameAs.length > 0 && { sameAs }),
    knowsAbout: site.focusAreas,
    parentOrganization: {
      '@type': 'CollegeOrUniversity',
      name: CLUB.college,
      alternateName: CLUB.collegeShort,
      url: CLUB.collegeUrl,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: CLUB.locality,
      addressRegion: CLUB.region,
      postalCode: CLUB.postalCode,
      addressCountry: CLUB.country,
    },
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      organization,
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: CLUB.name,
        alternateName: CLUB.shortTitle,
        inLanguage: 'en-IN',
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
    ],
  };
}
