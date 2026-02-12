import { AboutSection } from "@/components/sections/AboutSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkımızda | Reel Organizasyon",
  description: "Reel Organizasyon hakkında detaylı bilgi.",
};

export default function AboutPage() {
  return (
    <div className="pt-20 lg:pt-32">
      <AboutSection />
    </div>
  );
}
