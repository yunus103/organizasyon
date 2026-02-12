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
    <section className="py-16 md:py-24">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Grid */}
            <div className="relative">
                <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-xl bg-muted">
                     <Image 
                        src={aboutImage} 
                        alt={aboutImageAlt}
                        fill
                        className="object-cover"
                     />
                </div>
                 {/* Floating badge/card */}
                <div className="absolute -bottom-6 -right-6 md:bottom-10 md:-right-10 bg-white p-6 rounded-xl shadow-lg max-w-xs border hidden md:block">
                    <div className="flex items-center gap-4">
                        <div className="bg-secondary/10 p-3 rounded-full text-secondary">
                             <CheckCircle2 size={32} />
                        </div>
                        <div>
                            <p className="font-bold text-2xl text-primary">Profesyonel</p>
                            <p className="text-sm text-gray-500">Organizasyon Hizmetleri</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
                <SectionHeading 
                    title="Hakkımızda" 
                    subtitle="Biz Kimiz?" 
                    center={false} 
                    className="mb-6"
                />
                {tagline && (
                  <h3 className="text-2xl font-semibold text-primary">
                      {tagline}
                  </h3>
                )}
                
                <div className="text-gray-600 leading-relaxed text-lg prose prose-p:leading-relaxed max-w-none">
                    {aboutContent ? (
                      <PortableText value={aboutContent} />
                    ) : (
                      <p>{description}</p>
                    )}
                </div>

                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <CheckCircle2 className="text-secondary shrink-0" />
                        <span>Profesyonel ve deneyimli ekip</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <CheckCircle2 className="text-secondary shrink-0" />
                        <span>Yaratıcı ve kişiye özel konseptler</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <CheckCircle2 className="text-secondary shrink-0" />
                        <span>Müşteri memnuniyeti odaklı hizmet</span>
                    </div>
                </div>
                
                <div className="pt-4">
                     {showLink ? (
                       <Button asChild>
                          <Link href="/hakkimizda">Daha Fazla Bilgi</Link>
                       </Button>
                     ) : (
                       <Button asChild>
                          <Link href="/iletisim">Bize Ulaşın</Link>
                       </Button>
                     )}
                </div>
            </div>
        </div>
      </Container>
    </section>
  );
}
