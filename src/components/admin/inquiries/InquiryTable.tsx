import React, { Fragment } from 'react';
import Link from 'next/link';
import { Eye, Mail, Phone, MessageSquare } from 'lucide-react';
import { StatusBadge, PriorityBadge } from '@/components/admin/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

interface InquiryTableProps {
  inquiries: any[];
}

export function InquiryTable({ inquiries }: InquiryTableProps) {
  if (!inquiries.length) {
    return (
      <div className="bg-charcoal border border-white/10 rounded-2xl p-12 text-center">
        <h3 className="text-xl font-semibold text-white mb-2">No inquiries found</h3>
        <p className="text-gray-400">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="bg-charcoal border border-white/10 rounded-2xl overflow-hidden">
      <div className="overflow-x-hidden md:overflow-x-auto">
        <table className="w-full text-left text-sm block md:table">
          <thead className="hidden md:table-header-group bg-white/5 text-gray-300 border-b border-white/10">
            <tr>
              <th className="px-6 py-4 font-medium">Customer</th>
              <th className="px-6 py-4 font-medium">Service / Subject</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Status & Priority</th>
              <th className="px-6 py-4 font-medium">Contact</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group divide-y-0 md:divide-y divide-white/5 p-4 md:p-0 space-y-4 md:space-y-0">
            {inquiries.map((inq) => (
              <Fragment key={inq._id}>
                {/* Premium Mobile Card Layout */}
                <tr className="md:hidden block bg-white/[0.03] border border-white/10 rounded-2xl p-4 shadow-lg w-full mb-4">
                  <td className="block w-full">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="font-bold text-white text-[15px] leading-tight">{inq.name}</div>
                        <div className="text-[12px] text-electric-cyan font-medium mt-1">{inq.phone}</div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-[11px] text-gray-300 font-medium bg-white/5 px-2.5 py-1 rounded-md border border-white/5 flex items-center gap-1">
                          {format(new Date(inq.createdAt), 'MMM d, yy')}
                        </div>
                        <div className="text-[10px] text-gray-500 mt-1.5 font-medium tracking-wide">{format(new Date(inq.createdAt), 'h:mm a')}</div>
                      </div>
                    </div>
                    
                    {/* Stats/Status Inner Card */}
                    <div className="bg-black/20 border border-white/5 rounded-xl p-3 mb-4">
                       <div className="flex items-center justify-between mb-2.5">
                         <div className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">Service Required</div>
                         <div className="flex gap-1.5">
                            <PriorityBadge priority={inq.priority} />
                            <StatusBadge status={inq.status} />
                         </div>
                       </div>
                       <div className="text-[13px] font-medium text-white truncate flex items-center gap-2">
                         {inq.inquiryType === 'SERVICE' ? (
                           <>
                             <div className="w-1.5 h-1.5 rounded-full bg-electric-cyan shrink-0"></div>
                             {inq.serviceNameSnapshot || 'Specific Service'}
                           </>
                         ) : (
                           <>
                             <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0"></div>
                             General Inquiry
                           </>
                         )}
                       </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <a href={`tel:${inq.phone}`} className="flex-1 flex items-center justify-center gap-2 py-2.5 text-[11px] font-semibold tracking-wide text-electric-cyan bg-electric-cyan/10 hover:bg-electric-cyan/20 rounded-xl transition-colors">
                        <Phone size={15} strokeWidth={2.5} /> Call
                      </a>
                      <a href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2.5 text-[11px] font-semibold tracking-wide text-green-500 bg-green-500/10 hover:bg-green-500/20 rounded-xl transition-colors">
                        <MessageSquare size={15} strokeWidth={2.5} /> Chat
                      </a>
                      <Link href={`/admin/inquiries/${inq._id}`} className="flex-1">
                        <Button variant="secondary" className="w-full flex items-center justify-center gap-2 text-[11px] font-semibold tracking-wide py-2.5 h-auto bg-white/10 hover:bg-white/20 rounded-xl border-0">
                          <Eye size={15} strokeWidth={2.5} /> Details
                        </Button>
                      </Link>
                    </div>
                  </td>
                </tr>

                {/* Desktop Table Row */}
                <tr className="hidden md:table-row hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-white">{inq.name}</div>
                    <div className="text-xs text-gray-400 mt-1">{inq.email || 'No email provided'}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-200">
                      {inq.inquiryType === 'SERVICE' ? (
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-electric-cyan"></span>
                          {inq.serviceNameSnapshot || 'Specific Service'}
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-gray-500"></span>
                          General Inquiry
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400">
                    {format(new Date(inq.createdAt), 'MMM d, yyyy')}
                    <div className="text-xs">{format(new Date(inq.createdAt), 'h:mm a')}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-2 items-start">
                      <StatusBadge status={inq.status} />
                      <PriorityBadge priority={inq.priority} />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <a href={`tel:${inq.phone}`} className="p-2 bg-white/5 hover:bg-electric-cyan/20 hover:text-electric-cyan rounded-lg transition-colors" title="Call">
                        <Phone size={16} />
                      </a>
                      <a href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-green-500/20 hover:text-green-500 rounded-lg transition-colors" title="WhatsApp">
                        <MessageSquare size={16} />
                      </a>
                      {inq.email && (
                        <a href={`mailto:${inq.email}`} className="p-2 bg-white/5 hover:bg-blue-500/20 hover:text-blue-500 rounded-lg transition-colors" title="Email">
                          <Mail size={16} />
                        </a>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/admin/inquiries/${inq._id}`}>
                      <Button variant="secondary" className="text-xs py-1.5 h-auto">
                        <Eye size={14} className="mr-2" /> View Details
                      </Button>
                    </Link>
                  </td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
