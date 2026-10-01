'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, ChevronRight, Phone, MessageSquare, Home, Wrench, Info, Mail, HelpCircle, MapPin } from 'lucide-react';
import { siteConfig } from '@/config/site';
import Image from 'next/image';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const getIconForNav = (name: string) => {
  switch(name.toLowerCase()) {
    case 'home': return <Home size={18} />;
    case 'services': return <Wrench size={18} />;
    case 'about': return <Info size={18} />;
    case 'contact': return <Mail size={18} />;
    case 'faq': return <HelpCircle size={18} />;
    case 'service areas': return <MapPin size={18} />;
    default: return <ChevronRight size={18} />;
  }
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Glassmorphic Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-deep-black/60 backdrop-blur-md z-[100] md:hidden"
          />

          {/* Premium Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-[340px] bg-[#16181D] border-l border-white/10 z-[110] p-6 flex flex-col md:hidden shadow-2xl"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-8 pb-5 border-b border-white/10">
              <div className="relative w-36 h-12">
                <Image 
                  src={siteConfig.logo}
                  alt={siteConfig.name}
                  fill
                  className="object-contain object-left drop-shadow-md"
                />
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close menu"
              >
                <X size={18} strokeWidth={2.5} />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col space-y-2.5 flex-1 overflow-y-auto pr-2 custom-scrollbar">
              {siteConfig.navigation.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(`${item.href}`));
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center justify-between p-3.5 rounded-xl transition-all ${
                      isActive 
                        ? 'bg-electric-cyan/10 text-electric-cyan border border-electric-cyan/20' 
                        : 'text-gray-300 bg-white/[0.02] hover:bg-white/10 hover:text-white border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`p-2 rounded-lg transition-colors ${isActive ? 'bg-electric-cyan/20 text-electric-cyan' : 'bg-white/5 text-gray-400'}`}>
                        {getIconForNav(item.name)}
                      </div>
                      <span className="font-semibold tracking-wide text-[15px]">{item.name}</span>
                    </div>
                    <ChevronRight size={18} className={isActive ? 'text-electric-cyan' : 'text-gray-600'} />
                  </Link>
                );
              })}
            </nav>

            {/* Bottom Actions */}
            <div className="mt-6 pt-6 border-t border-white/10 space-y-4">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Emergency Service 24/7</span>
                </div>
                
                <div className="flex gap-2.5">
                  <a 
                    href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, '')}`} 
                    className="flex-1 flex items-center justify-center gap-2.5 py-3.5 bg-electric-cyan text-deep-black font-bold rounded-xl shadow-[0_0_15px_rgba(0,255,255,0.2)] hover:bg-white transition-colors"
                  >
                    <Phone size={18} strokeWidth={2.5} /> Call Now
                  </a>
                  <a 
                    href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9+]/g, '')}?text=Service%20Inquiry`} 
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center w-[52px] bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white border border-[#25D366]/20 rounded-xl transition-colors"
                    title="WhatsApp Us"
                  >
                    <MessageSquare size={22} strokeWidth={2.5} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
