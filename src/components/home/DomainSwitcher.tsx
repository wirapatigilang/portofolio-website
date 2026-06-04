'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

// ============================================================
// Animation variants
// ============================================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
};

// ============================================================
// Domain entry point definitions
// ============================================================

interface DomainEntry {
  label: string;
  description: string;
  href: string;
  /** Decorative icon rendered as aria-hidden */
  icon: React.ReactNode;
}

const DOMAINS: DomainEntry[] = [
  {
    label: 'Software Engineering',
    description:
      'Proyek web & mobile, tech stack, dan pengalaman membangun produk digital.',
    href: '/software',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    label: 'Creative Work',
    description:
      'Portofolio fotografi, videografi, dan video editing — karya visual yang bercerita.',
    href: '/creative',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    ),
  },
];

// ============================================================
// DomainSwitcher component
// ============================================================

/**
 * Displays two domain entry points (Software Engineering & Creative Work)
 * that are visible in the viewport without scrolling.
 *
 * Each entry point is a Next.js Link that navigates to the corresponding
 * domain page. Both cards are visually distinct, keyboard accessible,
 * and meet the 44×44px minimum touch target requirement.
 *
 * Validates: Requirements 1.2, 1.3
 */
export default function DomainSwitcher() {
  return (
    <section
      aria-label="Pilih domain"
      className="w-full"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
      >
        {DOMAINS.map((domain) => (
          <motion.div key={domain.href} variants={cardVariants}>
            <Link
              href={domain.href}
              aria-label={`Lihat portofolio ${domain.label}`}
              className={[
                // Layout & sizing — ensures ≥44px touch target on all sides
                'group flex flex-col gap-4 p-6 sm:p-8 rounded-xl',
                'min-h-[44px]',
                // Border & background
                'border border-foreground/15 bg-foreground/[0.03]',
                // Hover state
                'hover:border-foreground/40 hover:bg-foreground/[0.06]',
                // Transition
                'transition-all duration-200 ease-out',
                // Focus indicator — visible 2px ring (Requirement 8.3)
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2',
              ].join(' ')}
            >
              {/* Icon */}
              <span
                className={[
                  'inline-flex items-center justify-center w-12 h-12 rounded-lg',
                  'bg-foreground/10 text-foreground',
                  'group-hover:bg-foreground/15 transition-colors duration-200',
                ].join(' ')}
              >
                {domain.icon}
              </span>

              {/* Label */}
              <span className="flex flex-col gap-1.5">
                <span className="text-lg font-semibold text-foreground leading-snug">
                  {domain.label}
                </span>
                <span className="text-sm text-foreground/60 leading-relaxed">
                  {domain.description}
                </span>
              </span>

              {/* Arrow indicator */}
              <span
                className={[
                  'mt-auto inline-flex items-center gap-1.5',
                  'text-sm font-medium text-foreground/50',
                  'group-hover:text-foreground group-hover:gap-2.5',
                  'transition-all duration-200',
                ].join(' ')}
                aria-hidden="true"
              >
                Lihat portofolio
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
