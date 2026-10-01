'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { siteConfig } from '@/config/site';
import { Eye, EyeOff, Lock, User, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-deep-black relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated Electrical Background Elements */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric-cyan/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric-cyan/10 rounded-full blur-[100px] mix-blend-screen" />
        
        {/* Subtle Grid */}
        <div className="absolute inset-0" 
             style={{
               backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.03) 1px, transparent 1px)',
               backgroundSize: '32px 32px'
             }} 
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="relative w-48 h-20">
              <Image 
                src="/assets/Best Electric Services Logo.png" 
                alt={siteConfig.name}
                fill
                className="object-contain drop-shadow-[0_0_15px_rgba(0,255,255,0.3)]"
                priority
              />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-wider flex items-center justify-center gap-2">
            <ShieldCheck className="text-electric-cyan" size={24} />
            COMMAND CENTER
          </h1>
          <p className="text-gray-400 mt-2 text-sm uppercase tracking-widest font-semibold">Authorized Access Only</p>
        </div>

        <div className="bg-charcoal/80 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-[0_0_40px_-10px_rgba(0,255,255,0.15)] relative overflow-hidden">
          {/* Top glow border */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-electric-cyan to-transparent opacity-50" />
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                Administrator Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@bestelectric.com"
                  className="w-full bg-deep-black/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                Secure Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-deep-black/50 border border-white/10 rounded-lg py-3 pl-10 pr-12 text-white placeholder:text-gray-600 focus:outline-none focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-electric-cyan transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-lg text-center flex items-center justify-center gap-2"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <Button
              type="submit"
              variant="primary"
              className="w-full justify-center py-6 text-sm uppercase tracking-wider font-bold shadow-[0_0_20px_-5px_rgba(0,255,255,0.4)]"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-deep-black border-t-transparent rounded-full animate-spin" />
                  Authenticating...
                </span>
              ) : (
                'Initialize Session'
              )}
            </Button>
          </form>
        </div>

        <div className="mt-8 text-center text-xs text-gray-500 space-y-1">
          <p className="flex items-center justify-center gap-1.5">
            <ShieldCheck size={14} className="text-electric-cyan/50" />
            Protected by advanced JWT encryption
          </p>
          <p>IP Address logged for security.</p>
        </div>
      </motion.div>
    </div>
  );
}
