"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X, Phone, Mail, Instagram, Facebook, Twitter, Linkedin, ChevronDown } from "lucide-react";

import { CompanyInfo, Category } from "@/types";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { navItems } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { MegaMenu } from "@/components/layout/MegaMenu";

export function HeaderClient({ companyInfo, categories = [] }: { companyInfo: CompanyInfo, categories?: Category[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false); // For Desktop Mega Menu
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false); // For Mobile Accordion
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setIsServicesOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  const isHomePage = pathname === "/";
  const shouldShowSolid = isScrolled || !isHomePage;

  const phone = companyInfo?.contact?.phone || "";
  const email = companyInfo?.contact?.email || "";
  const name = companyInfo?.name || "";
  const socials = companyInfo?.contact?.socials;

  return (
    <>
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500",
        shouldShowSolid 
          ? "bg-white/95 backdrop-blur-md shadow-lg py-2 lg:py-4" 
          : "bg-transparent py-4 lg:py-6"
      )}
      onMouseLeave={() => setIsServicesOpen(false)}
    >
      <div 
        className={cn(
          "hidden lg:block border-b transition-all duration-500",
          isScrolled 
            ? "h-0 opacity-0 overflow-hidden mb-0 border-transparent" 
            : "h-auto opacity-100 pb-2 mb-2",
          shouldShowSolid ? "border-primary/10" : "border-white/20"
        )}
      >
        <Container className={cn(
          "flex justify-between items-center text-xs font-medium transition-colors",
          shouldShowSolid ? "text-primary/80" : "text-white/90"
        )}>
           <div className="flex gap-6">
             <a href={`mailto:${email}`} className="flex items-center gap-2 hover:text-secondary transition-colors">
               <Mail size={14} className="text-secondary" /> {email}
             </a>
             <a href={`tel:${phone}`} className="flex items-center gap-2 hover:text-secondary transition-colors">
               <Phone size={14} className="text-secondary" /> {phone}
             </a>
           </div>
           
           <div className={cn(
             "flex items-center gap-4 pl-4 border-l",
             shouldShowSolid ? "border-primary/10" : "border-white/20"
           )}>
              <span className={shouldShowSolid ? "text-primary/60" : "text-white/60"}>Bizi Takip Edin:</span>
               <div className="flex gap-3">
                  {socials?.instagram && (
                    <Link href={socials.instagram} target="_blank" className="hover:text-secondary transition-colors"><Instagram size={14}/></Link>
                  )}
                  {socials?.facebook && (
                    <Link href={socials.facebook} target="_blank" className="hover:text-secondary transition-colors"><Facebook size={14}/></Link>
                  )}
                  {socials?.twitter && (
                    <Link href={socials.twitter} target="_blank" className="hover:text-secondary transition-colors"><Twitter size={14}/></Link>
                  )}
                  {socials?.linkedin && (
                    <Link href={socials.linkedin} target="_blank" className="hover:text-secondary transition-colors"><Linkedin size={14}/></Link>
                  )}
               </div>
           </div>
        </Container>
      </div>

      <Container className="flex items-center justify-between">
        <Link 
          href="/" 
          className="flex items-center gap-2 group z-50 relative"
        >
          {companyInfo?.logo ? (
             <div className="relative h-10 w-40 md:h-12 md:w-48 lg:h-16 lg:w-56 transition-all duration-300">
                <Image 
                   src={companyInfo.logo} 
                   alt={companyInfo.logoAlt || name} 
                   fill 
                   className="object-contain object-left"
                   sizes="(max-width: 768px) 160px, 224px"
                   priority
                />
             </div>
          ) : (
            <span className={cn(
              "text-xl md:text-2xl font-bold font-serif tracking-tighter transition-colors duration-500",
              shouldShowSolid ? "text-primary" : "text-white"
            )}>
              {name.toUpperCase()}
            </span>
          )}
        </Link>
        
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => {
            const isServices = item.label === "Hizmetler";
            return (
              <div 
                key={item.href} 
                className="relative group h-full flex items-center"
                onMouseEnter={() => isServices && setIsServicesOpen(true)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "text-[13px] uppercase tracking-widest font-bold transition-all duration-300 hover:text-secondary relative flex items-center gap-1 py-4",
                    shouldShowSolid ? "text-primary/80" : "text-white/90",
                    pathname === item.href && "text-secondary"
                  )}
                >
                  {item.label}
                  {isServices && <ChevronDown size={14} className={cn("transition-transform duration-300", isServicesOpen ? "rotate-180" : "")} />}
                  <span className={cn(
                    "absolute bottom-2 left-0 h-0.5 bg-secondary transition-all duration-300",
                    pathname === item.href ? "w-full" : "w-0 group-hover:w-full"
                  )} />
                </Link>
                
                 {/* Mega Menu Overlay Trigger */}
                {isServices && <div className="absolute top-full left-0 w-full h-4 bg-transparent" />}
              </div>
            );
          })}
          <Button 
            asChild 
            className={cn(
               "transition-all duration-500 rounded-full px-6",
               shouldShowSolid 
                ? "bg-primary hover:bg-primary/90 text-white shadow-md" 
                : "bg-secondary hover:bg-secondary/90 text-white shadow-lg border-none"
            )}
          >
             <Link href="/iletisim">TEKLİF ALIN</Link>
          </Button>
        </nav>

        <button
          className={cn(
            "lg:hidden p-2 rounded-full transition-colors z-50",
            shouldShowSolid || isOpen ? "text-primary hover:bg-muted" : "text-white hover:bg-white/10"
          )}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Menüyü kapat" : "Menüyü aç"}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </Container>
      
      {/* Desktop Mega Menu */}
      <div 
        className="hidden lg:block absolute top-full left-0 w-full"
        onMouseEnter={() => setIsServicesOpen(true)}
        onMouseLeave={() => setIsServicesOpen(false)}
      >
        <MegaMenu categories={categories} isOpen={isServicesOpen} onClose={() => setIsServicesOpen(false)} />
      </div>

      <div 
        className={cn(
          "fixed inset-0 z-40 bg-white lg:hidden transition-transform duration-500 ease-in-out flex flex-col pt-24 px-8 overflow-y-auto h-[100dvh]",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col gap-6">
          <Link
            href="/"
            className={cn(
              "text-2xl font-bold font-serif transition-colors border-b border-muted pb-4",
              pathname === "/" ? "text-secondary" : "text-primary"
            )}
            onClick={() => setIsOpen(false)}
          >
            Ana Sayfa
          </Link>
          {navItems.map((item) => {
             if (item.label === "Hizmetler") {
                 return (
                    <div key={item.href} className="border-b border-muted pb-4">
                        <button 
                            onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                            className={cn(
                                "flex items-center justify-between w-full text-2xl font-bold font-serif transition-colors",
                                pathname.startsWith("/hizmetler") ? "text-secondary" : "text-primary"
                            )}
                        >
                            {item.label}
                            <ChevronDown size={20} className={cn("transition-transform duration-300", mobileServicesOpen ? "rotate-180" : "")} />
                        </button>
                        
                        {/* Mobile Accordion */}
                        <div className={cn(
                            "grid transition-all duration-300 overflow-hidden",
                            mobileServicesOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
                        )}>
                            <div className="min-h-0 space-y-4 pl-4 border-l-2 border-secondary/20">
                                <Link 
                                    href="/hizmetler"
                                    onClick={() => setIsOpen(false)}
                                    className="block text-lg font-medium text-secondary"
                                >
                                    Tüm Hizmetler
                                </Link>
                                {categories.map((cat) => (
                                    <div key={cat.id} className="space-y-2">
                                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest">{cat.title}</h4>
                                        <div className="flex flex-col gap-2 pl-2">
                                            {cat.services?.map(service => (
                                                <Link
                                                    key={service.id}
                                                    href={`/hizmetler/${service.slug}`}
                                                    onClick={() => setIsOpen(false)}
                                                    className="text-primary/80 hover:text-secondary py-1"
                                                >
                                                    {service.title}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                 )
             }
             return (
                <Link
                key={item.href}
                href={item.href}
                className={cn(
                    "text-2xl font-bold font-serif transition-colors border-b border-muted pb-4",
                    pathname === item.href ? "text-secondary" : "text-primary"
                )}
                onClick={() => setIsOpen(false)}
                >
                {item.label}
                </Link>
             )
          })}
        </nav>
        
        <div className="mt-12 space-y-8 pb-10">
          <Button asChild className="w-full py-7 text-lg rounded-xl bg-secondary">
            <Link href="/iletisim">Teklif Alın</Link>
          </Button>
          
          <div className="space-y-4 pt-4 border-t border-muted">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Bize Ulaşın</p>
            <div className="space-y-3">
              <a href={`tel:${phone}`} className="flex items-center gap-3 text-primary font-medium">
                <div className="p-2 bg-muted rounded-full text-secondary"><Phone size={18}/></div>
                {phone}
              </a>
              <a href={`mailto:${email}`} className="flex items-center gap-3 text-primary font-medium">
                <div className="p-2 bg-muted rounded-full text-secondary"><Mail size={18}/></div>
                {email}
              </a>
            </div>
             <div className="flex gap-4 mt-6">
                {socials?.instagram && (
                  <Link href={socials.instagram} target="_blank" className="p-3 bg-muted rounded-full text-primary hover:bg-secondary hover:text-white transition-all"><Instagram size={20}/></Link>
                )}
                {socials?.facebook && (
                  <Link href={socials.facebook} target="_blank" className="p-3 bg-muted rounded-full text-primary hover:bg-secondary hover:text-white transition-all"><Facebook size={20}/></Link>
                )}
                {socials?.twitter && (
                  <Link href={socials.twitter} target="_blank" className="p-3 bg-muted rounded-full text-primary hover:bg-secondary hover:text-white transition-all"><Twitter size={20}/></Link>
                )}
                {socials?.linkedin && (
                  <Link href={socials.linkedin} target="_blank" className="p-3 bg-muted rounded-full text-primary hover:bg-secondary hover:text-white transition-all"><Linkedin size={20}/></Link>
                )}
            </div>
          </div>
        </div>
      </div>
    </header>
    </>
  );
}
