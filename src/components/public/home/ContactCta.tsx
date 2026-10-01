'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';

export function ContactCta() {
  return (
    <section className="py-16 md:py-24 bg-charcoal relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="bg-deep-black rounded-3xl overflow-hidden shadow-2xl border border-electric-cyan/20 relative">
          
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image 
              src="/images/company/contact.jpg"
              alt="Contact our electricians"
              fill
              className="object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-deep-black via-deep-black/90 to-transparent" />
          </div>

          <div className="relative z-10 p-6 md:p-16 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6">
                Ready for a <span className="text-electric-cyan">Safe & Reliable</span> Electrical Solution?
              </h2>
              <p className="text-base md:text-lg text-gray-300 mb-8 md:mb-10">
                Don't compromise on safety. Get in touch with our certified professionals today for a transparent quote and immediate assistance.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Link href="/contact">
                  <Button variant="primary" className="w-full sm:w-auto text-base md:text-lg px-6 md:px-8 py-4 md:py-6">
                    Request a Quote
                  </Button>
                </Link>
                <a href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, '')}`}>
                  <Button variant="ghost" className="w-full sm:w-auto text-base md:text-lg px-6 md:px-8 py-4 md:py-6 bg-deep-black/50 backdrop-blur-sm border-electric-cyan text-electric-cyan hover:bg-electric-cyan hover:text-deep-black border">
                    Call {siteConfig.contact.phone}
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
