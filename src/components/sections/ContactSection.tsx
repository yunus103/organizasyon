"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { companyInfo } from "@/data/mockData";
import { Mail, MapPin, Phone } from "lucide-react";

export function ContactSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/30" id="iletisim">
      <Container>
        <SectionHeading
          title="İletişime Geçin"
          subtitle="Projenizi Planlayalım"
        />

        <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
                <p className="text-lg text-gray-600 leading-relaxed">
                    Hayallerinizdeki organizasyonu gerçekleştirmek için bizimle iletişime geçin. 
                    Profesyonel ekibimiz size en kısa sürede dönüş yapacaktır.
                </p>

                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-secondary/10 rounded-full text-secondary">
                            <Phone size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg">Telefon</h4>
                            <p className="text-gray-600">{companyInfo.contact.phone}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-secondary/10 rounded-full text-secondary">
                             <Mail size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg">E-posta</h4>
                            <p className="text-gray-600">{companyInfo.contact.email}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-secondary/10 rounded-full text-secondary">
                            <MapPin size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg">Adres</h4>
                            <p className="text-gray-600">{companyInfo.contact.address}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border">
                <form className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium">Adınız Soyadınız</label>
                            <input type="text" id="name" className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary/50" placeholder="İsim Soyisim" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="phone" className="text-sm font-medium">Telefon</label>
                            <input type="tel" id="phone" className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary/50" placeholder="0555 555 55 55" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">E-posta</label>
                        <input type="email" id="email" className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary/50" placeholder="ornek@email.com" />
                    </div>
                    <div className="space-y-2">
                         <label htmlFor="message" className="text-sm font-medium">Mesajınız</label>
                         <textarea id="message" rows={4} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary/50" placeholder="Etkinlik detaylarından bahsedin..."></textarea>
                    </div>
                    <Button size="lg" className="w-full md:w-auto">Gönder</Button>
                </form>
            </div>
        </div>
      </Container>
    </section>
  );
}
