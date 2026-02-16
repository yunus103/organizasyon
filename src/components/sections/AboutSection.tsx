import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { PortableText } from "next-sanity";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sanityFetch } from "@/sanity/lib/client";
import { companyInfoQuery } from "@/sanity/lib/queries";
import { CompanyInfo } from "@/types";

export async function AboutSection({ showLink = true }: { showLink?: boolean }) {
  const companyInfo = await sanityFetch<CompanyInfo>({ 
    query: companyInfoQuery, 
    tags: ["companyInfo"] 
  });

  const tagline = companyInfo?.tagline || "";
  const description = companyInfo?.description || "";
  const aboutImage = companyInfo?.aboutImage || "https://picsum.photos/800/1000?random=17";
  const aboutImageAlt = companyInfo?.aboutImageAlt || "Hakkımızda";
  const aboutContent = companyInfo?.aboutContent;

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <Container>
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Image Composition */}
            <div className="relative group">
                <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02] bg-muted">
                     {aboutImage ? (
                       <Image 
                          src={aboutImage} 
                          alt={aboutImageAlt}
                          fill
                          className="object-cover"
                       />
                     ) : (
                       <div className="absolute inset-0 flex items-center justify-center bg-primary/5">
                          <span className="text-secondary/10 font-serif font-bold text-7xl transform -rotate-12 italic select-none">
                              Hakkımızda
                          </span>
                       </div>
                     )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" />
                </div>
                
                 {/* Decorative Frame */}
                <div className="absolute inset-0 border-2 border-primary/10 rounded-2xl translate-x-4 translate-y-4 -z-10" />

                 {/* Floating Stats/Badge */}
                <div className="absolute -bottom-8 -right-8 md:bottom-8 md:-right-12 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20 max-w-xs animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
                    <div className="flex items-center gap-5">
                        <div className="bg-secondary p-3 rounded-full text-white shadow-lg shadow-secondary/30">
                             <CheckCircle2 size={28} />
                        </div>
                        <div>
                            <p className="font-bold text-3xl text-primary font-serif">10+</p>
                            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Yıllık Tecrübe</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="space-y-8">
                <div>
                    <h2 className="text-secondary font-bold tracking-widest uppercase text-sm mb-3">Hakkımızda</h2>
                    <h3 className="text-4xl md:text-5xl font-serif font-bold text-primary leading-tight mb-6">
                        {tagline || "Hayallerinizi Gerçeğe Dönüştürüyoruz"}
                    </h3>
                    <div className="h-1 w-20 bg-secondary rounded-full" />
                </div>
                
                <div className="text-muted-foreground leading-relaxed text-lg space-y-4">
                    {aboutContent ? (
                      <div className="prose prose-lg prose-p:text-muted-foreground prose-headings:text-primary">
                        <PortableText value={aboutContent} />
                      </div>
                    ) : (
                      <p>{description}</p>
                    )}
                </div>

                <div className="grid sm:grid-cols-2 gap-6 pt-4">
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                        <CheckCircle2 className="text-secondary shrink-0 mt-1" />
                        <div>
                            <h4 className="font-semibold text-primary mb-1">Profesyonel Ekip</h4>
                            <p className="text-sm text-muted-foreground">Alanında uzman kadro ile kusursuz hizmet.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                        <CheckCircle2 className="text-secondary shrink-0 mt-1" />
                        <div>
                            <h4 className="font-semibold text-primary mb-1">Kişiye Özel</h4>
                            <p className="text-sm text-muted-foreground">Sizin zevkinize uygun özgün konseptler.</p>
                        </div>
                    </div>
                </div>
                
                <div className="pt-6">
                     {showLink ? (
                       <Button asChild size="lg" className="rounded-full px-8 bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                          <Link href="/hakkimizda">Hikayemizi Oku</Link>
                       </Button>
                     ) : (
                       <Button asChild size="lg" className="rounded-full px-8 bg-secondary text-white hover:bg-secondary/90 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                          <Link href="/iletisim">İletişime Geç</Link>
                       </Button>
                     )}
                </div>
            </div>
        </div>
      </Container>
    </section>
  );
}
