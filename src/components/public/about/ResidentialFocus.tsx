'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function ResidentialFocus() {
  return (
    <section className="py-16 md:py-24 bg-charcoal relative overflow-hidden">
      <div className="absolute left-0 bottom-0 w-1/2 h-1/2 bg-electric-cyan/5 blur-[150px] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="bg-deep-black rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
          <div className="grid lg:grid-cols-2">
            
            {/* Image Side */}
            <div className="relative h-[250px] md:h-[400px] lg:h-auto overflow-hidden order-2 lg:order-1">
              <Image 
                src="/images/services/house-wiring.jpg"
                alt="Residential electrical expertise"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-black via-transparent to-transparent lg:hidden" />
              <div className="absolute inset-0 bg-gradient-to-l from-deep-black via-transparent to-transparent hidden lg:block" />
            </div>

            {/* Content Side */}
            <div className="p-6 md:p-16 flex flex-col justify-center order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl md:text-5xl font-bold text-white mb-4 md:mb-6">
                  Protecting Your Biggest Investment
                </h2>
                
                <p className="text-gray-400 text-base md:text-lg mb-4 md:mb-6 leading-relaxed">
                  Your home is your sanctuary. But behind the drywall, faulty wiring or outdated panels can pose severe risks. We specialize in residential electrical systems because we understand the unique challenges and responsibilities involved in protecting families.
                </p>

                <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                  Whether we are upgrading a 50-year-old service panel to handle modern appliances, or cleanly running new lines for a smart-home integration, we treat your property with the utmost respect. We use drop cloths, clean up meticulously, and ensure minimal disruption to your daily life.
                </p>
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
