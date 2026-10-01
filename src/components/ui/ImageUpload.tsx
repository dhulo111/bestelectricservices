'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Upload, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

import imageCompression from 'browser-image-compression';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  bucketName?: string;
  className?: string;
}

export function ImageUpload({ value, onChange, bucketName = 'images', className = '' }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setError('');
      if (!e.target.files || e.target.files.length === 0) {
        return;
      }
      
      const file = e.target.files[0];
      
      setIsUploading(true);

      // Options for compression
      const options = {
        maxSizeMB: 1, // Compress to max 1MB
        maxWidthOrHeight: 1920, // Max dimension
        useWebWorker: true, // Use web worker for faster compression
      };
      
      let fileToUpload = file;
      try {
        const compressedFile = await imageCompression(file, options);
        fileToUpload = compressedFile;
      } catch (compressionError) {
        console.error('Error during image compression:', compressionError);
        // Fallback to original file if compression fails
      }

      const fileExt = fileToUpload.name.split('.').pop() || 'jpg';
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      if (!supabase) {
        throw new Error('Supabase client is not initialized. Check your environment variables.');
      }

      const { error: uploadError, data } = await supabase.storage
        .from(bucketName)
        .upload(filePath, fileToUpload, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);

      onChange(publicUrl);
    } catch (err: any) {
      console.error('Error uploading image:', err);
      setError(err.message || 'Error uploading image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    onChange('');
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {error && (
        <div className="text-sm text-red-500 p-2 bg-red-500/10 rounded-lg border border-red-500/50">
          {error}
        </div>
      )}
      
      {value ? (
        <div className="relative rounded-lg overflow-hidden border border-white/10 bg-white/5 group h-48">
          <img src={value} alt="Uploaded" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              type="button"
              onClick={handleRemove}
              className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      ) : (
        <div className="relative h-48 border-2 border-dashed border-white/20 rounded-lg bg-white/5 hover:bg-white/10 transition-colors flex flex-col items-center justify-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={isUploading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          />
          <div className="flex flex-col items-center gap-2 text-gray-400">
            {isUploading ? (
              <>
                <Loader2 size={32} className="animate-spin text-electric-cyan" />
                <span className="text-sm">Uploading...</span>
              </>
            ) : (
              <>
                <Upload size={32} className="text-electric-cyan" />
                <span className="text-sm font-medium">Click or drag image to upload</span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
