import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "project-001",
    name: "Campus Market",
    description: "A specialized campus marketplace featuring secure authentication, a relational rating system, and real-time product management.",
    fullDescription: `Campus Market is a full-stack e-commerce platform specifically engineered for university ecosystems. Built with Next.js and PostgreSQL, the application enables students to buy and sell items within a trusted community. 

Key technical implementations include a robust authentication system to ensure campus-only access, a relational database schema for transparent seller ratings, and a responsive UI tailored for both mobile and desktop users. The project focuses on data integrity and seamless user experience, utilizing Prisma ORM for type-safe database interactions and Tailwind CSS for a modern, minimalist aesthetic.`,
    challenges: "Mengelola state real-time untuk banyak pengguna secara bersamaan tanpa konflik data, serta memastikan performa tetap optimal saat jumlah task dan pengguna bertambah.",
    solutions: "Mengimplementasikan WebSocket dengan Socket.io untuk sinkronisasi real-time, optimistic UI updates untuk pengalaman yang responsif, dan Redis pub/sub untuk broadcast event antar server instances.",
    techStack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
    category: "Web App",
    repositoryUrl: "https://github.com/dapskuycode/PPL-CAMPUS-MARKET",
    demoUrl: "https://taskflow-demo.vercel.app",
    thumbnail: "/images/projects/campus-market.png",
    featured: true,
  },
];
