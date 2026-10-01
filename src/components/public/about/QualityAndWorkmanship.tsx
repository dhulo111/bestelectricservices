'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function QualityAndWorkmanship() {
  return (
    <section className="py-16 md:py-24 bg-deep-black relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xs md:text-sm font-bold text-electric-cyan uppercase tracking-[0.2em] mb-2 md:mb-3">Our Standards</h2>
            <h3 className="text-2xl md:text-5xl font-bold text-white mb-4 md:mb-6">
              Quality Materials.<br className="hidden md:block" /> Flawless Workmanship.
            </h3>
            <p className="text-gray-400 text-base md:text-lg mb-6 md:mb-8 leading-relaxed">
              An electrical system is only as strong as its weakest link. That's why we refuse to use substandard materials. From the main breaker panel down to the smallest wire nut, we source premium, durable components that guarantee longevity and safety.
            </p>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8">
              Coupled with our rigorous installation protocols, this ensures that every job we complete not only meets but frequently exceeds local building codes. We build systems designed to last decades, not just until the warranty expires.
            </p>
            
            <div className="flex gap-6 md:gap-12 border-t border-white/10 pt-6 md:pt-8 mt-6 md:mt-8">
              <div>
                <p className="text-2xl md:text-3xl font-black text-white mb-1">100%</p>
                <p className="text-xs md:text-sm text-gray-500 uppercase tracking-wider">Code Compliant</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-black text-white mb-1">Premium</p>
                <p className="text-xs md:text-sm text-gray-500 uppercase tracking-wider">Materials Used</p>
              </div>
            </div>
          </motion.div>

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative h-[250px] md:h-[600px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl mt-8 md:mt-0">
              <Image 
                src="/images/services/electrical-repair.jpg" 
                alt="Precision electrical workmanship"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-deep-black/30 mix-blend-overlay" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
