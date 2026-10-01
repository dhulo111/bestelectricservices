import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ITestimonial extends Document {
  clientName: string;
  clientRole?: string;
  avatar?: string;
  content: string;
  rating: number;
  featured: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const testimonialSchema = new Schema<ITestimonial>(
  {
    clientName: { type: String, required: true },
    clientRole: { type: String },
    avatar: { type: String },
    content: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    featured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Testimonial: Model<ITestimonial> = mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', testimonialSchema);
