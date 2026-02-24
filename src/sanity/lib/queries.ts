import { groq } from "next-sanity";

// Company Info
export const companyInfoQuery = groq`
  *[_type == "companyInfo"][0] {
    name,
    tagline,
    description,
    contact {
      phone,
      whatsapp,
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
    aboutContent,
    "logo": logo.asset->url,
    "logoAlt": logo.alt,
    "pageHeroImage": pageHeroImage.asset->url,
    "pageHeroImageAlt": pageHeroImage.alt
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
  *[_type == "service"] | order(order asc, _createdAt desc) {
    "id": _id,
    title,
    "slug": slug.current,
    shortDescription,
    icon,
    "mainImage": mainImage.asset->url,
    "mainImageAlt": mainImage.alt,
    showOnHome,
    order
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

export const paginatedServicesQuery = groq`
  *[_type == "service" && ($category == null || references(*[_type == "category" && slug.current == $category]._id))] | order(order asc) [ $start .. $end ] {
    "id": _id,
    title,
    "slug": slug.current,
    shortDescription,
    icon,
    "mainImage": mainImage.asset->url,
    "mainImageAlt": mainImage.alt,
    category->
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
    date,
    description
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
    details,
    "services": services[]->{
      _id,
      title,
      "slug": slug.current
    },
    location,
    date
  }
`;

// Categories with Services (Mega Menu)
export const categoriesQuery = groq`
  *[_type == "category"] {
    "id": _id,
    title,
    "slug": slug.current,
    description,
    "services": *[_type == "service" && references(^._id)] {
      "id": _id,
      title,
      "slug": slug.current,
      shortDescription,
      "mainImage": mainImage.asset->url
    }
  }
`;
