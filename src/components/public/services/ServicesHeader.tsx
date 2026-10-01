'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export function ServicesHeader() {
  return (
    <section className="relative pt-32 pb-16 bg-deep-black bg-grid overflow-hidden border-b border-white/5">
      {/* Glow Effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-electric-cyan/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-electric-cyan/5 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="container relative z-10 mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto flex flex-col items-center"
        >
          {/* Breadcrumbs */}
          <nav className="flex items-center text-sm font-medium text-gray-400 mb-6 bg-charcoal/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
            <Link href="/" className="hover:text-electric-cyan transition-colors">Home</Link>
            <ChevronRight size={14} className="mx-2" />
            <span className="text-white">Our Services</span>
          </nav>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Comprehensive <br />
            <span className="text-electric-cyan">Electrical Solutions</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl">
            From emergency repairs to full-scale residential wiring, our certified experts deliver safe, reliable, and modern electrical services.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
