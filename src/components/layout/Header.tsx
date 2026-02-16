import { sanityFetch } from "@/sanity/lib/client";
import { companyInfoQuery, categoriesQuery } from "@/sanity/lib/queries";
import { CompanyInfo, Category } from "@/types";
import { HeaderClient } from "./HeaderClient";

export async function Header() {
  const [companyInfo, categories] = await Promise.all([
    sanityFetch<CompanyInfo>({ query: companyInfoQuery, tags: ["companyInfo"] }),
    sanityFetch<Category[]>({ query: categoriesQuery, tags: ["category", "service"] })
  ]);

  return <HeaderClient companyInfo={companyInfo} categories={categories} />;
}

