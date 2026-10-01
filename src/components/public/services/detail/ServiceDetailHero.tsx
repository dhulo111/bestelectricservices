'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { IService } from '@/models/Service';

export function ServiceDetailHero({ service }: { service: IService }) {
  return (
    <section className="relative h-[50vh] min-h-[400px] md:h-[60vh] md:min-h-[500px] flex items-center pt-28 md:pt-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={service.coverImage}
          alt={service.title}
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay with brand gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-deep-black via-deep-black/80 to-deep-black/30" />
        <div className="absolute inset-0 bg-charcoal/20 backdrop-blur-[2px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          {/* Breadcrumbs */}
          <nav className="flex items-center text-xs md:text-sm font-medium text-gray-400 mb-4 md:mb-6 bg-deep-black/50 backdrop-blur-md w-fit px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/10">
            <Link href="/" className="hover:text-electric-cyan transition-colors">Home</Link>
            <ChevronRight size={14} className="mx-2" />
            <Link href="/services" className="hover:text-electric-cyan transition-colors">Services</Link>
            <ChevronRight size={14} className="mx-2" />
            <span className="text-electric-cyan">{service.title}</span>
          </nav>

          {/* Category Badge */}
          <div className="inline-block px-2.5 py-1 md:px-3 md:py-1 rounded-full bg-electric-cyan/10 text-electric-cyan text-xs md:text-sm font-bold uppercase tracking-wider mb-3 md:mb-4 border border-electric-cyan/20">
            {service.category}
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight drop-shadow-lg">
            {service.title}
          </h1>
          
          <p className="text-base md:text-xl text-gray-300 max-w-2xl leading-relaxed">
            {service.shortDescription}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
