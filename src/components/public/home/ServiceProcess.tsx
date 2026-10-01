'use client';

import { motion } from 'framer-motion';
import { PhoneCall, ClipboardCheck, Zap, ThumbsUp } from 'lucide-react';

const steps = [
  {
    icon: PhoneCall,
    title: "1. Request Service",
    desc: "Contact us via phone, WhatsApp, or our online form to describe your electrical needs."
  },
  {
    icon: ClipboardCheck,
    title: "2. Inspection & Quote",
    desc: "Our expert assesses the site and provides a transparent, upfront quote with no hidden fees."
  },
  {
    icon: Zap,
    title: "3. Professional Execution",
    desc: "We perform the installation or repair using premium materials and strict safety standards."
  },
  {
    icon: ThumbsUp,
    title: "4. Quality Check",
    desc: "A final walkthrough ensures everything is working perfectly and the workspace is clean."
  }
];

export function ServiceProcess() {
  return (
    <section className="py-24 bg-deep-black relative">
      {/* Background Image with heavy overlay */}
      <div 
        className="absolute inset-0 bg-[url('/images/company/process.jpg')] bg-cover bg-center opacity-10 bg-fixed pointer-events-none" 
      />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-bold text-electric-cyan uppercase tracking-[0.2em] mb-3">How We Work</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">Our Simple 4-Step Process</h3>
            <p className="text-gray-400 text-lg">
              We've streamlined our service process to ensure you get fast, reliable, and hassle-free electrical solutions every time.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Connector Line (Desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-1/2 w-full h-[2px] bg-gradient-to-r from-electric-cyan/50 to-transparent z-0" />
              )}
              
              <div className="relative z-10 flex flex-col items-center text-center bg-charcoal p-8 rounded-xl border border-white/5 hover:border-electric-cyan/30 transition-colors h-full">
                <div className="w-24 h-24 rounded-full bg-deep-black border-2 border-electric-cyan/20 flex items-center justify-center mb-6 group-hover:border-electric-cyan group-hover:shadow-glow-sm transition-all duration-300">
                  <step.icon size={40} className="text-electric-cyan" />
                </div>
                <h4 className="text-xl font-bold text-white mb-4">{step.title}</h4>
                <p className="text-gray-400">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
