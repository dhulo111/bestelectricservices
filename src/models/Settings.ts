import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ISettings extends Document {
  // Company
  companyName: string;
  tagline: string;
  phone: string;
  alternatePhone: string;
  email: string;
  whatsapp: string;
  address: string;
  workingHours: string;
  
  // Business
  emergencyServiceToggle: boolean;
  serviceAreas: string[];
  socialMediaLinks: {
    facebook: string;
    instagram: string;
    twitter: string;
    linkedin: string;
  };
  
  // SEO
  defaultTitle: string;
  defaultDescription: string;
  keywords: string[];
  ogImage: string;
  canonicalSiteUrl: string;
  
  // Footer
  companyShortDescription: string;
  copyrightText: string;
}

const urlRegex = /^(https?:\/\/)?([\w\d\-_]+\.)+[\w\d\-_]+(\/.*)?$/i;

const SettingsSchema: Schema = new Schema({
  companyName: { type: String, default: 'Best Electric Services' },
  tagline: { type: String, default: 'Professional Electrical Solutions' },
  phone: { type: String, default: '' },
  alternatePhone: { type: String, default: '' },
  email: { type: String, default: '' },
  whatsapp: { type: String, default: '' },
  address: { type: String, default: '' },
  workingHours: { type: String, default: 'Mon - Sat: 9:00 AM - 8:00 PM' },
  
  emergencyServiceToggle: { type: Boolean, default: false },
  serviceAreas: { type: [String], default: [] },
  socialMediaLinks: {
    facebook: { type: String, default: '', match: [urlRegex, 'Invalid URL'] },
    instagram: { type: String, default: '', match: [urlRegex, 'Invalid URL'] },
    twitter: { type: String, default: '', match: [urlRegex, 'Invalid URL'] },
    linkedin: { type: String, default: '', match: [urlRegex, 'Invalid URL'] },
  },
  
  defaultTitle: { type: String, default: 'Best Electric Services | Expert Electricians' },
  defaultDescription: { type: String, default: 'Professional electrical installation and repair services.' },
  keywords: { type: [String], default: [] },
  ogImage: { type: String, default: '', match: [urlRegex, 'Invalid URL'] },
  canonicalSiteUrl: { type: String, default: '', match: [urlRegex, 'Invalid URL'] },
  
  companyShortDescription: { type: String, default: 'Providing top-notch electrical services for residential and commercial properties.' },
  copyrightText: { type: String, default: '© {year} Best Electric Services. All rights reserved.' },
}, { timestamps: true });

// We use a specific ID to ensure a singleton pattern.
// In our controllers, we will strictly use this _id (e.g. 'global_settings') or findOne().
// Here, we'll just rely on `Settings.findOne()` without arguments to get the only document.

export const Settings: Model<ISettings> = mongoose.models.Settings || mongoose.model<ISettings>('Settings', SettingsSchema);
