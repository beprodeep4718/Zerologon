export type EventType = 'ctf' | 'workshop' | 'talk';

export type EventLink = { label: string; url: string };

export type EventStat = { label: string; value: string };

export type Photo = { src: string; alt: string; position?: string };

export type ClubEvent = {
  id: string;
  title: string;
  subtitle?: string;
  type: EventType;
  // Full ISO date. Set datePrecision to "month" when the day isn't known.
  date?: string;
  datePrecision?: 'day' | 'month';
  // For older events known only by academic year, such as "2024-25".
  academicYear?: string;
  dateToBeAnnounced?: boolean;
  summary?: string;
  organisers?: string;
  description?: string;
  stats?: EventStat[];
  links: EventLink[];
  featured?: boolean;
  photo?: Photo;
};

export type Member = {
  name: string;
  initials: string;
  role: string;
  batch: string;
  image?: string;
  imagePosition?: string;
};

export type SocialLink = { label: string; url: string };

export type Site = {
  name: string;
  description: string;
  college: string;
  department: string;
  founded: string;
  hero: {
    headline: string;
    intro: string;
    nameOrigin: string;
  };
  signoff: string;
  about: {
    paragraphs: string[];
    photo: Photo;
  };
  focusAreas: string[];
  peakParticipants: string;
  join: {
    heading: string;
    body: string;
    label: string;
    url: string;
  };
  email: string;
  socials: SocialLink[];
};

export type NavLink = { label: string; href: string };
