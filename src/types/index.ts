export interface Service {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  icon?: string;
  mainImage: string;
  content: string; // HTML content for detail page
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  coverImage: string;
  images: string[];
  description: string;
  date?: string;
  location?: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  role?: string;
  content: string;
  avatar?: string;
}

export interface CompanyInfo {
  name: string;
  tagline: string;
  description: string;
  contact: {
    phone: string;
    email: string;
    address: string;
    socials: {
      facebook?: string;
      instagram?: string;
      linkedin?: string;
      twitter?: string;
      youtube?: string;
    };
  };
}

export interface NavItem {
  label: string;
  href: string;
}

export interface HeroSlide {
  id: string;
  headline: string;
  subheadline: string;
  image: string;
  ctaText: string;
  ctaLink: string;
}
