import { notFound } from 'next/navigation';
import { ServiceForm } from '@/components/admin/services/ServiceForm';
import { Service } from '@/models/Service';
import connectToDatabase from '@/lib/mongodb/db';
import mongoose from 'mongoose';

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    notFound();
  }

  await connectToDatabase();
  const service = await Service.findById(id).lean();

  if (!service) {
    notFound();
  }

  // Convert MongoDB ObjectIDs and Dates to strings for the client component
  const initialData = JSON.parse(JSON.stringify(service));

  return <ServiceForm initialData={initialData} isEdit={true} />;
}
