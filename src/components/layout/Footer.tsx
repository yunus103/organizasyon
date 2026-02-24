import { sanityFetch } from "@/sanity/lib/client";
import { companyInfoQuery, servicesQuery } from "@/sanity/lib/queries";
import { CompanyInfo, Service } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";


import { Container } from "@/components/ui/Container";
import { navItems } from "@/data/mockData";

export async function Footer() {
  const companyInfo = await sanityFetch<CompanyInfo>({ query: companyInfoQuery, tags: ["companyInfo"] });
  const services = await sanityFetch<Service[]>({ query: servicesQuery, tags: ["service"] });

  // Safe Accessors
  const name = companyInfo?.name || "";
  const description = companyInfo?.description || "";
  const phone = companyInfo?.contact?.phone || "";
  const email = companyInfo?.contact?.email || "";
  const address = companyInfo?.contact?.address || "";
  const socials = companyInfo?.contact?.socials;

  return (
    <footer className="bg-primary text-primary-foreground py-12 border-t border-white/10">
      <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Brand Column */}
        <div className="space-y-6 lg:col-span-4">
          <Link href="/" className="inline-block relative z-10 w-full">
            {companyInfo?.logo ? (
                 <div className="relative h-28 md:h-36 lg:h-44 w-full max-w-[400px] transition-all duration-300">
                    <Image 
                       src={companyInfo.logo} 
                       alt={companyInfo.logoAlt || name} 
                       fill 
                       className="object-contain object-left brightness-0 invert opacity-90"
                       sizes="(max-width: 768px) 288px, (max-width: 1024px) 320px, 400px"
                    />
                 </div>
              ) : (
                <span className="text-2xl font-bold font-serif text-white">
                  {name}
                </span>
              )}
          </Link>
          <p className="text-gray-300 text-sm max-w-xs block">
            {description}
          </p>
          <div className="flex gap-4">
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
        <div className="space-y-4 lg:col-span-2">
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

        {/* Services */}
        <div className="space-y-4 lg:col-span-3">
          <h3 className="text-lg font-semibold">Hizmetlerimiz</h3>
          <ul className="space-y-2 text-sm text-gray-300">
             {services.slice(0, 5).map(service => (
               <li key={service.id}>
                 <Link href={`/hizmetler/${service.slug}`} className="hover:text-secondary">
                   {service.title}
                 </Link>
               </li>
             ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-4 lg:col-span-3">
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
          <p>&copy; 2026 {name}. Tüm hakları saklıdır. <Link href="https://sedminadijital.com" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">Sedmina Dijital</Link></p>
        </Container>
      </div>
    </footer>
  );
}
