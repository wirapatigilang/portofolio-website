'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, type ContactFormData, type ContactSubject } from '@/lib/validations';
import { owner } from '@/data/owner';
import Button from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================================
// Available Subject Options
// ============================================================

const SUBJECT_OPTIONS: ContactSubject[] = [
  'Software Project',
  'Photography',
  'Videography',
  'Video Editing',
  'Other',
];

// ============================================================
// ContactForm component
// ============================================================

export default function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onTouched', // Validate during input
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || 'Terjadi kesalahan saat mengirim pesan.');
      }

      setSubmitStatus('success');
      reset(); // Clear the form fields

      // Auto-reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
      
    } catch (error) {
      console.error('Contact submission error:', error);
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Terjadi kesalahan tidak terduga.');
    }
  };

  return (
    <form
      id="contact-form"
      className="flex w-full flex-col gap-6"
      onSubmit={handleSubmit(onSubmit)}
      noValidate // Disable default HTML5 validation since we use Zod
    >
      {/* ── Status Messages ── */}
      <AnimatePresence mode="wait">
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, height: 0, scale: 0.95 }}
            animate={{ opacity: 1, height: 'auto', scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="rounded-md bg-green-500/10 p-4 text-green-600 dark:text-green-400 overflow-hidden"
            role="alert"
            aria-live="polite"
          >
            <p className="flex items-center gap-2 font-medium">
              Pesan Anda berhasil dikirim! Saya akan segera membalasnya.
            </p>
          </motion.div>
        )}
        
        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, height: 0, scale: 0.95 }}
            animate={{ opacity: 1, height: 'auto', scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="rounded-md bg-red-500/10 p-4 text-red-600 dark:text-red-400 overflow-hidden"
            role="alert"
            aria-live="polite"
          >
            <p className="flex items-center gap-2 font-medium">
              {errorMessage}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Full Name ── */}
      <div className="flex flex-col gap-2">
        <label htmlFor="fullName" className="text-sm font-medium text-foreground">
          Nama Lengkap <span>*</span>
        </label>
        <input
          id="fullName"
          type="text"
          className={`min-h-[44px] rounded-md border bg-transparent px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background ${
            errors.fullName ? 'border-red-500' : 'border-foreground/20'
          }`}
          placeholder="Lalu Gilang Wirapati"
          aria-invalid={errors.fullName ? 'true' : 'false'}
          aria-describedby={errors.fullName ? 'fullName-error' : undefined}
          {...register('fullName')}
        />
        <AnimatePresence>
          {errors.fullName && (
            <motion.span
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              id="fullName-error"
              className="text-sm text-red-500 mt-1 block"
              role="alert"
            >
              {errors.fullName.message}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* ── Email ── */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          Email <span>*</span>
        </label>
        <input
          id="email"
          type="email"
          className={`min-h-[44px] rounded-md border bg-transparent px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background ${
            errors.email ? 'border-red-500' : 'border-foreground/20'
          }`}
          placeholder="gilang.wirapati@email.com"
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'email-error' : undefined}
          {...register('email')}
        />
        <AnimatePresence>
          {errors.email && (
            <motion.span
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              id="email-error"
              className="text-sm text-red-500 mt-1 block"
              role="alert"
            >
              {errors.email.message}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* ── Subject ── */}
      <div className="flex flex-col gap-2">
        <label htmlFor="subject" className="text-sm font-medium text-foreground">
          Subjek Proyek <span>*</span>
        </label>
        <select
          id="subject"
          className={`min-h-[44px] rounded-md border bg-transparent px-4 py-2 text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background ${
            errors.subject ? 'border-red-500' : 'border-foreground/20'
          }`}
          aria-invalid={errors.subject ? 'true' : 'false'}
          aria-describedby={errors.subject ? 'subject-error' : undefined}
          {...register('subject')}
        >
          <option value="" disabled selected>-- Pilih Subjek --</option>
          {SUBJECT_OPTIONS.map((sub) => (
            <option key={sub} value={sub} className="text-background">
              {sub}
            </option>
          ))}
        </select>
        <AnimatePresence>
          {errors.subject && (
            <motion.span
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              id="subject-error"
              className="text-sm text-red-500 mt-1 block"
              role="alert"
            >
              {errors.subject.message}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* ── Message ── */}
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-medium text-foreground">
          Pesan <span>*</span>
        </label>
        <textarea
          id="message"
          rows={6}
          className={`resize-y rounded-md border bg-transparent px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background ${
            errors.message ? 'border-red-500' : 'border-foreground/20'
          }`}
          placeholder={`Hai ${owner.name}, saya tertarik berkolaborasi dengan Anda pada proyek...`}
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'message-error' : undefined}
          {...register('message')}
        />
        <AnimatePresence>
          {errors.message && (
            <motion.span
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              id="message-error"
              className="text-sm text-red-500 mt-1 block"
              role="alert"
            >
              {errors.message.message}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* ── Submit Button ── */}
      <motion.div 
        whileHover={{ scale: 1.02 }} 
        whileTap={{ scale: 0.98 }}
        className="mt-2 w-full sm:w-auto self-start"
      >
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={submitStatus === 'submitting' || !isValid}
          className="w-full"
          aria-busy={submitStatus === 'submitting'}
        >
          {submitStatus === 'submitting' ? 'Mengirim...' : 'Kirim Pesan'}
        </Button>
      </motion.div>
    </form>
  );
}
