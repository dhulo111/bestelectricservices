'use client';

import { MessageCircle, Phone } from 'lucide-react';
import { siteConfig } from '@/config/site';

export function FloatingContact() {
  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col gap-3 md:gap-4">
      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, '')}?text=Service%20Inquiry`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 md:w-14 md:h-14 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform duration-300 hover:shadow-glow-md relative group"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
        {/* Tooltip */}
        <span className="absolute right-full mr-4 bg-charcoal text-white text-sm px-3 py-1.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10 shadow-lg">
          Chat on WhatsApp
        </span>
      </a>

      {/* Phone Button */}
      <a
        href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, '')}`}
        className="w-12 h-12 md:w-14 md:h-14 bg-electric-cyan rounded-full flex items-center justify-center text-deep-black shadow-lg hover:scale-110 transition-transform duration-300 hover:shadow-glow-md relative group"
        aria-label="Call Us"
      >
        <Phone className="w-6 h-6 md:w-7 md:h-7" />
        {/* Tooltip */}
        <span className="absolute right-full mr-4 bg-charcoal text-white text-sm px-3 py-1.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10 shadow-lg">
          Call Now
        </span>
      </a>
    </div>
  );
}
