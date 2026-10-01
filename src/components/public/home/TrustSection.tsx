'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Clock, Award, Banknote } from 'lucide-react';

const trustItems = [
  { icon: ShieldCheck, title: "Licensed & Insured", desc: "Fully certified professionals" },
  { icon: Clock, title: "24/7 Emergency", desc: "Always here when you need us" },
  { icon: Award, title: "Skilled Workmanship", desc: "Premium quality guaranteed" },
  { icon: Banknote, title: "Upfront Pricing", desc: "No hidden costs or surprises" },
];

export function TrustSection() {
  return (
    <section className="bg-charcoal border-b border-white/5 relative z-30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {trustItems.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center gap-4 py-8 px-4 sm:px-6 lg:justify-center group"
            >
              <div className="p-3 rounded-lg bg-deep-black border border-white/10 text-electric-cyan group-hover:scale-110 group-hover:shadow-glow-sm transition-all duration-300">
                <item.icon size={24} />
              </div>
              <div>
                <h4 className="text-white font-bold tracking-wide">{item.title}</h4>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
