'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
      {/* Background Image with Parallax & Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/hero-bg.jpg"
          alt="Professional Electrical Services"
          fill
          priority
          className="object-cover object-center scale-105 transform motion-safe:animate-slow-pan"
        />
        {/* Dark overlay with gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-deep-black/95 via-deep-black/80 to-transparent z-10" />
      </div>

      <div className="container relative z-20 mx-auto px-4 md:px-6 pt-32 md:pt-40 pb-16">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 md:mb-6 leading-[1.2] md:leading-tight">
              Professional Electrical Services, <br className="hidden md:block" /> Built for <span className="text-electric-cyan drop-shadow-glow-sm">Safety</span>.
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="hidden md:block text-base md:text-xl text-gray-300 mb-8 md:mb-10 leading-relaxed max-w-2xl"
          >
            From complete house wiring to expert AC & CCTV installations. We provide 
            premium residential and commercial electrical solutions you can trust.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="flex flex-row gap-3 md:gap-4 mt-8 md:mt-0"
          >
            <Link href="/contact" className="flex-1 sm:flex-none">
              <Button variant="primary" className="w-full text-sm md:text-lg px-4 md:px-8 py-3.5 md:py-6">
                Get Service
              </Button>
            </Link>
            <Link href="/services" className="flex-1 sm:flex-none">
              <Button variant="ghost" className="w-full text-sm md:text-lg px-4 md:px-8 py-3.5 md:py-6 bg-deep-black/50 backdrop-blur-sm border border-white/20">
                Services
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Decorative Light Effect */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-electric-cyan/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none z-10" />
    </section>
  );
}
