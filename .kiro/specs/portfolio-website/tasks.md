# Implementation Plan: Portfolio Website (Gilang Wirapati)

## Overview

Rencana implementasi website portfolio pribadi Gilang Wirapati menggunakan Next.js 14 App Router dengan SSG, Tailwind CSS, Framer Motion, Resend, React Hook Form + Zod, dan Vitest + Playwright. Implementasi dilakukan secara inkremental: setup proyek → tipe data & utilitas → komponen UI dasar → halaman per halaman → testing → deployment.

## Tasks

- [x] 1. Setup proyek dan konfigurasi awal
  - Inisialisasi proyek Next.js 14 dengan App Router menggunakan `create-next-app`
  - Konfigurasi TypeScript strict mode di `tsconfig.json`
  - Install dan konfigurasi Tailwind CSS v3
  - Install dependensi: `framer-motion`, `react-hook-form`, `zod`, `resend`, `@react-email/components`
  - Install dependensi testing: `vitest`, `@vitest/coverage-v8`, `@testing-library/react`, `@testing-library/user-event`, `jest-axe`, `fast-check`, `@playwright/test`
  - Konfigurasi Vitest di `vitest.config.ts` dengan jsdom environment
  - Konfigurasi Playwright di `playwright.config.ts`
  - Setup `next.config.js` dengan konfigurasi image domains dan security headers
  - Buat struktur direktori sesuai design: `src/app`, `src/components`, `src/data`, `src/lib`, `src/types`
  - _Requirements: 9.1, 9.3, 9.6_

- [x] 2. Definisikan TypeScript types dan data statis
  - [x] 2.1 Buat file `src/types/index.ts` dengan semua type definitions
    - Definisikan `Project`, `ProjectCategory`, `Photo`, `PhotoCategory`, `Video`, `VideoCategory`
    - Definisikan `OwnerData`, `SocialLink`, `ExperienceEntry`, `Achievement`
    - Definisikan `ContactFormData`, `ContactSubject`, `ContactFormState`
    - _Requirements: 3.3, 4.1, 5.1, 6.1, 7.1_

  - [x] 2.2 Buat file data statis di `src/data/`
    - Buat `src/data/owner.ts` dengan data Owner (nama, bio, tagline, foto, email, socialLinks, cvUrl)
    - Buat `src/data/projects.ts` dengan minimal 3 contoh proyek software dengan semua field terisi
    - Buat `src/data/photos.ts` dengan minimal 5 contoh foto dengan metadata lengkap
    - Buat `src/data/videos.ts` dengan minimal 3 contoh video dengan embedUrl dan externalUrl
    - Buat `src/data/experience.ts` dengan contoh entri karir dan pendidikan
    - _Requirements: 3.1, 3.3, 4.1, 5.1, 6.1, 6.2_

  - [x] 2.3 Buat Zod validation schema di `src/lib/validations.ts`
    - Implementasikan `contactFormSchema` sesuai design dengan semua constraint (maxLength, email format)
    - Export `ContactFormData` type dari schema
    - _Requirements: 7.1, 7.2, 7.3_

  - [x] 2.4 Tulis property test untuk validasi form (Property 4 & 5)
    - **Property 4: Validasi form menolak semua kombinasi field kosong**
    - **Validates: Requirements 7.2**
    - **Property 5: Validasi email menolak semua format email tidak valid**
    - **Validates: Requirements 7.3**
    - _File: `src/lib/__tests__/validations.test.ts`_

