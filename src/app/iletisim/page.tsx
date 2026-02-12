import { ContactSection } from "@/components/sections/ContactSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişim | Reel Organizasyon",
  description: "Bizimle iletişime geçin.",
};

export default function ContactPage() {
  return (
    <div className="pt-20 lg:pt-32">
      <ContactSection />
    </div>
  );
}
