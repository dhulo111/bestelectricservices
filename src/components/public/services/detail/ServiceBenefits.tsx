'use client';

import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { IService } from '@/models/Service';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export function ServiceBenefits({ service }: { service: IService }) {
  if (!service.benefits || service.benefits.length === 0) return null;

  return (
    <section className="py-12 md:py-16 bg-charcoal relative overflow-hidden">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-electric-cyan/5 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-6">
            Key <span className="text-electric-cyan">Benefits</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base">
            Why customers trust us for their {service.title.toLowerCase()} needs.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto"
        >
          {service.benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-deep-black p-5 md:p-6 rounded-xl border border-white/5 flex items-start gap-3 md:gap-4 group hover:border-electric-cyan/30 transition-colors"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-electric-cyan/10 transition-colors">
                <ShieldCheck className="text-electric-cyan w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <p className="text-white text-base md:text-lg font-medium leading-relaxed pt-1.5 md:pt-2">
                  {benefit}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
