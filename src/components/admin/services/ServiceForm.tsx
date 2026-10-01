'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, ArrowLeft, GripVertical, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { ImageUpload } from '@/components/ui/ImageUpload';

interface ServiceFormProps {
  initialData?: any;
  isEdit?: boolean;
}

export function ServiceForm({ initialData, isEdit = false }: ServiceFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    category: initialData?.category || '',
    shortDescription: initialData?.shortDescription || '',
    description: initialData?.description || '',
    icon: initialData?.icon || '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>',
    coverImage: initialData?.coverImage || '',
    startingPrice: initialData?.startingPrice || '',
    featured: initialData?.featured || false,
    isActive: initialData?.isActive ?? true,
    displayOrder: initialData?.displayOrder || 0,
    seoTitle: initialData?.seoTitle || '',
    seoDescription: initialData?.seoDescription || '',
    seoKeywords: initialData?.seoKeywords || '',
  });

  const [gallery, setGallery] = useState<string[]>(initialData?.gallery || []);
  const [features, setFeatures] = useState<string[]>(initialData?.features || []);
  const [benefits, setBenefits] = useState<string[]>(initialData?.benefits || []);
  const [serviceAreas, setServiceAreas] = useState<string[]>(initialData?.serviceAreas || []);
  const [processSteps, setProcessSteps] = useState<{step: number; title: string; description: string}[]>(
    initialData?.process || []
  );
  const [faqs, setFaqs] = useState<{question: string; answer: string}[]>(
    initialData?.faqs || []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const generateSlug = () => {
    if (!formData.title) return;
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    setFormData(prev => ({ ...prev, slug }));
  };

  // Generic String Array Handlers
  const addStringItem = (setter: React.Dispatch<React.SetStateAction<string[]>>) => setter(prev => [...prev, '']);
  const updateStringItem = (index: number, value: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => {
      const copy = [...prev];
      copy[index] = value;
      return copy;
    });
  };
  const removeStringItem = (index: number, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => prev.filter((_, i) => i !== index));
  };

  // Process Handlers
  const addProcess = () => {
    setProcessSteps(prev => [...prev, { step: prev.length + 1, title: '', description: '' }]);
  };
  const updateProcess = (index: number, field: string, value: any) => {
    setProcessSteps(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };
  const removeProcess = (index: number) => {
    setProcessSteps(prev => prev.filter((_, i) => i !== index).map((p, i) => ({ ...p, step: i + 1 })));
  };

  // FAQ Handlers
  const addFaq = () => setFaqs(prev => [...prev, { question: '', answer: '' }]);
  const updateFaq = (index: number, field: string, value: string) => {
    setFaqs(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };
  const removeFaq = (index: number) => setFaqs(prev => prev.filter((_, i) => i !== index));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const payload = {
      ...formData,
      gallery: gallery.filter(Boolean),
      features: features.filter(Boolean),
      benefits: benefits.filter(Boolean),
      serviceAreas: serviceAreas.filter(Boolean),
      process: processSteps.filter(p => p.title && p.description),
      faqs: faqs.filter(f => f.question && f.answer),
    };

    try {
      const url = isEdit ? `/api/admin/services/${initialData._id}` : '/api/admin/services';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to save service');
      }

      router.push('/admin/services');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-electric-cyan/50 focus:border-transparent transition-all";

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-20">
      
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/services">
            <button type="button" className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 transition-colors">
              <ArrowLeft size={20} />
            </button>
          </Link>
          <h1 className="text-2xl font-bold text-white">
            {isEdit ? 'Edit Service' : 'Create New Service'}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/services">
            <Button variant="secondary" type="button">Cancel</Button>
          </Link>
          <Button variant="primary" type="submit" disabled={isSubmitting} className="flex items-center gap-2">
            {isSubmitting ? 'Saving...' : <><CheckCircle2 size={18} /> Save Service</>}
          </Button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Basic Info */}
          <div className="bg-charcoal border border-white/10 rounded-2xl p-6 space-y-6">
            <h2 className="text-lg font-bold text-white border-b border-white/10 pb-4">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Service Title *</label>
                <input required type="text" name="title" value={formData.title} onChange={handleInputChange} className={inputClasses} placeholder="e.g. CCTV Installation" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Category *</label>
                <select required name="category" value={formData.category} onChange={handleInputChange} className={inputClasses}>
                  <option value="">Select Category</option>
                  <option value="Installation">Installation</option>
                  <option value="Repair">Repair</option>
                  <option value="Wiring">Wiring</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Specialty">Specialty</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-300">URL Slug *</label>
                <button type="button" onClick={generateSlug} className="text-xs text-electric-cyan hover:underline">Auto-generate from Title</button>
              </div>
              <input required type="text" name="slug" value={formData.slug} onChange={handleInputChange} className={inputClasses} placeholder="e.g. cctv-installation" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Starting Price</label>
              <input type="text" name="startingPrice" value={formData.startingPrice} onChange={handleInputChange} className={inputClasses} placeholder="e.g. ₹1,499 or Custom Quote" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Short Description *</label>
              <textarea required name="shortDescription" value={formData.shortDescription} onChange={handleInputChange} rows={2} className={inputClasses} placeholder="A brief summary for cards and lists..." />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Full Description *</label>
              <textarea required name="description" value={formData.description} onChange={handleInputChange} rows={8} className={inputClasses} placeholder="Comprehensive details about the service (HTML allowed)..." />
            </div>
          </div>

          {/* Media */}
          <div className="bg-charcoal border border-white/10 rounded-2xl p-6 space-y-6">
            <h2 className="text-lg font-bold text-white border-b border-white/10 pb-4">Media</h2>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Cover Image *</label>
              <ImageUpload
                value={formData.coverImage}
                onChange={(url) => setFormData(prev => ({ ...prev, coverImage: url }))}
                bucketName="images"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">SVG Icon Code *</label>
              <textarea required name="icon" value={formData.icon} onChange={handleInputChange} rows={3} className={`${inputClasses} font-mono text-xs`} placeholder="<svg>...</svg>" />
            </div>
          </div>

          {/* Features & Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-charcoal border border-white/10 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h2 className="text-lg font-bold text-white">Features</h2>
                <button type="button" onClick={() => addStringItem(setFeatures)} className="p-1.5 bg-electric-cyan/20 text-electric-cyan rounded-lg hover:bg-electric-cyan/30">
                  <Plus size={16} />
                </button>
              </div>
              {features.map((item, i) => (
                <div key={i} className="flex gap-2">
                  <input type="text" value={item} onChange={(e) => updateStringItem(i, e.target.value, setFeatures)} className={inputClasses} placeholder="Feature..." />
                  <button type="button" onClick={() => removeStringItem(i, setFeatures)} className="p-3 text-red-500 bg-white/5 rounded-xl hover:bg-red-500/10">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="bg-charcoal border border-white/10 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h2 className="text-lg font-bold text-white">Benefits</h2>
                <button type="button" onClick={() => addStringItem(setBenefits)} className="p-1.5 bg-electric-cyan/20 text-electric-cyan rounded-lg hover:bg-electric-cyan/30">
                  <Plus size={16} />
                </button>
              </div>
              {benefits.map((item, i) => (
                <div key={i} className="flex gap-2">
                  <input type="text" value={item} onChange={(e) => updateStringItem(i, e.target.value, setBenefits)} className={inputClasses} placeholder="Benefit..." />
                  <button type="button" onClick={() => removeStringItem(i, setBenefits)} className="p-3 text-red-500 bg-white/5 rounded-xl hover:bg-red-500/10">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Process Steps */}
          <div className="bg-charcoal border border-white/10 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-lg font-bold text-white">Service Process</h2>
              <button type="button" onClick={addProcess} className="px-3 py-1.5 bg-electric-cyan/20 text-electric-cyan rounded-lg text-sm flex items-center gap-1">
                <Plus size={14} /> Add Step
              </button>
            </div>
            <div className="space-y-4">
              {processSteps.map((step, i) => (
                <div key={i} className="flex gap-4 items-start p-4 bg-white/5 border border-white/10 rounded-xl relative group">
                  <div className="flex flex-col items-center gap-2 mt-2">
                    <GripVertical size={16} className="text-gray-600 cursor-grab" />
                    <span className="w-6 h-6 rounded-full bg-electric-cyan/20 text-electric-cyan flex items-center justify-center text-xs font-bold">{step.step}</span>
                  </div>
                  <div className="flex-1 space-y-3">
                    <input type="text" value={step.title} onChange={(e) => updateProcess(i, 'title', e.target.value)} className={inputClasses} placeholder="Step Title" />
                    <textarea value={step.description} onChange={(e) => updateProcess(i, 'description', e.target.value)} rows={2} className={inputClasses} placeholder="Step Description" />
                  </div>
                  <button type="button" onClick={() => removeProcess(i)} className="p-2 text-red-500 opacity-50 hover:opacity-100 hover:bg-red-500/10 rounded-lg absolute top-4 right-4">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div className="bg-charcoal border border-white/10 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-lg font-bold text-white">FAQs</h2>
              <button type="button" onClick={addFaq} className="px-3 py-1.5 bg-electric-cyan/20 text-electric-cyan rounded-lg text-sm flex items-center gap-1">
                <Plus size={14} /> Add FAQ
              </button>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="flex gap-4 items-start p-4 bg-white/5 border border-white/10 rounded-xl relative">
                  <div className="flex-1 space-y-3">
                    <input type="text" value={faq.question} onChange={(e) => updateFaq(i, 'question', e.target.value)} className={`${inputClasses} font-medium`} placeholder="Question?" />
                    <textarea value={faq.answer} onChange={(e) => updateFaq(i, 'answer', e.target.value)} rows={2} className={inputClasses} placeholder="Answer..." />
                  </div>
                  <button type="button" onClick={() => removeFaq(i)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg mt-1">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Sidebar Column */}
        <div className="space-y-8">
          
          {/* Status Settings */}
          <div className="bg-charcoal border border-white/10 rounded-2xl p-6 space-y-6">
            <h2 className="text-lg font-bold text-white border-b border-white/10 pb-4">Publishing Settings</h2>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-white">Active Status</div>
                <div className="text-xs text-gray-400">Visible on public site</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleInputChange} className="sr-only peer" />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-electric-cyan"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-white">Featured</div>
                <div className="text-xs text-gray-400">Show on homepage</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" name="featured" checked={formData.featured} onChange={handleInputChange} className="sr-only peer" />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
              </label>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Display Order</label>
              <input type="number" name="displayOrder" value={formData.displayOrder} onChange={handleInputChange} className={inputClasses} placeholder="0" min="0" />
              <p className="text-xs text-gray-500">Lower numbers appear first</p>
            </div>
          </div>

          {/* SEO */}
          <div className="bg-charcoal border border-white/10 rounded-2xl p-6 space-y-6">
            <h2 className="text-lg font-bold text-white border-b border-white/10 pb-4">SEO Metadata</h2>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">SEO Title</label>
              <input type="text" name="seoTitle" value={formData.seoTitle} onChange={handleInputChange} className={inputClasses} placeholder="Overrides main title for SEO" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Meta Description</label>
              <textarea name="seoDescription" value={formData.seoDescription} onChange={handleInputChange} rows={3} className={inputClasses} placeholder="150-160 characters recommended" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Keywords</label>
              <input type="text" name="seoKeywords" value={formData.seoKeywords} onChange={handleInputChange} className={inputClasses} placeholder="cctv, security, installation" />
            </div>
          </div>

          {/* Target Service Areas */}
          <div className="bg-charcoal border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-lg font-bold text-white">Specific Areas</h2>
              <button type="button" onClick={() => addStringItem(setServiceAreas)} className="p-1.5 bg-electric-cyan/20 text-electric-cyan rounded-lg hover:bg-electric-cyan/30">
                <Plus size={16} />
              </button>
            </div>
            <p className="text-xs text-gray-400 -mt-2">Leave empty to apply to all global service areas.</p>
            {serviceAreas.map((item, i) => (
              <div key={i} className="flex gap-2">
                <input type="text" value={item} onChange={(e) => updateStringItem(i, e.target.value, setServiceAreas)} className={`${inputClasses} py-2`} placeholder="e.g. Mumbai" />
                <button type="button" onClick={() => removeStringItem(i, setServiceAreas)} className="p-2 text-red-500 bg-white/5 rounded-xl hover:bg-red-500/10">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

        </div>
      </div>
    </form>
  );
}
