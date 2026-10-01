'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Shield, Zap, Wrench, Users, CheckCircle2 } from 'lucide-react';

const reasons = [
  {
    icon: Shield,
    title: "Safety First Approach",
    desc: "Strict adherence to all local and national electrical safety codes. Your family's safety is our highest priority."
  },
  {
    icon: Wrench,
    title: "Skilled Workmanship",
    desc: "Our electricians undergo rigorous training to ensure every connection, wire, and panel is installed perfectly."
  },
  {
    icon: Zap,
    title: "Reliable & Punctual",
    desc: "We value your time. Our team arrives on schedule and completes projects within the agreed timeframe."
  },
  {
    icon: Users,
    title: "Clean Installation",
    desc: "We respect your property, ensuring a clean workspace during and after the electrical installation process."
  }
];

export function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24 bg-charcoal relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative h-[250px] md:h-[600px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <Image 
                src="/images/company/about-us.jpg" 
                alt="Our professional team at work"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-deep-black/20 mix-blend-overlay" />
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-8 -right-8 bg-deep-black border border-white/10 p-6 rounded-xl shadow-glow-sm max-w-xs hidden md:block">
              <div className="flex items-center gap-4 mb-2">
                <CheckCircle2 className="text-electric-cyan" size={32} />
                <h4 className="text-white font-bold text-lg">Trusted Experts</h4>
              </div>
              <p className="text-sm text-gray-400">Delivering premium electrical solutions for over a decade.</p>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xs md:text-sm font-bold text-electric-cyan uppercase tracking-[0.2em] mb-2 md:mb-3">Why Choose Us</h2>
            <h3 className="text-2xl md:text-5xl font-bold text-white mb-4 md:mb-8 leading-tight">
              Built on Trust. <br/> Powered by Excellence.
            </h3>
            <p className="text-gray-400 text-base md:text-lg mb-8 md:mb-12">
              Choosing an electrician means inviting someone into your home or business. We don't take that lightly. We back our work with a commitment to quality, transparency, and absolute safety.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
              {reasons.map((reason, index) => (
                <motion.div 
                  key={reason.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="space-y-4"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-deep-black border border-white/5 flex items-center justify-center text-electric-cyan shadow-glow-sm">
                    <reason.icon size={20} className="md:w-6 md:h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1.5 md:mb-2">{reason.title}</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">{reason.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
