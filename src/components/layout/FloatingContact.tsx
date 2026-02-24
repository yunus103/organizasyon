"use client";

import { Phone, Instagram } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface FloatingContactProps {
  phone?: string;
  whatsapp?: string;
  instagram?: string;
}

export function FloatingContact({ phone, whatsapp, instagram }: FloatingContactProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show on scroll or always show on mobile if preferred. We'll leave the scroll logic as is.
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    // Initial check
    toggleVisibility();
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  if (!phone && !whatsapp && !instagram) return null;

  const whatsappNumber = whatsapp?.replace(/\s/g, "") || phone?.replace(/\s/g, "");

  return (
    <div 
      className={cn(
        "fixed z-[60] flex transition-all duration-500 transform",
        "bottom-0 left-0 w-full flex-row", // Mobile styles: full width bar
        "md:bottom-6 md:right-6 md:left-auto md:w-auto md:flex-col-reverse md:gap-4 md:bg-transparent", // Desktop styles: floating right column
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      )}
    >
      {/* Phone Button */}
      {phone && (
        <a
          href={`tel:${phone.replace(/\s/g, "")}`}
          className={cn(
            "group relative flex items-center justify-center text-white transition-all duration-300",
            "flex-1 h-11 bg-[#4e7ab5] border-r border-[#ffffff20]", // Mobile
            "md:flex-none md:w-14 md:h-14 md:bg-secondary md:rounded-full md:shadow-lg md:hover:shadow-2xl md:hover:scale-110 md:border-none" // Desktop
          )}
          aria-label="Telefon ile iletişime geçin"
        >
          <span className="hidden md:block absolute right-full mr-4 px-3 py-1.5 bg-white text-gray-800 text-sm font-bold rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none border border-gray-100">
            Hemen Arayın
          </span>
          <Phone className="w-5 h-5 md:w-6 md:h-6 fill-current" />
          <span className="hidden md:block absolute inset-0 rounded-full bg-secondary animate-pulse opacity-30 -z-10"></span>
        </a>
      )}

      {/* WhatsApp Button */}
      {whatsappNumber && (
        <a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "group relative flex items-center justify-center text-white transition-all duration-300",
            "flex-1 h-11 bg-[#60b355] border-r border-[#ffffff20]", // Mobile
            "md:flex-none md:w-14 md:h-14 md:bg-[#25D366] md:rounded-full md:shadow-lg md:hover:shadow-2xl md:hover:scale-110 md:border-none" // Desktop
          )}
          aria-label="WhatsApp ile iletişime geçin"
        >
          <span className="hidden md:block absolute right-full mr-4 px-3 py-1.5 bg-white text-gray-800 text-sm font-bold rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none border border-gray-100">
            WhatsApp Hattı
          </span>
          <svg 
            viewBox="0 0 24 24" 
            className="w-6 h-6 md:w-7 md:h-7"
            fill="currentColor" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.3.149-1.777.877-2.04.976-.26.1-.45.149-.64.449-.19.3-.73.929-.896 1.119-.164.19-.33.21-.63.06-.3-.15-1.257-.463-2.394-1.474-.881-.786-1.474-1.758-1.648-2.057-.174-.3-.018-.462.13-.61.137-.133.3-.349.45-.523.15-.174.201-.3.301-.499.1-.2.05-.375-.025-.524-.075-.15-.64-1.541-.876-2.112-.23-.556-.463-.481-.64-.49-.163-.008-.349-.01-.536-.01-.186 0-.49.07-.746.349-.257.279-1.026 1.003-1.026 2.446 0 1.443 1.05 2.84 1.196 3.039.145.199 2.067 3.156 5.007 4.428.699.303 1.244.484 1.67.62.703.223 1.343.191 1.85.115.565-.084 1.777-.726 2.027-1.426.25-.7.25-1.298.174-1.427-.076-.128-.278-.206-.577-.355zM12 21.855c-1.808 0-3.578-.475-5.13-1.378l-.368-.216-3.818 1.001 1.02-3.722-.237-.377a8.312 8.312 0 01-1.275-4.414c0-4.6 3.743-8.344 8.347-8.344 2.23 0 4.327.868 5.903 2.443a8.275 8.275 0 012.44 5.901c0 4.604-3.743 8.344-8.345 8.344zM12 2C6.477 2 2 6.477 2 12c0 1.95.56 3.77 1.53 5.31L2 22l4.83-1.27c1.47.8 3.14 1.27 4.92 1.27 5.523 0 10-4.477 10-10s-4.477-10-10-10z"/>
          </svg>
          <span className="hidden md:block absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 -z-10"></span>
        </a>
      )}

      {/* Instagram Button */}
      {instagram && (
        <a
          href={instagram}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "group relative flex items-center justify-center text-white transition-all duration-300",
            "flex-1 h-11 bg-[#d63d64]", // Mobile: solid color from image or generic instagram color
            "md:flex-none md:w-14 md:h-14 md:bg-[#E1306C] md:rounded-full md:shadow-lg md:hover:shadow-2xl md:hover:scale-110 md:border-none md:bg-gradient-to-tr md:from-[#f09433] md:via-[#dc2743] md:to-[#bc1888]" // Desktop
          )}
          aria-label="Instagram sayfamizi ziyaret edin"
        >
          <span className="hidden md:block absolute right-full mr-4 px-3 py-1.5 bg-white text-gray-800 text-sm font-bold rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none border border-gray-100">
            Instagram
          </span>
          <Instagram className="w-6 h-6 md:w-7 md:h-7" />
          <span className="hidden md:block absolute inset-0 rounded-full bg-[#E1306C] animate-ping opacity-20 -z-10" style={{ animationDuration: '3s' }}></span>
        </a>
      )}
    </div>
  );
}
