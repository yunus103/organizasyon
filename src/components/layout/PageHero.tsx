import React from "react";
import { PageHeroClient } from "./PageHeroClient";
import { sanityFetch } from "@/sanity/lib/client";
import { companyInfoQuery } from "@/sanity/lib/queries";
import { CompanyInfo } from "@/types";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  breadcrumbs: Breadcrumb[];
}

export async function PageHero({ title, breadcrumbs }: PageHeroProps) {
  const companyInfo = await sanityFetch<CompanyInfo | null>({ 
    query: companyInfoQuery, 
    tags: ["companyInfo"] 
  });

  return (
    <PageHeroClient 
      title={title} 
      breadcrumbs={breadcrumbs} 
      backgroundImage={companyInfo?.pageHeroImage}
      backgroundImageAlt={companyInfo?.pageHeroImageAlt}
    />
  );
}
