'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle, Phone, MessageSquare, MapPin, Calendar, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

interface ServiceOption {
  _id: string;
  title: string;
  category: string;
}

export function ServiceRequestForm({ services }: { services: ServiceOption[] }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    serviceId: '',
    address: '',
    preferredContactMethod: 'PHONE',
    preferredDate: '',
    preferredTime: '',
    message: '',
    consent: false,
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear validation error when typing
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
    
    if (!formData.serviceId) {
      errors.serviceId = 'Please select a service';
    }
    
    if (!formData.address || formData.address.trim().length < 5) {
      errors.address = 'Please provide your address/area';
    }
    
    if (!formData.consent) {
      errors.consent = 'You must agree to the terms to submit an inquiry';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) {
      // Scroll to top of form to see errors
      return;
    }

    setIsSubmitting(true);
    
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit inquiry');
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
        className="bg-deep-black p-8 md:p-12 rounded-2xl border border-electric-cyan/20 text-center shadow-[0_0_50px_rgba(0,255,255,0.05)]"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 12, delay: 0.2 }}
          className="w-24 h-24 bg-electric-cyan/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-electric-cyan/20"
        >
          <CheckCircle className="text-electric-cyan" size={48} />
        </motion.div>
        
        <h2 className="text-3xl font-bold text-white mb-4">Request Received!</h2>
        <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
          Thank you for reaching out, {formData.name.split(' ')[0]}. Our expert electrical team will review your request and contact you via your preferred method shortly.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <Link 
            href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, '')}`} 
            className="flex items-center justify-center bg-electric-cyan text-deep-black font-bold py-3 px-6 rounded-lg hover:bg-electric-cyan/90 transition-colors"
          >
            <Phone className="mr-2" size={18} /> Call Us Now
          </Link>
          <Link 
            href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, '')}?text=Service%20Inquiry`}
            target="_blank" 
            className="flex items-center justify-center border border-white/20 text-white font-bold py-3 px-6 rounded-lg hover:border-green-500 hover:text-green-500 transition-colors"
          >
            <MessageSquare className="mr-2" size={18} /> WhatsApp Us
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-charcoal p-6 md:p-10 rounded-2xl border border-white/5 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-electric-cyan/5 blur-[100px] rounded-full pointer-events-none" />
      
      <h2 className="text-2xl font-bold text-white mb-2">Service Request Form</h2>
      <p className="text-gray-400 mb-8">Fill out the details below and we'll get back to you immediately.</p>
      
      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3 text-red-500">
          <AlertCircle className="shrink-0 mt-0.5" size={18} />
          <p className="text-sm">{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-300">Full Name *</label>
            <input 
              id="name"
              name="name"
              type="text" 
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full bg-deep-black border ${validationErrors.name ? 'border-red-500/50' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan transition-colors`}
              placeholder="John Doe"
            />
            {validationErrors.name && <p className="text-red-500 text-xs">{validationErrors.name}</p>}
          </div>
          
          {/* Phone */}
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium text-gray-300">Mobile Number *</label>
            <input 
              id="phone"
              name="phone"
              type="tel" 
              value={formData.phone}
              onChange={handleInputChange}
              className={`w-full bg-deep-black border ${validationErrors.phone ? 'border-red-500/50' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan transition-colors`}
              placeholder="e.g. 9876543210"
            />
            {validationErrors.phone && <p className="text-red-500 text-xs">{validationErrors.phone}</p>}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-300">Email Address (Optional)</label>
            <input 
              id="email"
              name="email"
              type="email" 
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full bg-deep-black border ${validationErrors.email ? 'border-red-500/50' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan transition-colors`}
              placeholder="john@example.com"
            />
            {validationErrors.email && <p className="text-red-500 text-xs">{validationErrors.email}</p>}
          </div>

          {/* Service */}
          <div className="space-y-2">
            <label htmlFor="serviceId" className="text-sm font-medium text-gray-300">Select Service *</label>
            <select
              id="serviceId"
              name="serviceId"
              value={formData.serviceId}
              onChange={handleInputChange}
              className={`w-full bg-deep-black border ${validationErrors.serviceId ? 'border-red-500/50' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan transition-colors appearance-none`}
            >
              <option value="" disabled>-- Choose a Service --</option>
              {services.map(service => (
                <option key={service._id} value={service._id}>{service.title}</option>
              ))}
            </select>
            {validationErrors.serviceId && <p className="text-red-500 text-xs">{validationErrors.serviceId}</p>}
          </div>
        </div>

        {/* Address */}
        <div className="space-y-2">
          <label htmlFor="address" className="text-sm font-medium text-gray-300">Address / Area *</label>
          <div className="relative">
            <MapPin className="absolute left-4 top-3.5 text-gray-500" size={18} />
            <input 
              id="address"
              name="address"
              type="text" 
              value={formData.address}
              onChange={handleInputChange}
              className={`w-full bg-deep-black border ${validationErrors.address ? 'border-red-500/50' : 'border-white/10'} rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan transition-colors`}
              placeholder="Enter your full address or locality"
            />
          </div>
          {validationErrors.address && <p className="text-red-500 text-xs">{validationErrors.address}</p>}
        </div>
        
        {/* Date & Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="preferredDate" className="text-sm font-medium text-gray-300">Preferred Date (Optional)</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-3.5 text-gray-500" size={18} />
              <input 
                id="preferredDate"
                name="preferredDate"
                type="date" 
                value={formData.preferredDate}
                onChange={handleInputChange}
                className="w-full bg-deep-black border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan transition-colors color-scheme-dark"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="preferredTime" className="text-sm font-medium text-gray-300">Preferred Time (Optional)</label>
            <div className="relative">
              <Clock className="absolute left-4 top-3.5 text-gray-500" size={18} />
              <input 
                id="preferredTime"
                name="preferredTime"
                type="time" 
                value={formData.preferredTime}
                onChange={handleInputChange}
                className="w-full bg-deep-black border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan transition-colors color-scheme-dark"
              />
            </div>
          </div>
        </div>

        {/* Preferred Contact Method */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-300">Preferred Contact Method</label>
          <div className="flex flex-wrap gap-4">
            {['PHONE', 'WHATSAPP', 'EMAIL'].map((method) => (
              <label key={method} className="flex items-center gap-2 cursor-pointer group">
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${formData.preferredContactMethod === method ? 'border-electric-cyan bg-electric-cyan/10' : 'border-gray-500 group-hover:border-gray-300'}`}>
                  {formData.preferredContactMethod === method && <div className="w-2.5 h-2.5 rounded-full bg-electric-cyan" />}
                </div>
                <input 
                  type="radio" 
                  name="preferredContactMethod" 
                  value={method} 
                  checked={formData.preferredContactMethod === method}
                  onChange={handleInputChange}
                  className="hidden" 
                />
                <span className="text-gray-300 text-sm capitalize">{method.toLowerCase()}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium text-gray-300">Additional Details (Optional)</label>
          <textarea 
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleInputChange}
            className="w-full bg-deep-black border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan transition-colors resize-none"
            placeholder="Tell us a bit more about what you need..."
          />
        </div>

        {/* Consent */}
        <div className="space-y-2">
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center shrink-0 mt-0.5">
              <input 
                type="checkbox"
                name="consent"
                checked={formData.consent}
                onChange={handleInputChange}
                className="w-5 h-5 appearance-none border border-white/20 rounded bg-deep-black checked:bg-electric-cyan checked:border-electric-cyan focus:outline-none focus:ring-2 focus:ring-electric-cyan/30 transition-colors"
              />
              <CheckCircle className={`absolute text-deep-black pointer-events-none transition-opacity ${formData.consent ? 'opacity-100' : 'opacity-0'}`} size={14} />
            </div>
            <span className="text-sm text-gray-400 leading-relaxed">
              I agree to the <Link href="#" className="text-electric-cyan hover:underline">Terms of Service</Link> and <Link href="#" className="text-electric-cyan hover:underline">Privacy Policy</Link>, and consent to being contacted regarding this request. *
            </span>
          </label>
          {validationErrors.consent && <p className="text-red-500 text-xs ml-8">{validationErrors.consent}</p>}
        </div>

        {/* Submit */}
        <div className="pt-4">
          <Button 
            type="submit" 
            variant="primary" 
            className="w-full py-6 text-lg group relative overflow-hidden"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="animate-spin" size={20} />
                Submitting Request...
              </span>
            ) : (
              <span className="flex items-center gap-2 relative z-10">
                Request Service
              </span>
            )}
            
            {/* Button Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
          </Button>
        </div>

      </form>
    </div>
  );
}
