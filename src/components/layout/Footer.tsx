import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { companyInfo, navItems } from "@/data/mockData";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12 border-t border-white/10">
      <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Brand Column */}
        <div className="space-y-4">
          <Link href="/" className="text-2xl font-bold font-serif">
            {companyInfo.name}
          </Link>
          <p className="text-gray-300 text-sm max-w-xs block">
            {companyInfo.description}
          </p>
          <div className="flex gap-4">
             {/* Socials - mapping a bit manually for icons if needed or just use links from data */}
             {companyInfo.contact.socials.instagram && (
                <Link href={companyInfo.contact.socials.instagram} className="hover:text-secondary transition-colors"><Instagram size={20}/></Link>
             )}
              {companyInfo.contact.socials.facebook && (
                <Link href={companyInfo.contact.socials.facebook} className="hover:text-secondary transition-colors"><Facebook size={20}/></Link>
             )}
             {companyInfo.contact.socials.linkedin && (
                <Link href={companyInfo.contact.socials.linkedin} className="hover:text-secondary transition-colors"><Linkedin size={20}/></Link>
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
              <span>{companyInfo.contact.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="shrink-0 text-secondary" size={18} />
              <a href={`tel:${companyInfo.contact.phone}`} className="hover:text-white">{companyInfo.contact.phone}</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="shrink-0 text-secondary" size={18} />
              <a href={`mailto:${companyInfo.contact.email}`} className="hover:text-white">{companyInfo.contact.email}</a>
            </li>
          </ul>
        </div>

      </Container>
      
      <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-gray-400">
        <Container>
          <p>&copy; {new Date().getFullYear()} {companyInfo.name}. Tüm hakları saklıdır.</p>
        </Container>
      </div>
    </footer>
  );
}
