# Design Document — Portfolio Website (Gilang Wirapati)

## Overview

Website portfolio pribadi untuk Gilang Wirapati yang menampilkan dua bidang keahlian utama: **Software Engineering** dan **Creative Work** (Fotografer, Videografer, Video Editor). Website ini berfungsi sebagai representasi profesional kepada calon klien, rekruter, dan kolaborator.

### Tujuan Desain

- Satu identitas personal yang terpadu, dua domain yang dapat dinavigasi secara independen
- Performa tinggi (Lighthouse ≥ 85 desktop, ≥ 70 mobile) dengan optimasi gambar otomatis
- Aksesibilitas penuh (WCAG 2.1 Level AA)
- SEO-ready dengan metadata dinamis per halaman
- Pengiriman pesan kontak via email tanpa backend terpisah

### Ringkasan Temuan Riset

- **Next.js 14 App Router** dipilih karena React Server Components memberikan performa lebih baik untuk halaman data-heavy, built-in image optimization (WebP/AVIF otomatis), dan metadata API yang kuat untuk SEO. ([Sumber: Next.js Docs](https://nextjs.org/docs/app/guides))
- **Tailwind CSS + Framer Motion** adalah kombinasi standar industri untuk portfolio modern — Tailwind menangani styling utility-first, Framer Motion menyediakan animasi scroll dan transisi halaman yang smooth tanpa overhead besar. ([Sumber: motion.dev](https://motion.dev/docs/react-tailwind))
- **`next/image`** secara otomatis mengkonversi gambar ke WebP/AVIF, menerapkan lazy loading, dan mencegah layout shift — sesuai langsung dengan Requirement 9. ([Sumber: Next.js Image Optimization](https://nextjs.org/docs/app/getting-started/images))
- **Resend** dipilih sebagai email service untuk Contact Form karena integrasi native dengan Next.js Server Actions, free tier yang cukup untuk portfolio, dan tidak memerlukan backend terpisah. ([Sumber: Resend Docs](https://resend.com/docs/send-with-nextjs))
- **React Hook Form + Zod** untuk validasi form — kombinasi ini memberikan validasi client-side yang type-safe dan performa optimal dengan minimal re-render.

---

## Architecture

Website ini adalah **Static Site Generation (SSG) dengan beberapa Server Components** menggunakan Next.js 14 App Router. Konten portfolio disimpan sebagai data statis (JSON/TypeScript objects) karena tidak memerlukan CMS — Owner dapat mengupdate konten langsung di codebase.

### Diagram Arsitektur

```mermaid
graph TB
    subgraph "Client (Browser)"
        A[Visitor Browser]
    end

    subgraph "Next.js 14 App Router (Vercel)"
        B[Layout Root]
        C[Page: Home /]
        D[Page: Software Engineering /software]
        E[Page: Creative Work /creative]
        F[Page: About /about]
        G[Page: Contact /contact]
        H[API Route: /api/contact]
        I[next/image Optimization]
    end

    subgraph "Data Layer"
        J[/data/projects.ts]
        K[/data/photos.ts]
        L[/data/videos.ts]
        M[/data/owner.ts]
    end

    subgraph "External Services"
        N[Resend Email API]
        O[YouTube / Vimeo Embed]
        P[Vercel CDN]
    end

    A --> B
    B --> C & D & E & F & G
    D --> J
    E --> K & L
    F --> M
    G --> H
    H --> N
    E --> O
    I --> P
```

### Rendering Strategy

| Halaman | Strategy | Alasan |
|---|---|---|
| `/` (Home) | SSG | Konten statis, tidak berubah sering |
| `/software` | SSG | Daftar proyek statis |
| `/creative` | SSG | Gallery foto dan video statis |
| `/about` | SSG | Konten statis |
| `/contact` | SSG + Server Action | Form dikirim via Server Action ke Resend |
| `/sitemap.xml` | Dynamic Route | Generate otomatis dari daftar halaman |

### Deployment

- **Platform**: Vercel (free tier cukup untuk portfolio)
- **CDN**: Vercel Edge Network untuk aset statis
- **Domain**: Custom domain via Vercel DNS

---

## Components and Interfaces

### Struktur Direktori

```
src/
├── app/
│   ├── layout.tsx              # Root layout (Navigation, Footer)
│   ├── page.tsx                # Home
│   ├── software/
│   │   └── page.tsx            # Software Engineering
│   ├── creative/
│   │   ├── page.tsx            # Creative Work (tab: foto & video)
│   │   └── [slug]/page.tsx     # Detail video
│   ├── about/
│   │   └── page.tsx            # About
│   ├── contact/
│   │   └── page.tsx            # Contact
│   ├── api/
│   │   └── contact/route.ts    # Server Action email
│   ├── sitemap.ts              # Dynamic sitemap
│   └── robots.ts               # robots.txt
├── components/
│   ├── layout/
│   │   ├── NavigationBar.tsx
│   │   └── Footer.tsx
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── DomainSwitcher.tsx
│   │   └── BioSection.tsx
│   ├── software/
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectModal.tsx
│   │   ├── TechStackSection.tsx
│   │   └── ProjectFilter.tsx
│   ├── creative/
│   │   ├── PhotoGallery.tsx
│   │   ├── Lightbox.tsx
│   │   ├── VideoCard.tsx
│   │   ├── VideoPlayer.tsx
│   │   └── CreativeFilter.tsx
│   ├── about/
│   │   ├── Timeline.tsx
│   │   └── AchievementsSection.tsx
│   ├── contact/
│   │   ├── ContactForm.tsx
│   │   └── SocialLinks.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Badge.tsx
│       ├── EmptyState.tsx
│       └── CTAButton.tsx
├── data/
│   ├── owner.ts                # Data Owner (nama, bio, foto, CV)
│   ├── projects.ts             # Daftar proyek software
│   ├── photos.ts               # Daftar foto dengan metadata
│   ├── videos.ts               # Daftar video dengan metadata
│   └── experience.ts           # Timeline karir & pendidikan
├── lib/
│   ├── email.ts                # Resend email helper
│   ├── validations.ts          # Zod schemas
│   └── utils.ts                # Utility functions
└── types/
    └── index.ts                # TypeScript type definitions
```

### Komponen Utama

#### NavigationBar

```typescript
interface NavigationBarProps {
  // Tidak ada props — menggunakan usePathname() untuk active state
}
```

Behavior:
- `position: sticky; top: 0` dengan `z-index` tinggi
- Menampilkan logo/nama Owner di kiri sebagai link ke `/`
- Menampilkan 5 link navigasi di kanan (desktop)
- Pada mobile (≤768px): menyembunyikan link, menampilkan hamburger icon
- Active link ditandai dengan underline + warna berbeda

#### HeroSection

```typescript
interface HeroSectionProps {
  owner: {
    name: string;
    tagline: string;
    profileImage: string;
    bio: string; // maksimal 3 kalimat
  };
}
```

#### ProjectCard

```typescript
interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

interface Project {
  id: string;
  name: string;
  description: string;       // maks 150 karakter
  techStack: string[];
  category: ProjectCategory;
  repositoryUrl?: string;
  demoUrl?: string;
  thumbnail?: string;        // path ke gambar, opsional
}

type ProjectCategory = 'Web App' | 'Mobile App' | 'API' | 'Open Source';
```

#### PhotoGallery + Lightbox

```typescript
interface Photo {
  id: string;
  src: string;               // path thumbnail (≤600px, ≤200KB)
  fullSrc: string;           // path full resolution (≥1200px)
  alt: string;               // deskripsi aksesibel
  category: PhotoCategory;
  title?: string;
}

type PhotoCategory = 'Portrait' | 'Landscape' | 'Event' | 'Street' | 'Product';

interface LightboxProps {
  photos: Photo[];
  initialIndex: number;
  onClose: () => void;
}
```

#### ContactForm

```typescript
interface ContactFormData {
  fullName: string;          // maks 100 karakter
  email: string;             // maks 254 karakter, format valid
  subject: ContactSubject;
  message: string;           // maks 2000 karakter
}

type ContactSubject =
  | 'Software Project'
  | 'Photography'
  | 'Videography'
  | 'Video Editing'
  | 'Other';

interface ContactFormState {
  status: 'idle' | 'submitting' | 'success' | 'error';
  errors: Partial<Record<keyof ContactFormData, string>>;
}
```

---

## Data Models

### Owner

```typescript
// src/data/owner.ts
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

export interface SocialLink {
  platform: 'LinkedIn' | 'GitHub' | 'Instagram' | 'Behance' | 'YouTube' | 'Vimeo';
  url: string;
  label: string;             // untuk aksesibilitas (aria-label)
}
```

### Project (Software)

```typescript
// src/data/projects.ts
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
```

### Photo

```typescript
// src/data/photos.ts
export interface Photo {
  id: string;
  title: string;
  alt: string;
  src: string;               // thumbnail path
  fullSrc: string;           // full resolution path
  category: PhotoCategory;
  year: number;
}
```

### Video

```typescript
// src/data/videos.ts
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

type VideoCategory = 'Cinematic' | 'Commercial' | 'Event' | 'Short Film' | 'Motion Graphics';
```

### Experience (Timeline)

```typescript
// src/data/experience.ts
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
```

### Zod Validation Schemas

```typescript
// src/lib/validations.ts
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
```

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

Berdasarkan analisis prework, fitur ini memiliki banyak logika filtering, rendering kondisional, validasi form, dan transformasi data yang cocok untuk property-based testing. Library yang digunakan: **fast-check** (TypeScript/JavaScript PBT library).

---

### Property 1: Filter proyek menampilkan hanya item yang sesuai kategori

*For any* daftar proyek dengan berbagai kategori, ketika filter kategori tertentu diterapkan, semua proyek yang ditampilkan SHALL memiliki kategori yang sama dengan filter yang dipilih, dan tidak ada proyek dari kategori lain yang muncul.

**Validates: Requirements 3.6**

---

### Property 2: Filter foto menampilkan hanya item yang sesuai kategori

*For any* koleksi foto dengan berbagai kategori, ketika filter kategori tertentu diterapkan, semua foto yang ditampilkan SHALL memiliki kategori yang sama dengan filter yang dipilih.

**Validates: Requirements 4.7**

---

### Property 3: Filter video menampilkan hanya item yang sesuai kategori

*For any* daftar video dengan berbagai kategori, ketika filter kategori tertentu diterapkan, semua video yang ditampilkan SHALL memiliki kategori yang sama dengan filter yang dipilih.

**Validates: Requirements 5.4**

> **Catatan Refleksi**: Property 1, 2, dan 3 memiliki pola yang identik (filter → hasil sesuai kategori). Ketiganya dipertahankan karena menguji komponen yang berbeda (ProjectFilter, PhotoGallery, VideoCard) dengan tipe data yang berbeda. Namun implementasinya dapat menggunakan fungsi helper yang sama.

---

### Property 4: Validasi form menolak semua kombinasi field kosong

*For any* kombinasi data form di mana satu atau lebih field wajib (fullName, email, subject, message) kosong atau hanya berisi whitespace, fungsi validasi SHALL mengembalikan error dan form SHALL tidak dikirim.

**Validates: Requirements 7.2**

---

### Property 5: Validasi email menolak semua format email tidak valid

*For any* string yang tidak memenuhi format email valid (tidak mengandung '@', tidak memiliki domain dengan ekstensi, atau memiliki karakter ilegal), fungsi validasi email SHALL mengembalikan error spesifik pada field email.

**Validates: Requirements 7.3**

---

### Property 6: Form berhasil dikirim → state direset dan konfirmasi muncul

*For any* data form yang valid (semua field terisi dengan benar), setelah pengiriman berhasil, semua field form SHALL kosong dan pesan konfirmasi SHALL ditampilkan.

**Validates: Requirements 7.4**

---

### Property 7: Form gagal dikirim → data dipertahankan dan error ditampilkan

*For any* data form yang valid, jika server mengembalikan error saat pengiriman, semua isian form SHALL tetap ada (tidak direset) dan pesan error SHALL ditampilkan.

**Validates: Requirements 7.5**

---

### Property 8: Timeline pengalaman selalu diurutkan dari terbaru ke terlama

*For any* daftar entri pengalaman kerja/pendidikan dengan berbagai tanggal, fungsi sorting SHALL menghasilkan urutan descending berdasarkan `startDate` sehingga entri terbaru selalu muncul pertama.

**Validates: Requirements 6.2**

---

### Property 9: Metadata halaman selalu memiliki semua required meta tags dengan panjang valid

*For any* data halaman (title, description, image, url), fungsi generateMetadata SHALL menghasilkan objek metadata yang mengandung semua tag wajib (title, description, og:title, og:description, og:image, og:url) dengan panjang title antara 50–60 karakter dan description antara 50–160 karakter.

**Validates: Requirements 10.1, 10.5**

---

### Property 10: Halaman tanpa gambar spesifik menggunakan fallback og:image

*For any* halaman yang tidak memiliki gambar spesifik, fungsi generateMetadata SHALL menggunakan gambar fallback default Owner (foto profil) sebagai nilai `og:image`.

**Validates: Requirements 10.6**

---

### Property 11: Project_Card merender semua field yang diperlukan

*For any* data proyek yang valid, komponen Project_Card SHALL merender nama proyek, deskripsi, tech stack, dan thumbnail (atau placeholder jika thumbnail tidak tersedia).

**Validates: Requirements 3.3**

---

### Property 12: Lightbox menonaktifkan navigasi di batas koleksi

*For any* koleksi foto dengan ukuran ≥ 1, ketika Lightbox dibuka pada foto pertama (index 0), tombol navigasi "sebelumnya" SHALL dinonaktifkan atau disembunyikan; ketika dibuka pada foto terakhir (index n-1), tombol navigasi "berikutnya" SHALL dinonaktifkan atau disembunyikan.

**Validates: Requirements 4.4**

---

### Property 13: Seksi penghargaan muncul jika dan hanya jika data tersedia

*For any* data Owner, seksi penghargaan/sertifikasi SHALL ditampilkan jika dan hanya jika array achievements tidak kosong. Jika array kosong atau undefined, seksi tersebut SHALL tidak dirender sama sekali.

**Validates: Requirements 6.3**

---

### Property 14: Heading hierarchy tidak ada level yang dilewati

*For any* halaman yang dirender, struktur heading SHALL memiliki tepat satu H1, dan setiap level heading berikutnya (H2, H3, dst.) SHALL tidak melewati level (tidak ada H1 → H3 tanpa H2 di antaranya).

**Validates: Requirements 10.2, 8.5**

---

## Error Handling

### Strategi Error Handling per Layer

#### 1. Validasi Form (Client-side)

- Validasi dilakukan dengan Zod schema sebelum pengiriman
- Error ditampilkan inline di bawah setiap field yang bermasalah
- Form tidak dapat dikirim selama ada error validasi
- Pesan error dalam Bahasa Indonesia yang deskriptif

#### 2. Pengiriman Email (Server Action)

```typescript
// Pseudocode alur error handling
async function submitContactForm(data: ContactFormData) {
  // 1. Validasi ulang di server (defense in depth)
  const parsed = contactFormSchema.safeParse(data);
  if (!parsed.success) {
    return { status: 'error', message: 'Data tidak valid' };
  }

  // 2. Kirim via Resend
  try {
    await resend.emails.send({ ... });
    return { status: 'success' };
  } catch (error) {
    // Log error di server, jangan expose detail ke client
    console.error('Email send failed:', error);
    return {
      status: 'error',
      message: 'Pengiriman gagal. Silakan coba lagi atau hubungi langsung via email.'
    };
  }
}
```

#### 3. Video Embed Fallback

- Komponen `VideoPlayer` menggunakan `onError` handler pada iframe
- Jika embed gagal dimuat, komponen menampilkan fallback link ke platform eksternal
- Fallback link selalu tersedia di DOM (hidden) dan ditampilkan saat error

```typescript
interface VideoPlayerState {
  embedFailed: boolean;
}
// Jika embedFailed === true → tampilkan fallback link
// Jika embedFailed === false → tampilkan iframe embed
```

#### 4. Gambar Tidak Tersedia

- `next/image` dengan `onError` handler
- Jika gambar gagal dimuat, tampilkan placeholder SVG dengan warna netral
- Project_Card selalu merender placeholder jika `thumbnail` undefined (Requirement 3.3)

#### 5. Filter Tanpa Hasil

- Komponen `EmptyState` ditampilkan ketika hasil filter kosong
- Pesan: "Tidak ada [proyek/foto/video] ditemukan untuk kategori ini."
- Tombol "Tampilkan Semua" untuk mereset filter

### Error Boundaries

- Root error boundary di `app/error.tsx` untuk menangkap error rendering yang tidak terduga
- Halaman 404 custom di `app/not-found.tsx`

---

## Testing Strategy

### Pendekatan Dual Testing

Testing menggunakan dua pendekatan komplementer:

1. **Unit Tests** — untuk contoh spesifik, edge cases, dan error conditions
2. **Property-Based Tests** — untuk memverifikasi properti universal di berbagai input

### Tech Stack Testing

| Tool | Kegunaan |
|---|---|
| **Vitest** | Test runner (kompatibel dengan Next.js, lebih cepat dari Jest) |
| **React Testing Library** | Rendering dan interaksi komponen |
| **fast-check** | Property-based testing (PBT) |
| **axe-core / jest-axe** | Automated accessibility testing |
| **Playwright** | End-to-end testing (navigasi, form submission) |
| **Lighthouse CI** | Performance audit otomatis |

### Unit Tests

Unit tests fokus pada:

- **Komponen rendering**: Verifikasi elemen yang diperlukan ada di output
- **Logika filtering**: Verifikasi filter mengembalikan subset yang benar
- **Validasi form**: Verifikasi schema Zod menolak/menerima input dengan benar
- **Utility functions**: Sorting timeline, format tanggal, truncate text

Contoh unit test:

```typescript
// NavigationBar — active link indicator
it('menampilkan indikator aktif pada link halaman saat ini', () => {
  render(<NavigationBar />, { wrapper: withRouter('/software') });
  const softwareLink = screen.getByRole('link', { name: /software engineering/i });
  expect(softwareLink).toHaveClass('active'); // atau aria-current="page"
});

// EmptyState — filter tanpa hasil
it('menampilkan EmptyState ketika tidak ada proyek yang sesuai filter', () => {
  const projects = [{ category: 'Web App', ... }];
  render(<ProjectFilter projects={projects} />);
  fireEvent.click(screen.getByText('Mobile App'));
  expect(screen.getByText(/tidak ada proyek ditemukan/i)).toBeInTheDocument();
});
```

### Property-Based Tests

Setiap property dari seksi Correctness Properties diimplementasikan sebagai satu property-based test dengan minimum **100 iterasi**.

Format tag: `Feature: portfolio-website, Property {N}: {deskripsi singkat}`

```typescript
// Property 1: Filter proyek
import fc from 'fast-check';
import { filterProjects } from '@/lib/utils';

// Feature: portfolio-website, Property 1: filter proyek menampilkan hanya item yang sesuai kategori
test('filter proyek selalu mengembalikan hanya proyek dengan kategori yang dipilih', () => {
  fc.assert(
    fc.property(
      fc.array(fc.record({
        id: fc.uuid(),
        name: fc.string(),
        category: fc.constantFrom('Web App', 'Mobile App', 'API', 'Open Source'),
        // ... field lainnya
      })),
      fc.constantFrom('Web App', 'Mobile App', 'API', 'Open Source'),
      (projects, selectedCategory) => {
        const result = filterProjects(projects, selectedCategory);
        return result.every(p => p.category === selectedCategory);
      }
    ),
    { numRuns: 100 }
  );
});

// Property 4: Validasi form menolak field kosong
// Feature: portfolio-website, Property 4: validasi form menolak semua kombinasi field kosong
test('validasi form menolak data dengan field wajib yang kosong', () => {
  fc.assert(
    fc.property(
      fc.record({
        fullName: fc.oneof(fc.constant(''), fc.string({ maxLength: 5 }).filter(s => s.trim() === '')),
        email: fc.emailAddress(),
        subject: fc.constantFrom('Software Project', 'Photography', 'Videography', 'Video Editing', 'Other'),
        message: fc.string({ minLength: 1 }),
      }),
      (formData) => {
        const result = contactFormSchema.safeParse({ ...formData, fullName: '' });
        return result.success === false;
      }
    ),
    { numRuns: 100 }
  );
});

// Property 8: Timeline sorting
// Feature: portfolio-website, Property 8: timeline selalu diurutkan dari terbaru ke terlama
test('sortExperience selalu menghasilkan urutan descending berdasarkan startDate', () => {
  fc.assert(
    fc.property(
      fc.array(fc.record({
        id: fc.uuid(),
        startDate: fc.date({ min: new Date('2000-01'), max: new Date('2024-12') })
          .map(d => d.toISOString().slice(0, 7)),
        // ... field lainnya
      }), { minLength: 1 }),
      (entries) => {
        const sorted = sortExperience(entries);
        for (let i = 0; i < sorted.length - 1; i++) {
          if (sorted[i].startDate < sorted[i + 1].startDate) return false;
        }
        return true;
      }
    ),
    { numRuns: 100 }
  );
});
```

### Integration Tests (Playwright)

End-to-end tests untuk alur kritis:

1. **Navigasi antar halaman** — klik semua link di NavigationBar, verifikasi URL dan konten
2. **Filter proyek** — pilih kategori, verifikasi hanya proyek yang sesuai muncul
3. **Lightbox foto** — klik foto, navigasi prev/next, tutup dengan Escape
4. **Contact Form** — isi form valid, submit, verifikasi konfirmasi; isi form invalid, verifikasi error
5. **Hamburger menu mobile** — resize ke mobile, klik hamburger, verifikasi menu muncul/hilang

### Smoke Tests & Performance

- **Lighthouse CI** dijalankan di setiap PR untuk memastikan skor ≥ 85 (desktop) dan ≥ 70 (mobile)
- **axe-core** dijalankan pada setiap halaman untuk verifikasi aksesibilitas otomatis
- Verifikasi `/sitemap.xml` dan `/robots.txt` dapat diakses dan valid

### Accessibility Tests

```typescript
import { axe } from 'jest-axe';

it('halaman utama tidak memiliki pelanggaran aksesibilitas', async () => {
  const { container } = render(<HomePage />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

> **Catatan**: Validasi aksesibilitas penuh memerlukan pengujian manual dengan assistive technologies (screen reader, keyboard-only navigation) dan expert review, tidak hanya automated testing.
