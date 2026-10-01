'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, ShieldCheck, X, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { IService } from '@/models/Service';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/button';

export function ServicePricing({ service }: { service: IService }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContactClick = () => {
    setIsModalOpen(true);
    setIsSuccess(false);
    setError('');
    setFormData({ name: '', phone: '', address: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!formData.name || formData.name.trim().length < 2) {
      setError('Please enter your full name');
      return;
    }
    
    const phoneRegex = /^[6-9]\d{9}$/;
    const sanitizedPhone = formData.phone.replace(/[\s-]/g, '');
    if (!phoneRegex.test(sanitizedPhone)) {
      setError('Please enter a valid 10-digit Indian mobile number');
      return;
    }
    
    if (!formData.address || formData.address.trim().length < 5) {
      setError('Please provide your address/area');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          inquiryType: 'SERVICE_REQUEST',
          serviceId: service._id,
        }),
      });
      
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Failed to submit booking');
      
      setIsSuccess(true);
      // Auto close after 3 seconds
      setTimeout(() => {
        setIsModalOpen(false);
      }, 3000);
      
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 md:py-20 bg-deep-black">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-charcoal to-deep-black p-1 rounded-2xl border border-electric-cyan/30 shadow-[0_0_30px_rgba(0,255,255,0.05)]"
          >
            <div className="bg-charcoal/80 rounded-[14px] p-6 md:p-10 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <Tag className="text-electric-cyan shrink-0" size={24} />
                <h2 className="text-2xl md:text-3xl font-bold text-white">Service Booking</h2>
              </div>
              
              <p className="text-gray-400 text-sm md:text-base mb-8">
                Ready to get started? Book your service online or reach out for a custom quote.
                {service.startingPrice && " Final cost may vary based on specific requirements."}
              </p>

              <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-deep-black/50 p-6 md:p-8 rounded-xl border border-white/5">
                <div>
                  {service.startingPrice && (
                    <>
                      <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2 text-center md:text-left">
                        Starting From
                      </p>
                      <div className="flex items-baseline justify-center md:justify-start gap-1">
                        <span className="text-4xl md:text-5xl font-black text-electric-cyan drop-shadow-lg">
                          {service.startingPrice}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-2 text-center md:text-left">
                        + Materials & Taxes (if applicable)
                      </p>
                    </>
                  )}
                </div>

                <div className="w-full md:w-auto flex flex-col items-center">
                  <button 
                    onClick={handleContactClick}
                    className="w-full md:w-auto px-8 py-4 bg-electric-cyan text-deep-black font-bold rounded-xl hover:bg-white transition-all shadow-[0_0_20px_rgba(0,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transform hover:-translate-y-1"
                  >
                    Book Service Now
                  </button>
                  <div className="flex items-center gap-2 mt-3 text-gray-400 text-xs font-medium">
                    <ShieldCheck size={14} className="text-electric-cyan shrink-0" />
                    <span>Quick Response Guaranteed</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isSubmitting && !isSuccess && setIsModalOpen(false)}
              className="fixed inset-0 bg-deep-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-charcoal w-full max-w-md rounded-2xl border border-electric-cyan/30 shadow-[0_0_50px_rgba(0,255,255,0.1)] relative overflow-hidden"
              >
                {/* Header */}
                <div className="p-6 border-b border-white/5 flex justify-between items-center bg-deep-black/50">
                  <h3 className="text-xl font-bold text-white">Book: {service.title}</h3>
                  {!isSubmitting && !isSuccess && (
                    <button 
                      onClick={() => setIsModalOpen(false)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <X size={24} />
                    </button>
                  )}
                </div>

                {/* Body */}
                <div className="p-6 relative">
                  {isSuccess ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <div className="w-20 h-20 bg-electric-cyan/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-electric-cyan/20">
                        <CheckCircle className="text-electric-cyan w-10 h-10" />
                      </div>
                      <h4 className="text-2xl font-bold text-white mb-2">Booking Confirmed!</h4>
                      <p className="text-gray-400 mb-6">
                        Thank you! We have received your request and will contact you shortly to confirm the details.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-2 text-red-500">
                          <AlertCircle className="shrink-0 mt-0.5" size={16} />
                          <p className="text-sm">{error}</p>
                        </div>
                      )}
                      
                      <div className="space-y-1.5">
                        <label htmlFor="name" className="text-sm font-medium text-gray-300">Full Name *</label>
                        <input 
                          id="name" name="name" type="text" 
                          value={formData.name} onChange={handleInputChange}
                          className="w-full bg-deep-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan outline-none transition-colors"
                          placeholder="Your Name"
                          disabled={isSubmitting}
                        />
                      </div>
                      
                      <div className="space-y-1.5">
                        <label htmlFor="phone" className="text-sm font-medium text-gray-300">Mobile Number *</label>
                        <input 
                          id="phone" name="phone" type="tel" 
                          value={formData.phone} onChange={handleInputChange}
                          className="w-full bg-deep-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan outline-none transition-colors"
                          placeholder="e.g. 9876543210"
                          disabled={isSubmitting}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="address" className="text-sm font-medium text-gray-300">Full Address *</label>
                        <input 
                          id="address" name="address" type="text" 
                          value={formData.address} onChange={handleInputChange}
                          className="w-full bg-deep-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan outline-none transition-colors"
                          placeholder="Your house/flat no., society, area"
                          disabled={isSubmitting}
                        />
                      </div>

                      <Button 
                        type="submit" 
                        variant="primary" 
                        className="w-full py-6 mt-4 text-lg font-bold"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <Loader2 className="animate-spin" size={20} /> Processing...
                          </span>
                        ) : "Submit Booking"}
                      </Button>
                    </form>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
