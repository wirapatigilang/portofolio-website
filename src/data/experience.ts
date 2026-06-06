import type { ExperienceEntry, Achievement } from "@/types";

export const experiences: ExperienceEntry[] = [
  {
    id: "exp-001",
    type: "work",
    title: "Software Engineer",
    organization: "PT Tokopedia (GoTo Group)",
    startDate: "2023-07",
    endDate: undefined, // present
    description:
      "Mengembangkan dan memelihara fitur-fitur pada platform e-commerce Tokopedia dengan fokus pada performa dan skalabilitas. Berkontribusi pada migrasi arsitektur dari monolith ke microservices, serta memimpin pengembangan fitur checkout yang meningkatkan conversion rate sebesar 12%.",
  },
  {
    id: "exp-002",
    type: "work",
    title: "Frontend Developer",
    organization: "PT Gojek Indonesia",
    startDate: "2022-01",
    endDate: "2023-06",
    description:
      "Membangun dan mengoptimasi komponen UI untuk aplikasi web Gojek menggunakan React dan TypeScript. Berkolaborasi dengan tim desain untuk mengimplementasikan design system yang konsisten, serta meningkatkan Lighthouse Performance score dari 65 menjadi 88 pada halaman utama.",
  },
  {
    id: "exp-003",
    type: "work",
    title: "Freelance Videographer & Video Editor",
    organization: "Self-employed",
    startDate: "2020-06",
    endDate: undefined, // present
    description:
      "Mengerjakan proyek videografi dan video editing secara freelance untuk berbagai klien: korporat, UMKM, dan event organizer. Portofolio mencakup video komersial, aftermovie acara, dan konten media sosial. Klien notable: TEDxUGM, beberapa brand lokal Yogyakarta, dan startup teknologi.",
  },
  {
    id: "exp-004",
    type: "work",
    title: "Junior Web Developer",
    organization: "CV Kreasi Digital Nusantara",
    startDate: "2021-03",
    endDate: "2021-12",
    description:
      "Mengembangkan website dan aplikasi web untuk klien UMKM dan startup lokal menggunakan React, Laravel, dan MySQL. Menangani lebih dari 10 proyek website dari tahap desain hingga deployment, dengan fokus pada responsivitas dan kemudahan penggunaan.",
  },
  {
    id: "exp-005",
    type: "education",
    title: "Informatics",
    organization: "Universitas Dipgonegoro",
    startDate: "2023-08",
    endDate: undefined,
    description: "",
  },
  {
    id: "exp-007",
    type: "education",
    title: "MAN 2 Mataram",
    organization: "MAN 2 Mataram",
    startDate: "2020-07",
    endDate: "2023-05",
    description: "",
  },
];

export const achievements: Achievement[] = [
  {
    id: "ach-001",
    title: "Best Capstone Project — Bangkit Academy 2021",
    issuer: "Google, GoTo, Traveloka (Bangkit Academy)",
    year: 2021,
    type: "award",
  },
  {
    id: "ach-002",
    title: "AWS Certified Developer — Associate",
    issuer: "Amazon Web Services",
    year: 2023,
    type: "certification",
  },
  {
    id: "ach-003",
    title: "Google Associate Android Developer",
    issuer: "Google",
    year: 2022,
    type: "certification",
  },
  {
    id: "ach-004",
    title: "Juara 2 Lomba Fotografi Tingkat Provinsi DIY",
    issuer: "Dinas Pendidikan Provinsi DIY",
    year: 2017,
    type: "award",
  },
  {
    id: "ach-005",
    title: "Kontributor Open Source — react-id-components mencapai 300+ GitHub Stars",
    issuer: "GitHub Community",
    year: 2024,
    type: "notable",
  },
  {
    id: "ach-006",
    title: "Meta Front-End Developer Professional Certificate",
    issuer: "Meta (via Coursera)",
    year: 2022,
    type: "certification",
  },
];
