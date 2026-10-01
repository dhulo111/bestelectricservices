'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { IService } from '@/models/Service';

export function ServiceFaqs({ service }: { service: IService }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!service.faqs || service.faqs.length === 0) return null;

  return (
    <section className="py-12 md:py-20 bg-charcoal">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-6">
            Frequently Asked <br className="hidden md:block" /><span className="text-electric-cyan">Questions</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-lg">
            Common questions about our {service.title.toLowerCase()} service.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3 md:space-y-4">
          {service.faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-deep-black border border-white/5 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-4 py-4 md:px-6 md:py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="font-bold text-white text-base md:text-lg pr-4 md:pr-8">{faq.question}</span>
                  <ChevronDown 
                    className={`text-electric-cyan shrink-0 transition-transform duration-300 w-5 h-5 md:w-5 md:h-5 ${isOpen ? 'rotate-180' : ''}`} 
                  />
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-4 pb-4 md:px-6 md:pb-6 text-sm md:text-base text-gray-400 leading-relaxed border-t border-white/5 pt-3 md:pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
