import mongoose, { Document, Model, Schema } from 'mongoose';
import { InquiryStatus, InquiryPriority } from '@/types/inquiry';

export interface IInquiry extends Document {
  inquiryType: string;
  name: string;
  phone: string;
  email?: string;
  serviceId?: mongoose.Types.ObjectId;
  serviceNameSnapshot?: string;
  address?: string;
  preferredContactMethod?: string;
  message?: string;
  preferredDate?: string;
  preferredTime?: string;
  status: InquiryStatus;
  priority: InquiryPriority;
  adminNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const inquirySchema = new Schema<IInquiry>(
  {
    inquiryType: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    serviceId: { type: Schema.Types.ObjectId, ref: 'Service' },
    serviceNameSnapshot: { type: String },
    address: { type: String },
    preferredContactMethod: { type: String, default: 'PHONE' },
    message: { type: String },
    preferredDate: { type: String },
    preferredTime: { type: String },
    status: { type: String, enum: Object.values(InquiryStatus), default: InquiryStatus.NEW, index: true },
    priority: { type: String, enum: Object.values(InquiryPriority), default: InquiryPriority.NORMAL },
    adminNotes: { type: String },
  },
  { timestamps: true }
);

// Index for sorting inquiries by newest
inquirySchema.index({ createdAt: -1 });

export const Inquiry: Model<IInquiry> = mongoose.models.Inquiry || mongoose.model<IInquiry>('Inquiry', inquirySchema);
