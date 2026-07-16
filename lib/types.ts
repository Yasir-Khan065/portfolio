export interface NavItem {
  id: string;
  label: string;
}

export interface JourneyItem {
  year: string;
  title: string;
  description: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  /** First/main screenshot, used as the card cover. */
  cover: string;
  images: string[];
  /** Omitted for private projects. */
  github?: string;
  demo?: string;
  /** true = show a "Private project" note instead of a repo link. */
  isPrivate?: boolean;
}
