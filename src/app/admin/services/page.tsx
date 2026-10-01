'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ServiceTable } from '@/components/admin/services/ServiceTable';

export default function AdminServicesPage() {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append('q', searchQuery);
      if (categoryFilter) params.append('category', categoryFilter);
      if (statusFilter !== '') params.append('isActive', statusFilter);

      const res = await fetch(`/api/admin/services?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch services');
      
      const data = await res.json();
      setServices(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Debounce search
    const timer = setTimeout(() => {
      fetchServices();
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, categoryFilter, statusFilter]);

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Manage Services</h1>
          <p className="text-sm text-gray-400 mt-1">Add, edit, or archive your electrical services.</p>
        </div>
        <Link href="/admin/services/new">
          <Button variant="primary" className="flex items-center gap-2">
            <Plus size={18} /> New Service
          </Button>
        </Link>
      </div>

      {/* Filters Bar */}
      <div className="bg-charcoal border border-white/10 rounded-2xl p-4 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by title or slug..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-electric-cyan/50"
          />
        </div>
        <select 
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-electric-cyan/50 min-w-[160px]"
        >
          <option value="">All Categories</option>
          <option value="Installation">Installation</option>
          <option value="Repair">Repair</option>
          <option value="Wiring">Wiring</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Specialty">Specialty</option>
        </select>
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-electric-cyan/50 min-w-[140px]"
        >
          <option value="">All Statuses</option>
          <option value="true">Active Only</option>
          <option value="false">Archived Only</option>
        </select>
      </div>

      {error ? (
        <div className="p-6 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500">
          <p>{error}</p>
          <Button onClick={fetchServices} variant="primary" className="mt-4 text-sm">Retry</Button>
        </div>
      ) : isLoading ? (
        <div className="space-y-4 animate-pulse">
          <div className="h-12 bg-white/5 rounded-xl border border-white/10" />
          {[1,2,3,4].map(i => (
            <div key={i} className="h-20 bg-white/5 rounded-xl border border-white/10" />
          ))}
        </div>
      ) : (
        <ServiceTable services={services} onRefresh={fetchServices} />
      )}
    </div>
  );
}
