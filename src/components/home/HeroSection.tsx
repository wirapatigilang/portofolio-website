"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// ============================================================
// Props
// ============================================================

export interface HeroSectionProps {
  owner: {
    name: string;
    tagline: string;
    profileImage: string;
  };
}

// ============================================================
// Animation variants — fade in + slide up
// ============================================================

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// ============================================================
// HeroSection component
// ============================================================

/**
 * Hero section for the home page.
 *
 * Displays the Owner's name (h1), profile photo (next/image), and tagline
 * that explicitly mentions both "Software Engineering" and "Creative Work"
 * domains. Entrance animation uses Framer Motion (fade in + slide up).
 *
 * Validates: Requirements 1.1, 1.6
 */
export default function HeroSection({ owner }: HeroSectionProps) {
  return (
    <section aria-label="Perkenalan" className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <motion.div className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center" variants={containerVariants} initial="hidden" animate="visible">
        {/* ── Profile image ── */}
        <motion.div variants={imageVariants} className="relative h-32 w-32 overflow-hidden rounded-full ring-2 ring-foreground/10 sm:h-40 sm:w-40">
          <Image src={owner.profileImage} alt={`Foto profil ${owner.name}`} fill sizes="(max-width: 640px) 128px, 160px" className="object-cover" priority unoptimized />
        </motion.div>

        {/* ── Name ── */}
        <motion.h1 variants={itemVariants} className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          {owner.name}
        </motion.h1>

        {/* ── Tagline ── */}
        <motion.p variants={itemVariants} className="max-w-2xl text-lg leading-relaxed text-foreground/70 sm:text-xl">
          {owner.tagline}
        </motion.p>

        {/* ── Domain badges ── */}
        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-3" aria-label="Bidang keahlian" role="group">
          <span className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-foreground/5 px-4 py-2 text-sm font-medium text-foreground">
            Software Engineering
          </span>
          <span className="text-foreground/30" aria-hidden="true">
            &amp;
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-foreground/5 px-4 py-2 text-sm font-medium text-foreground">
            Creative Work
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
