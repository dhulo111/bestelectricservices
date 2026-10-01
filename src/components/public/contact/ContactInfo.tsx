'use client';

import { Phone, Mail, MapPin, Clock, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ContactInfoProps {
  phone: string;
  whatsapp?: string;
  email: string;
  address: string;
  workingHours: string;
  emergencyService: boolean;
}

export function ContactInfo({ data }: { data: ContactInfoProps }) {
  return (
    <div className="space-y-6">
      {/* Emergency Banner */}
      {data.emergencyService && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 md:p-6 flex items-start gap-3 md:gap-4"
        >
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
            <AlertTriangle className="text-red-500 w-5 h-5 md:w-6 md:h-6" />
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2">24/7 Emergency Service</h3>
            <p className="text-gray-400 mb-3 md:mb-4 text-xs md:text-sm leading-relaxed">
              We offer round-the-clock emergency electrical repairs. Don't risk your safety—call us immediately if you have a critical electrical fault.
            </p>
            <Link 
              href={`tel:${data.phone.replace(/[^0-9+]/g, '')}`} 
              className="inline-flex items-center text-red-400 hover:text-red-300 font-bold transition-colors"
            >
              <Phone className="mr-2" size={16} /> Call Emergency Line
            </Link>
          </div>
        </motion.div>
      )}

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-charcoal p-5 md:p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-electric-cyan/10 flex items-center justify-center mb-3 md:mb-4">
            <Phone className="text-electric-cyan" size={20} />
          </div>
          <h4 className="text-base md:text-lg font-bold text-white mb-1">Phone</h4>
          <p className="text-gray-400 text-xs md:text-sm mb-3">Call us directly for fast response</p>
          <a href={`tel:${data.phone.replace(/[^0-9+]/g, '')}`} className="text-white text-sm md:text-base hover:text-electric-cyan font-medium transition-colors">
            {data.phone}
          </a>
        </div>

        <div className="bg-charcoal p-5 md:p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-electric-cyan/10 flex items-center justify-center mb-3 md:mb-4">
            <Mail className="text-electric-cyan" size={20} />
          </div>
          <h4 className="text-base md:text-lg font-bold text-white mb-1">Email</h4>
          <p className="text-gray-400 text-xs md:text-sm mb-3">For general queries and quotes</p>
          <a href={`mailto:${data.email}`} className="text-white text-sm md:text-base hover:text-electric-cyan font-medium transition-colors">
            {data.email}
          </a>
        </div>

        <div className="bg-charcoal p-5 md:p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors sm:col-span-2">
          <div className="w-10 h-10 rounded-lg bg-electric-cyan/10 flex items-center justify-center mb-3 md:mb-4">
            <MapPin className="text-electric-cyan" size={20} />
          </div>
          <h4 className="text-base md:text-lg font-bold text-white mb-1">Office Address</h4>
          <p className="text-gray-400 text-xs md:text-sm mb-3">Visit us or send mail</p>
          <address className="text-white text-sm md:text-base not-italic font-medium leading-relaxed">
            {data.address}
          </address>
        </div>
        
        <div className="bg-charcoal p-5 md:p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors sm:col-span-2">
          <div className="w-10 h-10 rounded-lg bg-electric-cyan/10 flex items-center justify-center mb-3 md:mb-4">
            <Clock className="text-electric-cyan" size={20} />
          </div>
          <h4 className="text-base md:text-lg font-bold text-white mb-1">Working Hours</h4>
          <p className="text-white text-sm md:text-base font-medium">
            {data.workingHours}
          </p>
        </div>
      </div>
    </div>
  );
}
