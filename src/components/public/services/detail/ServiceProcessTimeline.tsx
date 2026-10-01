'use client';

import { motion } from 'framer-motion';
import { IService } from '@/models/Service';

export function ServiceProcessTimeline({ service }: { service: IService }) {
  if (!service.process || service.process.length === 0) return null;

  return (
    <section className="py-12 md:py-20 bg-deep-black relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-6">
            Our <span className="text-electric-cyan">Process</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-lg">
            How we execute your {service.title.toLowerCase()} project with precision.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-electric-cyan/50 via-electric-cyan/20 to-transparent md:-translate-x-1/2" />
          
          <div className="space-y-8 md:space-y-12">
            {service.process.map((step, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-start ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-3 md:left-1/2 w-6 h-6 md:w-8 md:h-8 rounded-full bg-deep-black border-2 border-electric-cyan -translate-x-1/2 flex items-center justify-center z-10 shadow-glow-sm mt-1 md:mt-0">
                    <span className="text-[10px] md:text-xs font-bold text-electric-cyan">{step.step}</span>
                  </div>
                  
                  {/* Content Box */}
                  <div className={`ml-8 md:ml-0 md:w-1/2 ${isEven ? 'md:pl-12' : 'md:pr-12'}`}>
                    <div className="bg-charcoal p-5 md:p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                      <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 flex items-center gap-3">
                        <span className="text-electric-cyan md:hidden">0{step.step}.</span>
                        {step.title}
                      </h3>
                      <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
