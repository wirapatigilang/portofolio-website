"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import type { OwnerData } from "@/types";
import ContactForm from "./ContactForm";

interface ContactClientProps {
  owner: OwnerData;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
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

const formContainerVariants = {
  hidden: { opacity: 0, scale: 0.96, x: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 25,
    },
  },
};

export function ContactClient({ owner }: ContactClientProps) {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 py-20 sm:px-6 lg:px-8 md:flex-row md:items-center text-foreground">
      {/* ── Left Side: Contact Information ── */}
      <motion.section variants={containerVariants} initial="hidden" animate="visible" className="flex-1 space-y-10" aria-labelledby="contact-heading">
        <div className="space-y-4">
          <motion.h1 variants={itemVariants} id="contact-heading" className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl bg-gradient-to-r from-foreground via-foreground/90 to-foreground/75 bg-clip-text text-transparent">
            Lets Colaborate
          </motion.h1>
          <motion.p variants={itemVariants} className="max-w-lg text-lg leading-relaxed text-muted-foreground">
            Have a project idea, a job opportunity, or just want to say hi? Feel free to fill out the form or contact me directly through the platforms below.
          </motion.p>
        </div>

        <motion.div variants={itemVariants} className="flex flex-col gap-8 sm:flex-row sm:gap-16">
          {/* Email Section */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-foreground/45">Email Utama</h2>
            <motion.a
              whileHover={{ scale: 1.02 }}
              className="group flex items-center gap-3 text-lg font-semibold text-foreground transition-all hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background rounded-md"
              aria-label="Kirim email ke Gilang"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground/5 group-hover:bg-blue-500/10 transition-colors">
                <Mail className="h-5 w-5 text-foreground/70 group-hover:text-blue-500 transition-colors" />
              </div>
              <span>{owner.email}</span>
            </motion.a>
          </div>

          {/* Social Media Section */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-foreground/45">Media Sosial</h2>
            <ul className="flex flex-wrap gap-3">
              {owner.socialLinks.map((social) => (
                <motion.li key={social.platform} whileHover={{ scale: 1.05, y: -1 }} whileTap={{ scale: 0.98 }}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-1.5 rounded-full border border-foreground/10 bg-foreground/5 px-4 py-2 text-sm font-medium text-foreground transition-all hover:bg-foreground/10 hover:border-foreground/30 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background"
                    aria-label={social.label}
                  >
                    {social.platform}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </motion.section>

      {/* ── Right Side: Contact Form Card ── */}
      <motion.section initial="hidden" animate="visible" variants={formContainerVariants} className="w-full md:w-[480px] shrink-0" aria-label="Formulir Kontak">
        <div className="relative rounded-3xl bg-card border border-foreground/5 p-6 shadow-2xl backdrop-blur-md sm:p-8 overflow-hidden hover:shadow-3xl transition-shadow duration-300">
          {/* Decorative Background Blurs */}
          <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl -z-10 pointer-events-none"></div>
          <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl -z-10 pointer-events-none"></div>

          <ContactForm />
        </div>
      </motion.section>
    </div>
  );
}
