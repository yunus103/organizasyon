import { sanityFetch } from "@/sanity/lib/client";
import { companyInfoQuery } from "@/sanity/lib/queries";
import { CompanyInfo } from "@/types";
import { HeaderClient } from "./HeaderClient";

export async function Header() {
  const companyInfo = await sanityFetch<CompanyInfo>({ query: companyInfoQuery, tags: ["companyInfo"] });
  return <HeaderClient companyInfo={companyInfo} />;
}

