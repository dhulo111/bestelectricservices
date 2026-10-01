'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export function AboutHero() {
  return (
    <section className="relative h-[60vh] min-h-[400px] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/company/about-us.jpg"
          alt="Our Electrical Team"
          fill
          priority
          className="object-cover object-center scale-105 transform motion-safe:animate-slow-pan"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-black via-deep-black/80 to-charcoal/70 z-10" />
      </div>

      <div className="container relative z-20 mx-auto px-4 md:px-6 pt-32 md:pt-40 text-center pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto flex flex-col items-center"
        >
          {/* Breadcrumbs */}
          <nav className="flex items-center text-sm font-medium text-gray-400 mb-6 bg-deep-black/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
            <Link href="/" className="hover:text-electric-cyan transition-colors">Home</Link>
            <ChevronRight size={14} className="mx-2" />
            <span className="text-white">About Us</span>
          </nav>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
            Powering Our Community with <br className="hidden md:block" /> <span className="text-electric-cyan">Integrity</span> & Precision.
          </h1>
          <p className="hidden md:block text-base md:text-xl text-gray-300 max-w-2xl">
            We are more than just electricians. We are your dedicated partners in building safe, reliable, and modern electrical environments.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
