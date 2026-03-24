import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

import { sanityFetch } from "@/sanity/lib/client";
import { companyInfoQuery } from "@/sanity/lib/queries";
import { CompanyInfo } from "@/types";

export async function generateMetadata(): Promise<Metadata> {
  const company = await sanityFetch<CompanyInfo>({
    query: companyInfoQuery,
    tags: ["companyInfo"],
  });

  const siteTitle = company?.name || "Nilay Organizasyon";
  const siteDescription = company?.description || "Nilay Organizasyon Resmi Web Sitesi";

  return {
    title: {
      default: siteTitle,
      template: `%s | ${siteTitle}`,
    },
    description: siteDescription,
    verification: {
      google: "Zxe5P-GSVD9Dmn9rdlTcrDqAT2ffWEYIxIriQUfZrXE",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-background text-foreground font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
