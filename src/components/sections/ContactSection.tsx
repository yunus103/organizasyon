import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Mail, MapPin, Phone } from "lucide-react";
import { sanityFetch } from "@/sanity/lib/client";
import { companyInfoQuery } from "@/sanity/lib/queries";
import { CompanyInfo } from "@/types";

export async function ContactSection() {
  const companyInfo = await sanityFetch<CompanyInfo>({ 
    query: companyInfoQuery, 
    tags: ["companyInfo"] 
  });

  const phone = companyInfo?.contact?.phone || "";
  const email = companyInfo?.contact?.email || "";
  const address = companyInfo?.contact?.address || "";

  return (
    <section className="py-20 md:py-32 bg-primary text-white relative overflow-hidden" id="iletisim">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      
      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Contact Info */}
            <div className="space-y-10">
                <div>
                    <h2 className="text-secondary font-bold tracking-widest uppercase text-sm mb-3">İletişim</h2>
                    <h3 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight mb-6">
                        Projenizi Birlikte <br/> Planlayalım
                    </h3>
                    <p className="text-lg text-gray-400 leading-relaxed max-w-md">
                        Hayallerinizdeki organizasyonu gerçekleştirmek için bir kahve içmeye bekleriz. 
                        Profesyonel ekibimiz size en uygun çözümleri sunmak için hazır.
                    </p>
                </div>

                <div className="space-y-8">
                    <div className="flex items-start gap-6 group">
                        <div className="p-4 bg-white/5 rounded-2xl text-secondary group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                             <Phone size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-xl mb-1">Telefon</h4>
                            <p className="text-gray-400 font-light">{phone}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-start gap-6 group">
                        <div className="p-4 bg-white/5 rounded-2xl text-secondary group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                             <Mail size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-xl mb-1">E-posta</h4>
                            <p className="text-gray-400 font-light">{email}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-6 group">
                        <div className="p-4 bg-white/5 rounded-2xl text-secondary group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                             <MapPin size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-xl mb-1">Adres</h4>
                            <p className="text-gray-400 font-light">{address}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className="bg-white/5 backdrop-blur-sm p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl">
                <form className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium text-gray-300 ml-1">Adınız Soyadınız</label>
                            <input 
                                type="text" 
                                id="name" 
                                className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:bg-white/10 transition-all" 
                                placeholder="İsim Soyisim" 
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="phone" className="text-sm font-medium text-gray-300 ml-1">Telefon</label>
                            <input 
                                type="tel" 
                                id="phone" 
                                className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:bg-white/10 transition-all" 
                                placeholder="0555 555 55 55" 
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-gray-300 ml-1">E-posta</label>
                        <input 
                            type="email" 
                            id="email" 
                            className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:bg-white/10 transition-all" 
                            placeholder="ornek@email.com" 
                        />
                    </div>
                    <div className="space-y-2">
                         <label htmlFor="message" className="text-sm font-medium text-gray-300 ml-1">Mesajınız</label>
                         <textarea 
                            id="message" 
                            rows={4} 
                            className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:bg-white/10 transition-all resize-none" 
                            placeholder="Etkinlik detaylarından bahsedin..."
                        ></textarea>
                    </div>
                    <Button size="lg" className="w-full py-6 text-lg rounded-xl bg-secondary hover:bg-secondary/90 text-white font-semibold shadow-lg shadow-secondary/20 hover:shadow-secondary/40 transition-all hover:-translate-y-1">
                        Gönder
                    </Button>
                </form>
            </div>
        </div>
      </Container>
    </section>
  );
}
