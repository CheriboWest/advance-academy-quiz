'use client';

import { useState } from 'react';
import type { UserData } from '@/lib/types';

interface EmailGateProps {
  onSubmit: (data: UserData) => void;
  isLoading: boolean;
  houseName?: string;
}

export default function EmailGate({ onSubmit, isLoading, houseName }: EmailGateProps) {
  const [formData, setFormData] = useState<UserData>({
    name: '',
    email: '',
    whatsapp: '',
    consentMarketing: false,
  });
  const [errors, setErrors] = useState<Partial<UserData>>({});

  const validate = (): boolean => {
    const newErrors: Partial<UserData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = 'WhatsApp number is required';
    } else if (!/^[\d\s\+\-\(\)]{7,20}$/.test(formData.whatsapp.trim())) {
      newErrors.whatsapp = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: keyof UserData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="animate-fade-in max-w-lg mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-4xl mb-4">✨</div>
        <h2 className="font-cinzel text-2xl sm:text-3xl text-cream mb-3">
          Unlock Your Full Blueprint
        </h2>
        <p className="text-cream/60 text-sm sm:text-base leading-relaxed">
          {houseName ? `You're ${houseName}! ` : ''}Enter your details to unlock your
          personalised blueprint — your core strengths, best-fit UK industries, and 3
          strategic next steps.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate>
        <div className="space-y-5">
          {/* Full Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-gold text-sm font-sans font-medium mb-2 tracking-wide"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Your full name"
              className={`w-full px-4 py-3 rounded-xl bg-white/5 border backdrop-blur-sm
                text-cream placeholder-cream/30 text-sm sm:text-base
                focus:outline-none focus:ring-2 focus:ring-gold/50
                transition-all duration-200
                ${errors.name ? 'border-red-400/60' : 'border-gold/20 focus:border-gold/50'}`}
              disabled={isLoading}
            />
            {errors.name && (
              <p className="mt-1.5 text-red-400 text-xs">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-gold text-sm font-sans font-medium mb-2 tracking-wide"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="your@email.com"
              className={`w-full px-4 py-3 rounded-xl bg-white/5 border backdrop-blur-sm
                text-cream placeholder-cream/30 text-sm sm:text-base
                focus:outline-none focus:ring-2 focus:ring-gold/50
                transition-all duration-200
                ${errors.email ? 'border-red-400/60' : 'border-gold/20 focus:border-gold/50'}`}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="mt-1.5 text-red-400 text-xs">{errors.email}</p>
            )}
          </div>

          {/* WhatsApp */}
          <div>
            <label
              htmlFor="whatsapp"
              className="block text-gold text-sm font-sans font-medium mb-2 tracking-wide"
            >
              WhatsApp Number
            </label>
            <input
              id="whatsapp"
              type="tel"
              value={formData.whatsapp}
              onChange={(e) => handleChange('whatsapp', e.target.value)}
              placeholder="+44 7700 000000"
              className={`w-full px-4 py-3 rounded-xl bg-white/5 border backdrop-blur-sm
                text-cream placeholder-cream/30 text-sm sm:text-base
                focus:outline-none focus:ring-2 focus:ring-gold/50
                transition-all duration-200
                ${errors.whatsapp ? 'border-red-400/60' : 'border-gold/20 focus:border-gold/50'}`}
              disabled={isLoading}
            />
            {errors.whatsapp && (
              <p className="mt-1.5 text-red-400 text-xs">{errors.whatsapp}</p>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-4 px-6 rounded-xl font-cinzel text-navy font-bold
              text-sm sm:text-base tracking-wider uppercase
              bg-gradient-to-r from-gold to-gold-light
              hover:from-gold-light hover:to-gold
              disabled:opacity-60 disabled:cursor-not-allowed
              transition-all duration-200
              shadow-lg hover:shadow-gold/30
              animate-pulse-glow"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Unlocking your blueprint...
              </span>
            ) : (
              'Unlock My Blueprint →'
            )}
          </button>

          {/* Marketing consent — un-pre-ticked, NOT required to see the result */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.consentMarketing}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, consentMarketing: e.target.checked }))
              }
              disabled={isLoading}
              className="mt-1 h-4 w-4 shrink-0 accent-gold"
            />
            <span className="text-cream/60 text-xs leading-relaxed">
              I&apos;d like to receive career tips and updates from Advance Academy by
              email. (Optional — you&apos;ll still see your result either way. Unsubscribe
              anytime.)
            </span>
          </label>

          <p className="text-center text-cream/30 text-xs">
            We use your details in line with our{' '}
            <a href="/privacy" className="underline hover:text-cream/50">
              Privacy Notice
            </a>
            .
          </p>
        </div>
      </form>
    </div>
  );
}
