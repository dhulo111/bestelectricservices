'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { MapPin } from 'lucide-react';

const areas = [
  "Downtown Metropolis",
  "Northside Residential",
  "Westend Commercial Hub",
  "Eastside Suburbs",
  "South Tech Park",
  "Surrounding Counties"
];

export function ServiceAreas() {
  return (
    <section className="py-16 md:py-24 bg-deep-black bg-grid relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xs md:text-sm font-bold text-electric-cyan uppercase tracking-[0.2em] mb-2 md:mb-3">Service Areas</h2>
            <h3 className="text-2xl md:text-5xl font-bold text-white mb-4 md:mb-6">
              Powering the Entire Region
            </h3>
            <p className="text-gray-400 text-base md:text-lg mb-8 md:mb-10">
              We provide rapid response electrical services across the city and surrounding areas. Our fleet of fully equipped vehicles ensures we can reach you quickly, day or night.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {areas.map((area, index) => (
                <motion.div 
                  key={area}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center gap-3 bg-charcoal p-4 rounded-lg border border-white/5 hover:border-electric-cyan/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-deep-black flex items-center justify-center text-electric-cyan">
                    <MapPin size={20} />
                  </div>
                  <span className="text-white font-medium">{area}</span>
                </motion.div>
              ))}
            </div>
            
            <p className="text-sm text-gray-500 mt-8 italic">
              * Don't see your area? Contact us. We frequently service extended regions upon request.
            </p>
          </motion.div>

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative h-[250px] md:h-[500px] rounded-2xl overflow-hidden border border-electric-cyan/20 shadow-glow-sm">
              <Image 
                src="/images/company/service-areas.jpg"
                alt="Our service vehicles in the city"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-deep-black/30 mix-blend-overlay" />
            </div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-electric-cyan/10 blur-[100px] pointer-events-none -z-10" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