- [x] 3. Buat utility functions di `src/lib/utils.ts`
  - [x] 3.1 Implementasikan fungsi `filterProjects(projects, category)`
    - Kembalikan semua proyek jika category adalah `null` atau `undefined`
    - Kembalikan hanya proyek dengan kategori yang cocok jika category dipilih
    - _Requirements: 3.6_

  - [x] 3.2 Tulis property test untuk filter proyek (Property 1)
    - **Property 1: Filter proyek menampilkan hanya item yang sesuai kategori**
    - **Validates: Requirements 3.6**
    - _File: `src/lib/__tests__/utils.test.ts`_

  - [x] 3.3 Implementasikan fungsi `filterPhotos(photos, category)` dan `filterVideos(videos, category)`
    - Pola identik dengan `filterProjects` untuk tipe Photo dan Video
    - _Requirements: 4.7, 5.4_

  - [x] 3.4 Tulis property test untuk filter foto dan video (Property 2 & 3)
    - **Property 2: Filter foto menampilkan hanya item yang sesuai kategori**
    - **Validates: Requirements 4.7**
    - **Property 3: Filter video menampilkan hanya item yang sesuai kategori**
    - **Validates: Requirements 5.4**
    - _File: `src/lib/__tests__/utils.test.ts`_

  - [x] 3.5 Implementasikan fungsi `sortExperience(entries)` untuk mengurutkan timeline
    - Urutkan descending berdasarkan `startDate` (format 'YYYY-MM')
    - _Requirements: 6.2_

  - [ ]\* 3.6 Tulis property test untuk sorting timeline (Property 8)
    - **Property 8: Timeline pengalaman selalu diurutkan dari terbaru ke terlama**
    - **Validates: Requirements 6.2**
    - _File: `src/lib/__tests__/utils.test.ts`_

  - [x] 3.7 Implementasikan fungsi `generateMetadata(pageData)` untuk menghasilkan objek metadata Next.js
    - Pastikan semua required tags ada: title, description, og:title, og:description, og:image, og:url
    - Gunakan fallback og:image dari data Owner jika halaman tidak punya gambar spesifik
    - _Requirements: 10.1, 10.5, 10.6_

  - [ ]\* 3.8 Tulis property test untuk metadata generation (Property 9 & 10)
    - **Property 9: Metadata halaman selalu memiliki semua required meta tags dengan panjang valid**
    - **Validates: Requirements 10.1, 10.5**
    - **Property 10: Halaman tanpa gambar spesifik menggunakan fallback og:image**
    - **Validates: Requirements 10.6**
    - _File: `src/lib/__tests__/utils.test.ts`_

- [x] 4. Buat komponen UI dasar di `src/components/ui/`
  - [x] 4.1 Implementasikan `Button.tsx` dan `CTAButton.tsx`
    - Button dengan variant (primary, secondary, ghost) dan ukuran (sm, md, lg)
    - Touch target minimal 44x44px, keyboard accessible, visible focus indicator
    - CTAButton sebagai styled variant untuk call-to-action
    - _Requirements: 8.3, 8.6_

  - [x] 4.2 Implementasikan `Badge.tsx` untuk menampilkan tech stack dan kategori
    - Komponen pill/badge dengan warna berdasarkan kategori
    - _Requirements: 3.2, 3.3_

  - [x] 4.3 Implementasikan `EmptyState.tsx` untuk kondisi filter tanpa hasil
    - Tampilkan pesan "Tidak ada [item] ditemukan untuk kategori ini."
    - Tampilkan tombol "Tampilkan Semua" untuk mereset filter
    - _Requirements: 3.7, 4.8, 5.7_

  - [ ]\* 4.4 Tulis unit tests untuk komponen UI dasar
    - Test Button render dengan berbagai variant dan ukuran
    - Test EmptyState menampilkan pesan dan tombol reset
    - _File: `src/components/ui/__tests__/`_

- [x] 5. Implementasikan NavigationBar dan Footer
  - [x] 5.1 Buat `src/components/layout/NavigationBar.tsx`
    - Sticky/fixed positioning dengan z-index tinggi
    - Logo/nama Owner di kiri sebagai link ke `/`
    - 5 link navigasi di kanan: Home, Software Engineering, Creative Work, About, Contact
    - Active link indicator menggunakan `usePathname()` (underline + warna berbeda, aria-current="page")
    - Hamburger menu untuk mobile (≤768px): sembunyikan link, tampilkan ikon hamburger
    - Toggle menu mobile: tampilkan/sembunyikan link dalam layout vertikal
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

  - [ ]\* 5.2 Tulis unit tests untuk NavigationBar
    - Test active link indicator pada berbagai route
    - Test hamburger menu toggle (tampil/hilang)
    - Test semua link mengarah ke URL yang benar
    - _File: `src/components/layout/__tests__/NavigationBar.test.tsx`_

  - [x] 5.3 Buat `src/components/layout/Footer.tsx`
    - Tampilkan nama Owner, copyright, dan link ke social media
    - Gunakan elemen HTML semantik `<footer>`
    - _Requirements: 8.5_

