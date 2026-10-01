'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Save, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function SettingsPage() {
  const [formData, setFormData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then(res => res.json())
      .then(data => {
        // Transform serviceAreas array into comma separated string for textarea
        if (data.serviceAreas && Array.isArray(data.serviceAreas)) {
          data.serviceAreasStr = data.serviceAreas.join(', ');
        } else {
          data.serviceAreasStr = '';
        }
        setFormData(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setMessage({ type: 'error', text: 'Failed to load settings.' });
        setIsLoading(false);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (name.startsWith('social_')) {
      const platform = name.split('_')[1];
      setFormData((prev: any) => ({
        ...prev,
        socialMediaLinks: {
          ...prev.socialMediaLinks,
          [platform]: value
        }
      }));
      return;
    }

    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev: any) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      const payload = { ...formData };
      
      // Process serviceAreasStr back into an array
      if (payload.serviceAreasStr !== undefined) {
        payload.serviceAreas = payload.serviceAreasStr
          .split(',')
          .map((s: string) => s.trim())
          .filter((s: string) => s.length > 0);
        delete payload.serviceAreasStr;
      }

      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.details || 'Failed to save settings');
      }

      setMessage({ type: 'success', text: 'Settings saved successfully.' });
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(null), 3000);
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="text-white">Loading settings...</div>;
  }

  return (
    <div className="max-w-4xl pb-24">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Global Settings</h1>
        <p className="text-sm text-gray-400 mt-1">Manage public-facing information and SEO metadata.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Company Settings */}
        <section className="bg-charcoal border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-6 border-b border-white/10 pb-4">Company Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Company Name</label>
              <input type="text" name="companyName" value={formData?.companyName || ''} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-electric-cyan" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Tagline</label>
              <input type="text" name="tagline" value={formData?.tagline || ''} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-electric-cyan" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Primary Phone</label>
              <input type="text" name="phone" value={formData?.phone || ''} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-electric-cyan" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Alternate Phone</label>
              <input type="text" name="alternatePhone" value={formData?.alternatePhone || ''} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-electric-cyan" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Email Address</label>
              <input type="email" name="email" value={formData?.email || ''} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-electric-cyan" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">WhatsApp Number (e.g. 919876543210)</label>
              <input type="text" name="whatsapp" value={formData?.whatsapp || ''} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-electric-cyan" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-400 mb-2">Office Address</label>
              <textarea name="address" value={formData?.address || ''} onChange={handleChange} rows={2} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-electric-cyan resize-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-400 mb-2">Working Hours</label>
              <input type="text" name="workingHours" value={formData?.workingHours || ''} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-electric-cyan" />
            </div>
          </div>
        </section>

        {/* Business Operations */}
        <section className="bg-charcoal border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-6 border-b border-white/10 pb-4">Business Operations</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
              <div>
                <h3 className="text-white font-medium">Emergency Service Banner</h3>
                <p className="text-sm text-gray-400 mt-1">Toggle the 24/7 emergency service banner on the public site.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" name="emergencyServiceToggle" checked={formData?.emergencyServiceToggle || false} onChange={handleChange} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-electric-cyan"></div>
              </label>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Service Areas (Comma separated)</label>
              <textarea name="serviceAreasStr" value={formData?.serviceAreasStr || ''} onChange={handleChange} rows={2} placeholder="e.g. Mumbai, Navi Mumbai, Thane" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-electric-cyan resize-none" />
            </div>
          </div>
        </section>

        {/* Social Media */}
        <section className="bg-charcoal border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-6 border-b border-white/10 pb-4">Social Media Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Facebook URL</label>
              <input type="url" name="social_facebook" value={formData?.socialMediaLinks?.facebook || ''} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-electric-cyan" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Instagram URL</label>
              <input type="url" name="social_instagram" value={formData?.socialMediaLinks?.instagram || ''} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-electric-cyan" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Twitter / X URL</label>
              <input type="url" name="social_twitter" value={formData?.socialMediaLinks?.twitter || ''} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-electric-cyan" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">LinkedIn URL</label>
              <input type="url" name="social_linkedin" value={formData?.socialMediaLinks?.linkedin || ''} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-electric-cyan" />
            </div>
          </div>
        </section>

        {/* SEO */}
        <section className="bg-charcoal border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-6 border-b border-white/10 pb-4">SEO Defaults</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Default Meta Title</label>
              <input type="text" name="defaultTitle" value={formData?.defaultTitle || ''} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-electric-cyan" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Default Meta Description</label>
              <textarea name="defaultDescription" value={formData?.defaultDescription || ''} onChange={handleChange} required rows={2} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-electric-cyan resize-none" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Canonical Site URL</label>
              <input type="url" name="canonicalSiteUrl" value={formData?.canonicalSiteUrl || ''} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-electric-cyan" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Default OG Image URL</label>
              <input type="url" name="ogImage" value={formData?.ogImage || ''} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-electric-cyan" />
            </div>
          </div>
        </section>

        {/* Footer */}
        <section className="bg-charcoal border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-6 border-b border-white/10 pb-4">Footer Content</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Footer Company Description</label>
              <textarea name="companyShortDescription" value={formData?.companyShortDescription || ''} onChange={handleChange} rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-electric-cyan resize-none" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Copyright Text</label>
              <input type="text" name="copyrightText" value={formData?.copyrightText || ''} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-electric-cyan" />
              <p className="text-xs text-gray-500 mt-1">Use `&#123;year&#125;` to dynamically insert the current year.</p>
            </div>
          </div>
        </section>

        {/* Floating Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 md:left-64 bg-charcoal/90 backdrop-blur-md border-t border-white/10 p-4 flex items-center justify-between z-40">
          <div>
            {message && (
              <div className={`flex items-center gap-2 text-sm ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                {message.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                {message.text}
              </div>
            )}
          </div>
          <Button type="submit" disabled={isSaving} variant="primary" className="flex items-center gap-2 px-8">
            <Save size={18} />
            {isSaving ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      </form>
    </div>
  );
}
