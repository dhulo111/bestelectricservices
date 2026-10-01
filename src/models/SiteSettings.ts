import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ISiteSettings extends Document {
  companyName: string;
  logo: string;
  phone: string;
  alternatePhone?: string;
  email: string;
  whatsapp?: string;
  address: string;
  workingHours: string;
  emergencyService: boolean;
  serviceAreas: string[];
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  homepageSEO: {
    title: string;
    description: string;
    keywords: string;
  };
  defaultSEO: {
    title: string;
    description: string;
    keywords: string;
  };
  footerContent: string;
  createdAt: Date;
  updatedAt: Date;
}

const siteSettingsSchema = new Schema<ISiteSettings>(
  {
    companyName: { type: String, required: true },
    logo: { type: String, required: true },
    phone: { type: String, required: true },
    alternatePhone: { type: String },
    email: { type: String, required: true },
    whatsapp: { type: String },
    address: { type: String, required: true },
    workingHours: { type: String, required: true },
    emergencyService: { type: Boolean, default: false },
    serviceAreas: [{ type: String }],
    socialLinks: {
      facebook: { type: String },
      twitter: { type: String },
      instagram: { type: String },
      linkedin: { type: String },
    },
    homepageSEO: {
      title: { type: String },
      description: { type: String },
      keywords: { type: String },
    },
    defaultSEO: {
      title: { type: String },
      description: { type: String },
      keywords: { type: String },
    },
    footerContent: { type: String },
  },
  { timestamps: true }
);

export const SiteSettings: Model<ISiteSettings> = mongoose.models.SiteSettings || mongoose.model<ISiteSettings>('SiteSettings', siteSettingsSchema);
