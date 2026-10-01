'use client';

import { motion } from 'framer-motion';
import { HardHat, Ruler, SearchCheck, ZapOff } from 'lucide-react';
import { Card } from '@/components/ui/card';

const approachItems = [
  {
    icon: SearchCheck,
    title: "Diagnostic Precision",
    desc: "We don't guess. We use advanced diagnostic tools to pinpoint the exact cause of electrical faults before recommending a solution."
  },
  {
    icon: Ruler,
    title: "Methodical Planning",
    desc: "Every installation, from a single fixture to a full building rewire, is planned meticulously to ensure efficiency and code compliance."
  }
];

const safetyItems = [
  {
    icon: ZapOff,
    title: "Zero-Compromise Safety",
    desc: "If it isn't safe, we won't do it. We strictly adhere to National Electrical Code (NEC) standards on every single project."
  },
  {
    icon: HardHat,
    title: "Continuous Training",
    desc: "Our electricians undergo regular safety briefings and training on the latest safety protocols and equipment."
  }
];

export function CorePhilosophy() {
  return (
    <section className="py-16 md:py-24 bg-charcoal relative">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xs md:text-sm font-bold text-electric-cyan uppercase tracking-[0.2em] mb-3 md:mb-4">Core Philosophy</h2>
            <h3 className="text-2xl md:text-5xl font-bold text-white mb-4 md:mb-6">Our Approach & Safety Standards</h3>
            <p className="text-gray-400 text-base md:text-lg">
              We operate on two non-negotiable pillars: a meticulous approach to our craft and an uncompromising dedication to safety.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Approach Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card interactive={false} className="h-full p-6 md:p-8 bg-deep-black border-white/5 border-t-2 border-t-electric-cyan/50">
              <h4 className="text-xl md:text-2xl font-bold text-white mb-6 md:mb-8 flex items-center gap-3">
                <span className="w-8 h-8 rounded bg-electric-cyan/10 flex items-center justify-center text-electric-cyan text-sm">01</span>
                Our Methodology
              </h4>
              <div className="space-y-6 md:space-y-8">
                {approachItems.map((item, idx) => (
                  <div key={idx} className="flex gap-3 md:gap-4">
                    <div className="mt-1 shrink-0 text-gray-500">
                      <item.icon className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div>
                      <h5 className="text-white font-semibold mb-1.5 md:mb-2 text-sm md:text-base">{item.title}</h5>
                      <p className="text-gray-400 text-sm md:text-base">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Safety Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card interactive={false} className="h-full p-6 md:p-8 bg-deep-black border-white/5 border-t-2 border-t-red-500/50">
              <h4 className="text-xl md:text-2xl font-bold text-white mb-6 md:mb-8 flex items-center gap-3">
                <span className="w-8 h-8 rounded bg-red-500/10 flex items-center justify-center text-red-500 text-sm">02</span>
                Safety Doctrine
              </h4>
              <div className="space-y-6 md:space-y-8">
                {safetyItems.map((item, idx) => (
                  <div key={idx} className="flex gap-3 md:gap-4">
                    <div className="mt-1 shrink-0 text-gray-500">
                      <item.icon className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div>
                      <h5 className="text-white font-semibold mb-1.5 md:mb-2 text-sm md:text-base">{item.title}</h5>
                      <p className="text-gray-400 text-sm md:text-base">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
