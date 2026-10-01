'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/button';
import { MobileMenu } from './MobileMenu';
import Image from 'next/image';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-deep-black/90 backdrop-blur-md shadow-glow-sm py-4 border-b border-white/5'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-50 flex items-center">
            <div className="relative w-32 h-10 md:w-48 md:h-20 flex items-center justify-start">
              <Image 
                src="/assets/Best Electric Services Logo.png" 
                alt={siteConfig.name}
                fill
                className="object-contain object-left md:object-center drop-shadow-md group-hover:drop-shadow-xl transition-all"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {siteConfig.navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative group py-2"
                >
                  <span
                    className={`text-sm font-medium uppercase tracking-wider transition-colors ${
                      isActive ? 'text-electric-cyan' : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {item.name}
                  </span>
                  {/* Hover / Active underline glow */}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-electric-cyan transition-all duration-300 ${
                      isActive ? 'w-full shadow-glow-sm' : 'w-0 group-hover:w-full group-hover:shadow-glow-sm'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <Button variant="primary">Get Service</Button>
            </div>
            <button
              className="md:hidden text-white p-2 hover:text-electric-cyan transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open mobile menu"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
