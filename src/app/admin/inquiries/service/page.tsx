'use client';

import { useEffect, useState, useCallback } from 'react';
import { InquiryTable } from '@/components/admin/inquiries/InquiryTable';
import { Search } from 'lucide-react';
import { InquiryStatus, InquiryPriority } from '@/types/inquiry';
import { Button } from '@/components/ui/button';

export default function AdminInquiriesPage() {
  const type = 'service';
  const inquiryType = 'SERVICE_REQUEST';
  const pageTitle = 'Service Bookings';
  const pageDesc = 'Manage service bookings from customers.';

  const [inquiries, setInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Pagination & Filters
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  const fetchInquiries = useCallback(async () => {
    setIsLoading(true);
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('page', page.toString());
      queryParams.append('limit', '10');
      queryParams.append('inquiryType', inquiryType);
      if (searchQuery) queryParams.append('search', searchQuery);
      if (statusFilter) queryParams.append('status', statusFilter);
      if (priorityFilter) queryParams.append('priority', priorityFilter);

      const res = await fetch(`/api/admin/inquiries?${queryParams.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch inquiries');
      
      const data = await res.json();
      setInquiries(data.inquiries);
      setTotalPages(data.pagination.totalPages);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [page, searchQuery, statusFilter, priorityFilter, inquiryType]);

  useEffect(() => {
    // Debounce fetch when typing in search
    const timer = setTimeout(() => {
      fetchInquiries();
    }, 300);
    return () => clearTimeout(timer);
  }, [fetchInquiries]);

  // Reset page to 1 when filters change
  const handleFilterChange = (setter: any) => (e: any) => {
    setter(e.target.value);
    setPage(1);
  };

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-white">{pageTitle}</h1>
        <p className="text-sm text-gray-400 mt-1">{pageDesc}</p>
      </div>

      {/* Filters Bar */}
      <div className="bg-charcoal border border-white/10 rounded-2xl p-4 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name, email, or phone..." 
            value={searchQuery}
            onChange={handleFilterChange(setSearchQuery)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-electric-cyan/50"
          />
        </div>
        <select 
          value={statusFilter}
          onChange={handleFilterChange(setStatusFilter)}
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-electric-cyan/50 min-w-[160px]"
        >
          <option value="">All Statuses</option>
          {Object.values(InquiryStatus).map(status => (
            <option key={status} value={status}>{status.replace('_', ' ')}</option>
          ))}
        </select>
        <select 
          value={priorityFilter}
          onChange={handleFilterChange(setPriorityFilter)}
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-electric-cyan/50 min-w-[140px]"
        >
          <option value="">All Priorities</option>
          {Object.values(InquiryPriority).map(priority => (
            <option key={priority} value={priority}>{priority}</option>
          ))}
        </select>
      </div>

      {error ? (
        <div className="p-6 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500">
          <p>{error}</p>
          <Button onClick={fetchInquiries} variant="primary" className="mt-4 text-sm">Retry</Button>
        </div>
      ) : isLoading ? (
        <div className="space-y-4 animate-pulse">
          <div className="h-12 bg-white/5 rounded-xl border border-white/10" />
          {[1,2,3,4,5].map(i => (
            <div key={i} className="h-16 bg-white/5 rounded-xl border border-white/10" />
          ))}
        </div>
      ) : (
        <>
          <InquiryTable inquiries={inquiries} />
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-6">
              <Button 
                variant="secondary" 
                disabled={page === 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
              >
                Previous
              </Button>
              <span className="text-sm text-gray-400">
                Page {page} of {totalPages}
              </span>
              <Button 
                variant="secondary" 
                disabled={page === totalPages}
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
