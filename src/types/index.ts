// ============================================================
// Project types
// ============================================================

export type ProjectCategory = 'Web App' | 'Mobile App' | 'API' | 'Open Source';

export interface Project {
  id: string;
  name: string;
  description: string;       // maks 150 karakter
  fullDescription: string;   // maks 1000 karakter
  challenges: string;
  solutions: string;
  techStack: string[];
  category: ProjectCategory;
  repositoryUrl?: string;
  demoUrl?: string;
  thumbnail?: string;
  featured: boolean;
}

// ============================================================
// Photo types
// ============================================================

export type PhotoCategory = 'Portrait' | 'Landscape' | 'Event' | 'Street' | 'Product';

export interface Photo {
  id: string;
  title: string;
  alt: string;
  src: string;               // thumbnail path
  fullSrc: string | string[]; // full resolution path (string array = album album)
  category: PhotoCategory;
  year: number;
}

// ============================================================
// Video types
// ============================================================

export type VideoCategory =
  | 'Cinematic'
  | 'Commercial'
  | 'Event'
  | 'Short Film'
  | 'Motion Graphics';

export interface Video {
  id: string;
  title: string;
  description: string;       // maks 150 karakter
  thumbnail: string;
  embedUrl: string;          // YouTube/Vimeo embed URL
  externalUrl: string;       // fallback URL ke platform eksternal
  category: VideoCategory;
  tools: string[];           // misal: ['Premiere Pro', 'After Effects']
  role: string;              // misal: 'Director, Editor'
  year: number;
}

// ============================================================
// Owner types
// ============================================================

export interface SocialLink {
  platform: 'LinkedIn' | 'GitHub' | 'Instagram' | 'Behance' | 'YouTube' | 'Vimeo';
  url: string;
  label: string;             // untuk aksesibilitas (aria-label)
}

export interface OwnerData {
  name: string;
  tagline: string;
  bio: string;               // bio pendek, maks 3 kalimat
  biography: string;         // biografi lengkap untuk halaman About
  profileImage: string;
  philosophy: string;        // pernyataan nilai/filosofi kerja
  cvUrl?: string;            // path ke file PDF CV, opsional
  email: string;
  socialLinks: SocialLink[];
}

// ============================================================
// Experience types
// ============================================================

export interface ExperienceEntry {
  id: string;
  type: 'work' | 'education';
  title: string;
  organization: string;
  startDate: string;         // format: 'YYYY-MM'
  endDate?: string;          // format: 'YYYY-MM', undefined = present
  description: string;
}

export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  year: number;
  type: 'award' | 'certification' | 'notable';
}

// ============================================================
// Contact form types
// ============================================================

export type ContactSubject =
  | 'Software Project'
  | 'Photography'
  | 'Videography'
  | 'Video Editing'
  | 'Other';

export interface ContactFormData {
  fullName: string;
  email: string;
  subject: ContactSubject;
  message: string;
}

export interface ContactFormState {
  status: 'idle' | 'submitting' | 'success' | 'error';
  errors: Partial<Record<keyof ContactFormData, string>>;
}
