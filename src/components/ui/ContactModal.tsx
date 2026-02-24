"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./Button";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate a network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Close modal after showing success message briefly
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-primary/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden z-10 p-6 md:p-8"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-primary hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Kapat"
            >
              <X size={24} />
            </button>

            <div className="mb-8 pr-8">
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-primary mb-2">
                Teklif Alın
              </h3>
              <p className="text-gray-500 text-sm md:text-base">
                Hayallerinizdeki organizasyonu gerçekleştirmek için detayları bizimle paylaşın. Size en kısa sürede dönüş yapacağız.
              </p>
            </div>

            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-12 text-center"
              >
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-primary mb-2">Talebiniz Alındı!</h4>
                <p className="text-gray-500">En kısa sürede sizinle iletişime geçeceğiz.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                <div className="space-y-1.5 border border-gray-200 focus-within:border-secondary focus-within:ring-1 focus-within:ring-secondary rounded-xl px-4 py-2 transition-all bg-gray-50/50">
                  <label htmlFor="modal-name" className="text-xs font-semibold text-gray-500 hidden md:block">Adınız Soyadınız</label>
                  <input
                    type="text"
                    id="modal-name"
                    required
                    className="w-full bg-transparent text-primary placeholder:text-gray-400 focus:outline-none text-sm md:text-base outline-none border-none py-1 md:py-0"
                    placeholder="Adınız Soyadınız"
                  />
                </div>
                
                <div className="space-y-1.5 border border-gray-200 focus-within:border-secondary focus-within:ring-1 focus-within:ring-secondary rounded-xl px-4 py-2 transition-all bg-gray-50/50">
                  <label htmlFor="modal-phone" className="text-xs font-semibold text-gray-500 hidden md:block">Telefon Numaranız</label>
                  <input
                    type="tel"
                    id="modal-phone"
                    required
                    className="w-full bg-transparent text-primary placeholder:text-gray-400 focus:outline-none text-sm md:text-base outline-none border-none py-1 md:py-0"
                    placeholder="0555 555 55 55"
                  />
                </div>

                <div className="space-y-1.5 border border-gray-200 focus-within:border-secondary focus-within:ring-1 focus-within:ring-secondary rounded-xl px-4 py-2 transition-all bg-gray-50/50">
                  <label htmlFor="modal-details" className="text-xs font-semibold text-gray-500 hidden md:block">Etkinlik Detayları</label>
                  <textarea
                    id="modal-details"
                    required
                    rows={3}
                    className="w-full bg-transparent text-primary placeholder:text-gray-400 focus:outline-none text-sm md:text-base resize-none outline-none border-none py-1 md:py-0"
                    placeholder="Tarih, mekan, kişi sayısı gibi detaylardan bahsedebilirsiniz..."
                  ></textarea>
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-6 text-lg rounded-xl bg-secondary hover:bg-secondary/90 text-white font-semibold shadow-lg shadow-secondary/20 hover:shadow-secondary/40 transition-all hover:-translate-y-0.5 mt-2 disabled:opacity-70 disabled:hover:translate-y-0"
                >
                  {isSubmitting ? "Gönderiliyor..." : "Teklif İste"}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