- [x] 6. Implementasikan Root Layout dan halaman Home
  - [x] 6.1 Buat `src/app/layout.tsx` (Root Layout)
    - Integrasikan NavigationBar dan Footer
    - Setup font (Google Fonts via `next/font`)
    - Setup global CSS dengan Tailwind directives
    - Tambahkan landmark regions: `<header>`, `<nav>`, `<main>`, `<footer>`
    - _Requirements: 8.5_

  - [x] 6.2 Buat komponen `src/components/home/HeroSection.tsx`
    - Tampilkan nama Owner, foto profil (`next/image`), dan tagline yang menyebut kedua domain
    - Animasi entrance dengan Framer Motion
    - _Requirements: 1.1, 1.6_

  - [x] 6.3 Buat komponen `src/components/home/DomainSwitcher.tsx`
    - Dua entry point domain (Software Engineering & Creative Work) terlihat tanpa scroll
    - Setiap entry point adalah link yang mengarah ke halaman domain yang sesuai
    - _Requirements: 1.2, 1.3_

  - [x] 6.4 Buat komponen `src/components/home/BioSection.tsx`
    - Tampilkan bio pendek Owner (maksimal 3 kalimat)
    - Tampilkan CTA button yang mengarah ke halaman Contact
    - _Requirements: 1.4, 1.5_

  - [x] 6.5 Buat `src/app/page.tsx` (halaman Home)
    - Rakit HeroSection, DomainSwitcher, BioSection
    - Tambahkan metadata SEO menggunakan `generateMetadata`
    - Export sebagai SSG (default untuk App Router)
    - _Requirements: 1.1, 1.2, 1.4, 1.5, 10.1_

  - [x]\* 6.6 Tulis unit tests untuk komponen Home
    - Test HeroSection menampilkan nama, foto, dan tagline
    - Test DomainSwitcher menampilkan dua entry point dengan link yang benar
    - Test BioSection menampilkan bio dan CTA
    - _File: `src/components/home/__tests__/`_

- [x] 7. Checkpoint — Pastikan semua tests lulus
  - Jalankan `vitest --run` dan pastikan semua unit tests dan property tests lulus
  - Pastikan tidak ada TypeScript error (`tsc --noEmit`)
  - Pastikan build berhasil (`next build`)
  - Tanyakan kepada user jika ada pertanyaan sebelum melanjutkan.

- [x] 8. Implementasikan halaman Software Engineering
  - [x] 8.1 Buat `src/components/software/TechStackSection.tsx`
    - Tampilkan teknologi dikelompokkan berdasarkan kategori (Frontend, Backend, Database, DevOps, Tools)
    - Gunakan Badge component untuk setiap teknologi
    - _Requirements: 3.2_

  - [x] 8.2 Buat `src/components/software/ProjectCard.tsx`
    - Tampilkan nama, deskripsi (maks 150 karakter), tech stack badges, thumbnail (`next/image`)
    - Tampilkan placeholder SVG jika thumbnail tidak tersedia
    - Komponen dapat diklik (onClick handler)
    - _Requirements: 3.3_

  - [x]\* 8.3 Tulis property test untuk ProjectCard (Property 11)
    - **Property 11: Project_Card merender semua field yang diperlukan**
    - **Validates: Requirements 3.3**
    - _File: `src/components/software/__tests__/ProjectCard.test.tsx`_

  - [x] 8.4 Buat `src/components/software/ProjectModal.tsx`
    - Modal/dialog yang menampilkan detail proyek lengkap
    - Tampilkan: deskripsi lengkap, challenges, solutions, link repo dan demo
    - Dapat ditutup dengan tombol close atau klik overlay
    - Keyboard accessible (focus trap, Escape untuk tutup)
    - _Requirements: 3.4, 8.3_

  - [x] 8.5 Buat `src/components/software/ProjectFilter.tsx`
    - Tampilkan filter buttons untuk kategori: Web App, Mobile App, API, Open Source
    - Filter tanpa reload halaman (state management lokal)
    - Tampilkan EmptyState jika tidak ada proyek yang sesuai
    - _Requirements: 3.5, 3.6, 3.7_

  - [x] 8.6 Buat `src/app/software/page.tsx`
    - Rakit TechStackSection, ProjectFilter, dan daftar ProjectCard
    - Integrasikan ProjectModal untuk detail proyek
    - Tambahkan metadata SEO
    - _Requirements: 3.1, 3.5, 10.1_

  - [x]\* 8.7 Tulis unit tests untuk halaman Software Engineering
    - Test filter menampilkan hanya proyek yang sesuai kategori
    - Test EmptyState muncul ketika tidak ada proyek yang cocok
    - Test ProjectModal terbuka saat ProjectCard diklik
    - _File: `src/components/software/__tests__/`_
