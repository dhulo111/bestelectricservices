'use client';

import { motion } from 'framer-motion';

export function CompanyIntro() {
  return (
    <section className="py-16 md:py-24 bg-deep-black relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-0 w-1/3 h-1/2 bg-electric-cyan/5 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center md:text-left">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xs md:text-sm font-bold text-electric-cyan uppercase tracking-[0.2em] mb-3 md:mb-4">Our Story</h2>
            <h3 className="text-2xl md:text-4xl font-bold text-white mb-6 md:mb-8 leading-tight">
              A Legacy of Excellence Built on Honest, Hard Work.
            </h3>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-16 text-gray-300 leading-relaxed text-base md:text-lg">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="mb-6">
                Founded in [Year Established], we started with a simple belief: electrical services shouldn't be complicated or opaque. Customers deserve absolute clarity on what is being repaired, why it needs repairing, and how much it will cost.
              </p>
              <p>
                What began as a small local operation has grown through sheer word-of-mouth. We never cut corners, we never compromise on safety, and we treat every home and business as if it were our own.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="mb-6">
                Our technicians aren't just trained to pull wire; they are trained to solve complex problems and communicate effectively. When you hire us, you are hiring a dedicated team of problem solvers who understand the critical nature of modern electrical infrastructure.
              </p>
              <p className="font-semibold text-white border-l-2 border-electric-cyan pl-4 text-sm md:text-base">
                "Our mission is simple: To provide the highest standard of electrical safety and craftsmanship in the region, without exception."
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
