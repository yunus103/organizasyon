import { MetadataRoute } from "next";
import { sanityFetch } from "@/sanity/lib/client";
import { projectsQuery, servicesQuery } from "@/sanity/lib/queries";
import { Project, Service } from "@/types";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.nilayorganizasyon.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch dynamic routes
  const [services, projects] = await Promise.all([
    sanityFetch<Service[]>({ query: servicesQuery, tags: ["service"] }),
    sanityFetch<Project[]>({ query: projectsQuery, tags: ["project"] }),
  ]);

  const serviceUrls = services.map((service) => ({
    url: `${baseUrl}/hizmetler/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const projectUrls = projects.map((project) => ({
    url: `${baseUrl}/etkinliklerimiz/${project.slug}`,
    lastModified: project.date ? new Date(project.date) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const staticUrls = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/hakkimizda`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/hizmetler`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/etkinliklerimiz`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/iletisim`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    },
  ];

  return [...staticUrls, ...serviceUrls, ...projectUrls];
}
