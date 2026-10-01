import { notFound } from 'next/navigation';
import connectToDatabase from '@/lib/mongodb/db';
import { Inquiry } from '@/models/Inquiry';
import mongoose from 'mongoose';
import { InquiryDetailView } from '@/components/admin/inquiries/InquiryDetailView';

export default async function InquiryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    notFound();
  }

  await connectToDatabase();
  const inquiry = await Inquiry.findById(id).lean();

  if (!inquiry) {
    notFound();
  }

  // Serialize to remove Mongoose ObjectIds / Dates
  const initialData = JSON.parse(JSON.stringify(inquiry));

  return <InquiryDetailView initialData={initialData} />;
}
