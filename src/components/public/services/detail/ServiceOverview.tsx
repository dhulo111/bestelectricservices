'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { IService } from '@/models/Service';

export function ServiceOverview({ service }: { service: IService }) {
  return (
    <section className="py-12 md:py-24 bg-deep-black">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
          
          {/* Main Description */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-6">
              Service <span className="text-electric-cyan">Overview</span>
            </h2>
            <div className="prose prose-invert prose-base md:prose-lg max-w-none text-gray-400">
              {/* Splitting the description if it's long, or just rendering it */}
              <p className="leading-relaxed whitespace-pre-line text-sm md:text-base">
                {service.description}
              </p>
            </div>
          </motion.div>

          {/* What's Included (Features) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-charcoal p-6 md:p-10 rounded-2xl border border-white/5 shadow-xl relative overflow-hidden mt-2 md:mt-0"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-electric-cyan/5 blur-[50px] rounded-full pointer-events-none" />
            
            <h3 className="text-xl md:text-2xl font-bold text-white mb-6 md:mb-8 flex items-center">
              What's Included
            </h3>
            
            <ul className="space-y-3 md:space-y-4">
              {service.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3 md:gap-4">
                  <CheckCircle2 className="text-electric-cyan shrink-0 mt-0.5 md:mt-1 w-5 h-5 md:w-6 md:h-6" />
                  <span className="text-gray-300 text-sm md:text-lg">{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
