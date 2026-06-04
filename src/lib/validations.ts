import { z } from 'zod';

export const contactFormSchema = z.object({
  fullName: z.string()
    .min(1, 'Nama lengkap wajib diisi')
    .max(100, 'Nama maksimal 100 karakter'),
  email: z.string()
    .min(1, 'Email wajib diisi')
    .email('Format email tidak valid')
    .max(254, 'Email maksimal 254 karakter'),
  subject: z.enum([
    'Software Project',
    'Photography',
    'Videography',
    'Video Editing',
    'Other',
  ], { required_error: 'Subjek wajib dipilih' }),
  message: z.string()
    .min(1, 'Pesan wajib diisi')
    .max(2000, 'Pesan maksimal 2000 karakter'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export type ContactSubject = z.infer<typeof contactFormSchema>['subject'];
