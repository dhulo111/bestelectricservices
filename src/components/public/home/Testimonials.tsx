'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Card } from '@/components/ui/card';

const testimonials = [
  {
    name: "James Wilson",
    role: "Homeowner",
    text: "They completely rewired our 1950s home. The team was incredibly professional, clean, and finished exactly on schedule. I feel much safer now.",
    rating: 5
  },
  {
    name: "Sarah Jenkins",
    role: "Business Owner",
    text: "When our office lost power during a crucial week, they had an emergency team out within the hour. Absolute lifesavers with top-tier service.",
    rating: 5
  },
  {
    name: "Marcus Thorne",
    role: "Property Developer",
    text: "I've used them for three different residential projects now. Their AC and CCTV installations are always flawless. Highly recommended.",
    rating: 5
  }
];

export function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-charcoal relative">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="text-center mb-10 md:mb-16 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xs md:text-sm font-bold text-electric-cyan uppercase tracking-[0.2em] mb-2 md:mb-3">Client Reviews</h2>
            <h3 className="text-2xl md:text-5xl font-bold text-white mb-4 md:mb-6">Don't Just Take Our Word For It</h3>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card interactive={false} className="p-6 md:p-8 h-full flex flex-col bg-deep-black border-white/5 relative">
                <Quote className="absolute top-6 right-6 text-white/5" size={60} />
                
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-500 fill-yellow-500 md:w-[18px] md:h-[18px]" />
                  ))}
                </div>
                
                <p className="text-gray-300 italic mb-8 flex-grow relative z-10 text-sm md:text-base">
                  "{testimonial.text}"
                </p>
                
                <div>
                  <h4 className="text-white font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-electric-cyan">{testimonial.role}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
