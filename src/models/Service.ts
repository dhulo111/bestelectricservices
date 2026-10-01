import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IService extends Document {
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  category: string;
  icon: string;
  coverImage: string;
  gallery: string[];
  features: string[];
  benefits: string[];
  process: { step: number; title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  serviceAreas: string[];
  startingPrice?: string;
  featured: boolean;
  isActive: boolean;
  displayOrder: number;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  createdAt: Date;
  updatedAt: Date;
}

const serviceSchema = new Schema<IService>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true, index: true },
    icon: { type: String, required: true },
    coverImage: { type: String, required: true },
    gallery: [{ type: String }],
    features: [{ type: String }],
    benefits: [{ type: String }],
    process: [
      {
        step: { type: Number },
        title: { type: String },
        description: { type: String },
      },
    ],
    faqs: [
      {
        question: { type: String },
        answer: { type: String },
      },
    ],
    serviceAreas: [{ type: String }],
    startingPrice: { type: String },
    featured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true, index: true },
    displayOrder: { type: Number, default: 0 },
    seoTitle: { type: String },
    seoDescription: { type: String },
    seoKeywords: { type: String },
  },
  { timestamps: true }
);

export const Service: Model<IService> = mongoose.models.Service || mongoose.model<IService>('Service', serviceSchema);
