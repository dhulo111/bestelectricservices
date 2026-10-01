'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, PowerOff, ShieldAlert, HomeIcon } from 'lucide-react';

const reasons = [
  {
    icon: PowerOff,
    title: "Frequent Power Tripping",
    desc: "Breakers constantly flipping? We diagnose overloaded circuits and failing hardware to restore stable power."
  },
  {
    icon: AlertTriangle,
    title: "Flickering Lights & Surges",
    desc: "We track down loose connections and outdated wiring that cause annoying and dangerous power fluctuations."
  },
  {
    icon: ShieldAlert,
    title: "Code Violations",
    desc: "Buying or selling a home? We rectify inspection failures and bring ancient wiring up to modern safety codes."
  },
  {
    icon: HomeIcon,
    title: "Modern Upgrades",
    desc: "From smart-home CCTV installations to EV charger setups, we prepare your home for the future."
  }
];

export function WhyCustomersCall() {
  return (
    <section className="py-16 md:py-24 bg-deep-black bg-grid relative">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xs md:text-sm font-bold text-electric-cyan uppercase tracking-[0.2em] mb-2 md:mb-3">Why They Call Us</h2>
            <h3 className="text-2xl md:text-5xl font-bold text-white mb-4 md:mb-6">Solving Real Problems</h3>
            <p className="text-gray-400 text-base md:text-lg">
              We don't just pull wire. We solve the frustrating, dangerous, and complex electrical issues that keep property owners awake at night.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-charcoal p-6 md:p-8 rounded-xl border border-white/5 hover:border-electric-cyan/30 transition-colors flex gap-4 md:gap-6"
            >
              <div className="shrink-0 w-10 h-10 md:w-14 md:h-14 rounded-full bg-deep-black border border-white/10 flex items-center justify-center text-electric-cyan shadow-glow-sm">
                <reason.icon className="w-5 h-5 md:w-7 md:h-7" />
              </div>
              <div>
                <h4 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">{reason.title}</h4>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed">{reason.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
