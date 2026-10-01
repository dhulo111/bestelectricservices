'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Video, Lightbulb, Snowflake, Wrench, Home } from 'lucide-react';
import { Card } from '@/components/ui/card';

const services = [
  {
    title: "CCTV Installation",
    desc: "Complete security systems for homes and businesses with mobile access.",
    image: "/images/services/cctv-installation.jpg",
    href: "/services/cctv-installation",
    icon: Video,
    startingPrice: "₹1,499"
  },
  {
    title: "Light Fitting",
    desc: "Premium interior and exterior lighting installation and design.",
    image: "/images/services/light-fitting.jpg",
    href: "/services/light-fitting",
    icon: Lightbulb,
    startingPrice: "₹499"
  },
  {
    title: "AC Installation",
    desc: "Professional air conditioning setup, wiring, and maintenance.",
    image: "/images/services/ac-installation.jpg",
    href: "/services/ac-installation",
    icon: Snowflake,
    startingPrice: "₹1,199"
  },
  {
    title: "Electrical Repairing",
    desc: "Fast, reliable troubleshooting and repair of all electrical faults.",
    image: "/images/services/electrical-repair.jpg",
    href: "/services/electrical-repair",
    icon: Wrench,
    startingPrice: "₹299"
  },
  {
    title: "Full House Wiring",
    desc: "Complete residential wiring solutions for new builds and renovations.",
    image: "/images/services/house-wiring.jpg",
    href: "/services/full-house-wiring",
    icon: Home,
    startingPrice: "Custom Quote"
  }
];

export function ServicesOverview() {
  return (
    <section className="py-16 md:py-24 bg-deep-black bg-grid relative">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        <div className="text-center mb-10 md:mb-16 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xs md:text-sm font-bold text-electric-cyan uppercase tracking-[0.2em] mb-2 md:mb-3">Our Expertise</h2>
            <h3 className="text-2xl md:text-5xl font-bold text-white mb-4 md:mb-6">Comprehensive Electrical Solutions</h3>
            <p className="text-gray-400 text-base md:text-lg">
              We deliver premium, safe, and efficient electrical services tailored to your specific residential and commercial needs.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={service.href} className="block group h-full">
                <Card interactive className="h-full flex flex-col overflow-hidden bg-charcoal border-white/5 relative">
                  <div className="relative h-48 md:h-56 overflow-hidden">
                    <Image 
                      src={service.image} 
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-black via-deep-black/40 to-transparent" />
                    
                    <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 p-2.5 md:p-3 rounded-xl bg-deep-black/80 backdrop-blur-md border border-white/10 text-electric-cyan shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:bg-electric-cyan group-hover:text-deep-black group-hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] transition-all duration-300">
                      <service.icon size={22} className="md:w-6 md:h-6" />
                    </div>

                    <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 flex flex-col items-end">
                      <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-white/80 drop-shadow-md">Starts At</span>
                      <span className="text-base md:text-lg font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        {service.startingPrice}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4 md:p-6 flex flex-col flex-grow relative">
                    <h4 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 group-hover:text-electric-cyan transition-colors line-clamp-1">{service.title}</h4>
                    <p className="text-sm md:text-base text-gray-400 mb-4 md:mb-6 flex-grow line-clamp-2 md:line-clamp-3 leading-relaxed">{service.desc}</p>
                    
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                      <div className="text-xs md:text-sm text-gray-400 font-medium group-hover:text-white transition-colors">
                        View Details
                      </div>
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-electric-cyan group-hover:text-deep-black transition-all text-white">
                        <ArrowRight size={16} className="md:w-5 md:h-5 group-hover:-rotate-45 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
