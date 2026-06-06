"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { OwnerData, ExperienceEntry } from "@/types";
import CTAButton from "@/components/ui/CTAButton";

interface AboutClientProps {
  owner: OwnerData;
  experiences: ExperienceEntry[];
}

// Format date from 'YYYY-MM' to 'Month Year' in ID locale
const formatDate = (dateString: string | undefined) => {
  if (!dateString) return "Now";
  const [year, month] = dateString.split("-");
  const date = new Date(Number(year), Number(month) - 1);
  return new Intl.DateTimeFormat("id-ID", { month: "long", year: "numeric" }).format(date);
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.92, rotate: -2 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function AboutClient({ owner, experiences }: AboutClientProps) {
  return (
    <div className="space-y-24">
      {/* ── Header Section ── */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center"
      >
        <div className="order-2 flex flex-col items-center text-center md:order-1 md:items-start md:text-left">
          <motion.h1 
            variants={itemVariants} 
            className="mb-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl bg-gradient-to-r from-foreground via-foreground/90 to-foreground/75 bg-clip-text text-transparent"
          >
            Tentang Saya
          </motion.h1>
          <motion.p 
            variants={itemVariants} 
            className="mb-6 text-xl text-muted-foreground leading-relaxed max-w-lg"
          >
            {owner.tagline}
          </motion.p>
          <motion.div 
            variants={itemVariants} 
            className="flex flex-wrap items-center justify-center gap-4 md:justify-start"
          >
            <CTAButton href={`mailto:${owner.email}`}>Contact Me</CTAButton>
            {owner.cvUrl && (
              <motion.a
                whileHover={{ scale: 1.03, backgroundColor: "var(--foreground)", color: "var(--background)" }}
                whileTap={{ scale: 0.98 }}
                href={owner.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-foreground/20 px-6 py-3 font-semibold text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background cursor-pointer"
                aria-label="Unduh CV (Buka di tab baru)"
              >
                Download CV
              </motion.a>
            )}
          </motion.div>
        </div>

        <motion.div 
          variants={imageVariants} 
          className="order-1 flex justify-center md:order-2 md:justify-end"
        >
          <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-full bg-foreground/5 ring-4 ring-foreground/5 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-500">
            <Image
              src={owner.profileImage}
              alt={`Foto ${owner.name}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
              priority
              unoptimized
            />
          </div>
        </motion.div>
      </motion.section>

      {/* ── Biography & Philosophy Section ── */}
      <section className="space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground">Biography</h2>
          <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
            {owner.biography.split("\n\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="relative rounded-2xl bg-foreground/[0.03] border border-foreground/5 p-8 sm:p-10 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          {/* Quote icon background ornament */}
          <div className="absolute right-6 top-4 text-foreground/[0.03] text-9xl font-serif pointer-events-none select-none">
            “
          </div>
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-foreground z-10 relative">Philosophy</h2>
          <p className="text-xl italic leading-relaxed text-foreground/80 z-10 relative font-medium">
            "{owner.philosophy}"
          </p>
        </motion.div>
      </section>

      {/* ── Experience Section ── */}
      <section className="relative">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-3xl font-bold tracking-tight text-foreground"
        >
          Experience
        </motion.h2>

        {/* Timeline container */}
        <div className="relative space-y-12 pl-6 md:pl-0">
          {/* Timeline Line */}
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true, margin: "-150px" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute left-1.5 top-2 bottom-2 w-[2px] bg-foreground/15 md:left-[24.8%]"
          />

          {experiences.map((exp, index) => (
            <motion.div 
              key={exp.id} 
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: index * 0.05, ease: "easeOut" }}
              className="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-12 relative"
            >
              {/* Timeline dot */}
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: [0, 1.3, 1] }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.05 + 0.2 }}
                className="absolute left-[-22px] top-1.5 h-3.5 w-3.5 rounded-full border-[2.5px] border-background bg-foreground md:left-[24.3%] shadow-sm"
              />

              <div className="md:col-span-1 md:text-right pt-0.5">
                <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/90">
                  {formatDate(exp.startDate)} — {formatDate(exp.endDate)}
                </p>
                <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-foreground/[0.04] border border-foreground/[0.08] px-2.5 py-0.5 text-xs font-semibold text-foreground/70 uppercase tracking-wide">
                  {exp.type === "work" ? "💼 Work" : "🎓 Education"}
                </div>
              </div>
              <div className="md:col-span-3">
                <h3 className="text-2xl font-extrabold text-foreground tracking-tight leading-none mb-1.5">{exp.title}</h3>
                <h4 className="mb-4 text-lg font-semibold text-foreground/60">{exp.organization}</h4>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
