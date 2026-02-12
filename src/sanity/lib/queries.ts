import { groq } from "next-sanity";

// Company Info
export const companyInfoQuery = groq`
  *[_type == "companyInfo"][0] {
    name,
    tagline,
    description,
    contact {
      phone,
      email,
      address,
      socials {
        facebook,
        instagram,
        twitter,
        linkedin
      }
    },
    "aboutImage": aboutImage.asset->url,
    "aboutImageAlt": aboutImage.alt,
    aboutContent
  }
`;

// Hero Slides
export const heroSlidesQuery = groq`
  *[_type == "heroSlide"] | order(order asc) {
    "id": _id,
    headline,
    subheadline,
    "image": image.asset->url,
    "imageAlt": image.alt,
    ctaText,
    ctaLink
  }
`;

// Services
export const servicesQuery = groq`
  *[_type == "service"] {
    "id": _id,
    title,
    "slug": slug.current,
    shortDescription,
    icon,
    "mainImage": mainImage.asset->url,
    "mainImageAlt": mainImage.alt
  }
`;

export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0] {
    "id": _id,
    title,
    "slug": slug.current,
    shortDescription,
    icon,
    "mainImage": mainImage.asset->url,
    "mainImageAlt": mainImage.alt,
    content
  }
`;

// Projects
export const projectsQuery = groq`
  *[_type == "project"] | order(date desc) {
    "id": _id,
    title,
    "slug": slug.current,
    category,
    "coverImage": coverImage.asset->url,
    "coverImageAlt": coverImage.alt,
    location,
    date
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    "id": _id,
    title,
    "slug": slug.current,
    category,
    "coverImage": coverImage.asset->url,
    "coverImageAlt": coverImage.alt,
    "images": images[].asset->url,
    description,
    location,
    date
  }
`;
