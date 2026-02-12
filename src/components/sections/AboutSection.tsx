import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { companyInfo } from "@/data/mockData";

export function AboutSection() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Grid */}
            <div className="relative">
                <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-xl">
                     <Image 
                        src="https://picsum.photos/800/1000?random=17" 
                        alt="About Us"
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
                            <p className="font-bold text-2xl text-primary">10+ Yıl</p>
                            <p className="text-sm text-gray-500">Sektör Tecrübesi</p>
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
                <h3 className="text-2xl font-semibold text-primary">
                    {companyInfo.tagline}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                    {companyInfo.description}
                </p>
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
                     <Button asChild>
                        <Link href="/hakkimizda">Daha Fazla Bilgi</Link>
                     </Button>
                </div>
            </div>
        </div>
      </Container>
    </section>
  );
}
