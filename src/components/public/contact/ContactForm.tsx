'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle, Phone, MessageSquare, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.name || formData.name.trim().length < 2) {
      errors.name = 'Please enter your full name';
    }
    
    const phoneRegex = /^[6-9]\d{9}$/;
    const sanitizedPhone = formData.phone.replace(/[\s-]/g, '');
    if (!phoneRegex.test(sanitizedPhone)) {
      errors.phone = 'Please enter a valid 10-digit Indian mobile number';
    }
    
    if (formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = 'Please enter a valid email address';
      }
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          inquiryType: 'GENERAL'
        }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit message');
      }
      
      setIsSuccess(true);
      
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again or call us.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-deep-black p-6 md:p-10 rounded-2xl border border-electric-cyan/20 text-center shadow-glow-sm"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 12, delay: 0.2 }}
          className="w-16 h-16 md:w-20 md:h-20 bg-electric-cyan/10 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 border border-electric-cyan/20"
        >
          <CheckCircle className="text-electric-cyan w-8 h-8 md:w-10 md:h-10" />
        </motion.div>
        
        <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">Message Sent!</h3>
        <p className="text-gray-400 mb-6 md:mb-8 max-w-sm mx-auto text-sm md:text-base">
          Thank you for contacting us, {formData.name.split(' ')[0]}. We'll get back to you shortly.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
          <Link 
            href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, '')}`} 
            className="flex items-center justify-center bg-electric-cyan text-deep-black font-bold py-2.5 px-4 md:py-3 md:px-6 rounded-lg hover:bg-electric-cyan/90 transition-colors text-sm md:text-base"
          >
            <Phone className="mr-2 w-4 h-4 md:w-5 md:h-5" /> Call Instead
          </Link>
          <Link 
            href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, '')}?text=Service%20Inquiry`} 
            target="_blank" 
            className="flex items-center justify-center border border-white/20 text-white font-bold py-2.5 px-4 md:py-3 md:px-6 rounded-lg hover:border-green-500 hover:text-green-500 transition-colors text-sm md:text-base"
          >
            <MessageSquare className="mr-2 w-4 h-4 md:w-5 md:h-5" /> WhatsApp Us
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-charcoal p-5 md:p-10 rounded-2xl border border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-electric-cyan/5 blur-[100px] rounded-full pointer-events-none" />
      
      <h3 className="text-xl md:text-2xl font-bold text-white mb-1.5 md:mb-2">Send us a Message</h3>
      <p className="text-sm md:text-base text-gray-400 mb-6 md:mb-8">We usually respond within 1-2 hours during business days.</p>
      
      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3 text-red-500">
          <AlertCircle className="shrink-0 mt-0.5" size={18} />
          <p className="text-sm">{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Name */}
          <div className="space-y-1.5 md:space-y-2">
            <label htmlFor="name" className="text-xs md:text-sm font-medium text-gray-300">Full Name *</label>
            <input 
              id="name"
              name="name"
              type="text" 
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full bg-deep-black border ${validationErrors.name ? 'border-red-500/50' : 'border-white/10'} rounded-lg px-3 py-2.5 md:px-4 md:py-3 text-sm md:text-base text-white focus:outline-none focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan transition-colors`}
              placeholder="John Doe"
            />
            {validationErrors.name && <p className="text-red-500 text-xs">{validationErrors.name}</p>}
          </div>
          
          {/* Phone */}
          <div className="space-y-1.5 md:space-y-2">
            <label htmlFor="phone" className="text-xs md:text-sm font-medium text-gray-300">Mobile Number *</label>
            <input 
              id="phone"
              name="phone"
              type="tel" 
              value={formData.phone}
              onChange={handleInputChange}
              className={`w-full bg-deep-black border ${validationErrors.phone ? 'border-red-500/50' : 'border-white/10'} rounded-lg px-3 py-2.5 md:px-4 md:py-3 text-sm md:text-base text-white focus:outline-none focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan transition-colors`}
              placeholder="e.g. 9876543210"
            />
            {validationErrors.phone && <p className="text-red-500 text-xs">{validationErrors.phone}</p>}
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1.5 md:space-y-2">
          <label htmlFor="email" className="text-xs md:text-sm font-medium text-gray-300">Email Address (Optional)</label>
          <input 
            id="email"
            name="email"
            type="email" 
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full bg-deep-black border ${validationErrors.email ? 'border-red-500/50' : 'border-white/10'} rounded-lg px-3 py-2.5 md:px-4 md:py-3 text-sm md:text-base text-white focus:outline-none focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan transition-colors`}
            placeholder="john@example.com"
          />
          {validationErrors.email && <p className="text-red-500 text-xs">{validationErrors.email}</p>}
        </div>

        {/* Message */}
        <div className="space-y-1.5 md:space-y-2">
          <label htmlFor="message" className="text-xs md:text-sm font-medium text-gray-300">Your Message</label>
          <textarea 
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleInputChange}
            className="w-full bg-deep-black border border-white/10 rounded-lg px-3 py-2.5 md:px-4 md:py-3 text-sm md:text-base text-white focus:outline-none focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan transition-colors resize-none"
            placeholder="How can we help you today?"
          />
        </div>

        <Button 
          type="submit" 
          variant="primary" 
          className="w-full py-3.5 md:py-6 text-base md:text-lg group relative overflow-hidden"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader2 className="animate-spin" size={20} />
              Sending Message...
            </span>
          ) : (
            <span className="flex items-center gap-2 relative z-10">
              Send Message
            </span>
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
        </Button>
      </form>
    </div>
  );
}
