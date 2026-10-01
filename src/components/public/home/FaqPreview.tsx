'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "Do you offer 24/7 emergency electrical services?",
    answer: "Yes, we have a dedicated emergency response team available 24/7. Electrical faults don't wait for business hours, and neither do we. Call our hotline for immediate assistance."
  },
  {
    question: "Are your electricians licensed and insured?",
    answer: "Absolutely. Every electrician on our team holds valid national and local licenses, and we carry comprehensive liability insurance for your absolute peace of mind."
  },
  {
    question: "Do you provide free estimates?",
    answer: "Yes, we provide transparent, upfront quotes before any work begins. For most standard residential and commercial jobs, the initial estimate is completely free."
  },
  {
    question: "How quickly can you respond to a service call?",
    answer: "For emergencies, we aim to be on-site within 1-2 hours. For standard service calls, we can typically schedule a visit within 24-48 hours depending on your location."
  }
];

export function FaqPreview() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-deep-black relative">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <p className="text-gray-400 text-lg">Clear answers to your most pressing electrical concerns.</p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="border border-white/10 rounded-lg overflow-hidden bg-charcoal"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
              >
                <span className="text-lg font-bold text-white pr-8">{faq.question}</span>
                <ChevronDown 
                  className={`text-electric-cyan shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} 
                  size={24} 
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6 pt-0 text-gray-400 border-t border-white/5">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
