'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { StatusBadge, PriorityBadge } from '@/components/admin/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Mail, Phone, MessageSquare, Save, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';
import { InquiryStatus, InquiryPriority } from '@/types/inquiry';

export function InquiryDetailView({ initialData }: { initialData: any }) {
  const [inquiry, setInquiry] = useState(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [notes, setNotes] = useState(initialData.adminNotes || '');
  const router = useRouter();

  const handleUpdate = async (updates: any) => {
    setIsSaving(true);
    try {
      const res = await fetch(`/api/admin/inquiries/${inquiry._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      if (!res.ok) throw new Error('Failed to update inquiry');
      
      const updated = await res.json();
      setInquiry(updated);
      router.refresh();
    } catch (error) {
      console.error(error);
      alert('Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveNotes = () => {
    if (notes !== inquiry.adminNotes) {
      handleUpdate({ adminNotes: notes });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/inquiries">
            <Button variant="secondary" className="p-2 h-auto">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">Inquiry Details</h1>
            <p className="text-sm text-gray-400">
              Submitted on {format(new Date(inquiry.createdAt), 'MMMM d, yyyy h:mm a')}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={inquiry.status} />
          <PriorityBadge priority={inquiry.priority} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Customer & Request Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-charcoal border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4 border-b border-white/10 pb-4">Customer Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-400 mb-1">Full Name</p>
                <p className="text-white font-medium">{inquiry.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Email Address</p>
                <p className="text-white">{inquiry.email || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Phone Number</p>
                <p className="text-white">{inquiry.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Preferred Contact</p>
                <p className="text-white capitalize">{inquiry.preferredContactMethod.toLowerCase()}</p>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <a href={`tel:${inquiry.phone}`}>
                <Button variant="secondary" className="flex items-center gap-2 border-white/20 hover:bg-white/10 text-white">
                  <Phone size={16} /> Call
                </Button>
              </a>
              <a href={`https://wa.me/${inquiry.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" className="flex items-center gap-2 border-green-500/30 hover:bg-green-500/10 text-green-400">
                  <MessageSquare size={16} /> WhatsApp
                </Button>
              </a>
              {inquiry.email && (
                <a href={`mailto:${inquiry.email}`}>
                  <Button variant="secondary" className="flex items-center gap-2 border-blue-500/30 hover:bg-blue-500/10 text-blue-400">
                    <Mail size={16} /> Email
                  </Button>
                </a>
              )}
            </div>
          </div>

          <div className="bg-charcoal border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4 border-b border-white/10 pb-4">Request Details</h2>
            
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-400 mb-1">Inquiry Type</p>
                <p className="text-white font-medium">
                  {inquiry.inquiryType === 'SERVICE' ? 'Service Request' : 'General Question'}
                </p>
              </div>

              {inquiry.inquiryType === 'SERVICE' && (
                <div>
                  <p className="text-sm text-gray-400 mb-1">Service Requested</p>
                  <p className="text-electric-cyan font-medium">{inquiry.serviceNameSnapshot}</p>
                </div>
              )}

              {inquiry.address && (
                <div>
                  <p className="text-sm text-gray-400 mb-1 flex items-center gap-1">
                    <MapPin size={14} /> Service Address
                  </p>
                  <p className="text-white">{inquiry.address}</p>
                </div>
              )}

              {(inquiry.preferredDate || inquiry.preferredTime) && (
                <div className="flex flex-wrap gap-6">
                  {inquiry.preferredDate && (
                    <div>
                      <p className="text-sm text-gray-400 mb-1 flex items-center gap-1">
                        <Calendar size={14} /> Preferred Date
                      </p>
                      <p className="text-white">{format(new Date(inquiry.preferredDate), 'MMM d, yyyy')}</p>
                    </div>
                  )}
                  {inquiry.preferredTime && (
                    <div>
                      <p className="text-sm text-gray-400 mb-1 flex items-center gap-1">
                        <Clock size={14} /> Preferred Time
                      </p>
                      <p className="text-white">{inquiry.preferredTime}</p>
                    </div>
                  )}
                </div>
              )}

              {inquiry.message && (
                <div>
                  <p className="text-sm text-gray-400 mb-2">Message / Requirements</p>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-gray-200 whitespace-pre-wrap">
                    {inquiry.message}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Admin Controls */}
        <div className="space-y-6">
          <div className="bg-charcoal border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4 border-b border-white/10 pb-4">Status & Priority</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Update Status</label>
                <div className="flex flex-wrap gap-2">
                  {Object.values(InquiryStatus).map((status) => (
                    <button
                      key={status}
                      onClick={() => handleUpdate({ status })}
                      disabled={isSaving || inquiry.status === status}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                        inquiry.status === status
                          ? 'bg-electric-cyan text-black border-electric-cyan'
                          : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      {status.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2 mt-6">Update Priority</label>
                <div className="flex flex-wrap gap-2">
                  {Object.values(InquiryPriority).map((priority) => (
                    <button
                      key={priority}
                      onClick={() => handleUpdate({ priority })}
                      disabled={isSaving || inquiry.priority === priority}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                        inquiry.priority === priority
                          ? 'bg-electric-cyan text-black border-electric-cyan'
                          : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      {priority}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-charcoal border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4 border-b border-white/10 pb-4">Admin Notes</h2>
            <p className="text-xs text-gray-400 mb-3">These notes are strictly internal and only visible to administrators.</p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes about this customer or service request..."
              className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-electric-cyan resize-none mb-3"
            />
            <Button 
              onClick={handleSaveNotes} 
              disabled={isSaving || notes === inquiry.adminNotes}
              variant="primary" 
              className="w-full flex items-center justify-center gap-2"
            >
              <Save size={16} /> {isSaving ? 'Saving...' : 'Save Notes'}
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}
