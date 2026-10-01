'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const features = [
  "Concealed & surface wiring",
  "Circuit breaker panel upgrades",
  "Smart home automation wiring",
  "Safety inspections & fault finding"
];

export function FeaturedService() {
  return (
    <section className="py-24 bg-charcoal relative overflow-hidden">
      <div className="absolute right-0 top-0 w-1/2 h-full bg-electric-cyan/5 blur-[150px] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-deep-black rounded-3xl border border-white/5 overflow-hidden">
          <div className="grid lg:grid-cols-2">
            
            {/* Content Side */}
            <div className="p-8 md:p-16 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-cyan/10 border border-electric-cyan/20 text-electric-cyan text-sm font-semibold mb-6">
                  <span className="w-2 h-2 rounded-full bg-electric-cyan animate-pulse" />
                  Featured Service
                </div>
                
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                  Complete House Wiring Solutions
                </h2>
                
                <p className="text-gray-400 text-lg mb-8">
                  Whether you're building a new home or renovating an old one, our comprehensive house wiring services ensure your electrical system is safe, efficient, and ready for modern demands.
                </p>

                <ul className="space-y-4 mb-10">
                  {features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-gray-300">
                      <CheckCircle2 className="text-electric-cyan shrink-0" size={20} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link href="/services/full-house-wiring">
                  <Button variant="primary" className="group">
                    View Details 
                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Image Side */}
            <div className="relative h-[400px] lg:h-auto overflow-hidden">
              <Image 
                src="/images/services/house-wiring.jpg"
                alt="Professional house wiring"
                fill
                className="object-cover transform transition-transform duration-1000 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-deep-black via-transparent to-transparent lg:hidden" />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-black via-transparent to-transparent lg:hidden" />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
