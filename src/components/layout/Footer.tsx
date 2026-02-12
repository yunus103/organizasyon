import { sanityFetch } from "@/sanity/lib/client";
import { companyInfoQuery } from "@/sanity/lib/queries";
import { CompanyInfo } from "@/types";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { companyInfo as mockCompanyInfo, navItems } from "@/data/mockData";

export async function Footer() {
  const companyInfo = await sanityFetch<CompanyInfo>({ query: companyInfoQuery, tags: ["companyInfo"] });

  // Safe Accessors
  const name = companyInfo?.name || "";
  const description = companyInfo?.description || "";
  const phone = companyInfo?.contact?.phone || "";
  const email = companyInfo?.contact?.email || "";
  const address = companyInfo?.contact?.address || "";
  const socials = companyInfo?.contact?.socials;

  return (
    <footer className="bg-primary text-primary-foreground py-12 border-t border-white/10">
      <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Brand Column */}
        <div className="space-y-4">
          <Link href="/" className="text-2xl font-bold font-serif">
            {name}
          </Link>
          <p className="text-gray-300 text-sm max-w-xs block">
            {description}
          </p>
          <div className="flex gap-4">
             {/* Socials - mapping a bit manually for icons if needed or just use links from data */}
             {socials?.instagram && (
                <Link href={socials.instagram} className="hover:text-secondary transition-colors"><Instagram size={20}/></Link>
             )}
              {socials?.facebook && (
                <Link href={socials.facebook} className="hover:text-secondary transition-colors"><Facebook size={20}/></Link>
             )}
             {socials?.linkedin && (
                <Link href={socials.linkedin} className="hover:text-secondary transition-colors"><Linkedin size={20}/></Link>
             )}
              {socials?.twitter && (
                <Link href={socials.twitter} className="hover:text-secondary transition-colors"><Twitter size={20}/></Link>
             )}
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Hızlı Erişim</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-secondary transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services (Hardcoded simplified list or dynamic if we want) */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Hizmetlerimiz</h3>
          <ul className="space-y-2 text-sm text-gray-300">
             <li><Link href="/hizmetler/dugun-organizasyonu" className="hover:text-secondary">Düğün Organizasyonu</Link></li>
             <li><Link href="/hizmetler/kurumsal-etkinlikler" className="hover:text-secondary">Kurumsal Etkinlikler</Link></li>
             <li><Link href="/hizmetler/nisan-organizasyonu" className="hover:text-secondary">Nişan Töreni</Link></li>
             <li><Link href="/hizmetler/acilis-organizasyonlari" className="hover:text-secondary">Açılışlar</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">İletişim</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex items-start gap-3">
              <MapPin className="shrink-0 text-secondary" size={18} />
              <span>{address}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="shrink-0 text-secondary" size={18} />
              <a href={`tel:${phone}`} className="hover:text-white">{phone}</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="shrink-0 text-secondary" size={18} />
              <a href={`mailto:${email}`} className="hover:text-white">{email}</a>
            </li>
          </ul>
        </div>

      </Container>
      
      <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-gray-400">
        <Container>
          <p>&copy; {new Date().getFullYear()} {name}. Tüm hakları saklıdır.</p>
        </Container>
      </div>
    </footer>
  );
}
