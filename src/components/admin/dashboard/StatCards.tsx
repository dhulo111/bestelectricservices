'use client';

import { 
  Wrench, 
  CheckCircle, 
  MessageSquareWarning, 
  Clock, 
  Calendar, 
  CalendarDays 
} from 'lucide-react';
import { motion } from 'framer-motion';

interface StatCardsProps {
  metrics: {
    totalServices: number;
    activeServices: number;
    newInquiries: number;
    pendingInquiries: number;
    inquiriesToday: number;
    inquiriesThisMonth: number;
  };
}

export function StatCards({ metrics }: StatCardsProps) {
  const cards = [
    { title: 'Total Services', value: metrics.totalServices, icon: Wrench, color: 'text-gray-400' },
    { title: 'Active Services', value: metrics.activeServices, icon: CheckCircle, color: 'text-electric-cyan' },
    { title: 'New Inquiries', value: metrics.newInquiries, icon: MessageSquareWarning, color: 'text-red-400' },
    { title: 'Pending Inquiries', value: metrics.pendingInquiries, icon: Clock, color: 'text-yellow-400' },
    { title: 'Inquiries Today', value: metrics.inquiriesToday, icon: Calendar, color: 'text-blue-400' },
    { title: 'Inquiries This Month', value: metrics.inquiriesThisMonth, icon: CalendarDays, color: 'text-purple-400' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="bg-charcoal/50 backdrop-blur-sm p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 font-medium mb-1">{card.title}</p>
                <h3 className="text-3xl font-bold text-white">{card.value}</h3>
              </div>
              <div className={`p-4 rounded-xl bg-white/5 ${card.color}`}>
                <Icon size={24} />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
