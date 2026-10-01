'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, MessageCircleQuestion } from 'lucide-react';
import { IFAQ } from '@/models/FAQ';

interface FaqSearchAndListProps {
  initialFaqs: Partial<IFAQ>[];
}

export function FaqSearchAndList({ initialFaqs }: FaqSearchAndListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [openId, setOpenId] = useState<string | null>(null);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(initialFaqs.map(f => f.category).filter(Boolean) as string[]);
    return ['All', ...Array.from(cats)];
  }, [initialFaqs]);

  // Filter FAQs based on search and category
  const filteredFaqs = useMemo(() => {
    return initialFaqs.filter((faq) => {
      const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        (faq.question?.toLowerCase().includes(searchLower) || false) || 
        (faq.answer?.toLowerCase().includes(searchLower) || false);
        
      return matchesCategory && matchesSearch;
    });
  }, [initialFaqs, searchQuery, activeCategory]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      
      {/* Search and Filters */}
      <div className="mb-10 space-y-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search for questions or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-charcoal border border-white/10 rounded-xl py-3 md:py-4 pl-12 pr-4 text-sm md:text-base text-white focus:outline-none focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan transition-all"
            aria-label="Search FAQs"
          />
        </div>

        {categories.length > 2 && (
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setOpenId(null);
                }}
                className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium transition-colors border ${
                  activeCategory === cat 
                    ? 'bg-electric-cyan text-deep-black border-electric-cyan' 
                    : 'bg-charcoal text-gray-300 border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              // Ensure we have a unique ID since this is Partial<IFAQ> and might lack _id if mocked
              const id = faq._id?.toString() || `faq-${index}`;
              const isOpen = openId === id;

              return (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="bg-charcoal border border-white/5 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : id)}
                    className="w-full flex items-center justify-between p-4 md:p-6 text-left focus:outline-none focus-visible:bg-white/5 transition-colors group hover:bg-white/5"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base md:text-lg font-bold text-white pr-4 group-hover:text-electric-cyan transition-colors">
                      {faq.question}
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'bg-electric-cyan text-deep-black rotate-180' : 'bg-white/5 text-gray-400 group-hover:bg-electric-cyan/20 group-hover:text-electric-cyan'}`}>
                      <ChevronDown size={18} />
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="px-4 pb-4 md:px-6 md:pb-6 text-sm md:text-base text-gray-300 leading-relaxed border-t border-white/5 pt-3 md:pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 bg-charcoal rounded-2xl border border-white/5"
            >
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircleQuestion className="text-gray-400" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No results found</h3>
              <p className="text-gray-400">
                We couldn't find any FAQs matching "{searchQuery}".
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                }}
                className="mt-6 text-electric-cyan hover:text-white transition-colors underline underline-offset-4"
              >
                Clear search and view all
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
