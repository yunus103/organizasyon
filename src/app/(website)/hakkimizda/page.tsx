import { AboutSection } from "@/components/sections/AboutSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description: "Şirketimiz hakkında detaylı bilgi.",
};

export default function AboutPage() {
  return (
    <div className="pt-20 lg:pt-32">
      <AboutSection showLink={false} />
    </div>
  );
}
