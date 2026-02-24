export interface Category {
  id: string;
  title: string;
  slug: string;
  description?: string;
  services?: Service[];
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  icon?: string;
  mainImage: string;
  mainImageAlt?: string;
  gallery?: { url: string; alt?: string }[];
  content?: string; // HTML content for detail page
  category?: Category;
}

export interface Project {
  id: string;
  _id?: string;
  title: string;
  slug: string;
  category: string;
  coverImage: string;
  coverImageAlt?: string;
  images?: string[];
  description: string;
  details?: any; // Portable Text
  services?: Service[];
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
    whatsapp?: string;
    email: string;
    address: string;
    googleMapsEmbed?: string;
    socials: {
      facebook?: string;
      instagram?: string;
      linkedin?: string;
      twitter?: string;
      youtube?: string;
    };
  };
  aboutImage?: string;
  aboutImageAlt?: string;
  aboutContent?: any;
  logo?: string;
  logoAlt?: string;
  pageHeroImage?: string;
  pageHeroImageAlt?: string;
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
  imageAlt?: string;
  ctaText: string;
  ctaLink: string;
}
