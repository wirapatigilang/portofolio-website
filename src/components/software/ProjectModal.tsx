"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import type { Project } from "@/types";
import { motion } from "framer-motion";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    modalRef.current?.focus();

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-background/80 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Content Card */}
      <motion.div
        ref={modalRef}
        tabIndex={-1}
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card border border-foreground/10 rounded-2xl shadow-2xl outline-none z-10"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-foreground/5 bg-card/95 backdrop-blur-md">
          <h2 id="modal-title" className="text-2xl font-bold line-clamp-1 tracking-tight">
            {project.name}
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Tutup modal">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </Button>
        </div>

        <div className="p-6 space-y-8">
          {project.thumbnail && (
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-foreground/5 shadow-sm">
              <Image src={project.thumbnail} alt={project.name} fill className="object-cover" sizes="(max-width: 1200px) 100vw, 1200px" />
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <Badge variant={project.category} label={project.category} />
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="default" label={tech} className="bg-foreground/[0.03] border border-foreground/[0.08]" />
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold border-b border-foreground/5 pb-2">About</h3>
            <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">{project.fullDescription}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold border-b border-foreground/5 pb-2">Challenges</h3>
              <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">{project.challenges}</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold border-b border-foreground/5 pb-2">Solutions</h3>
              <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">{project.solutions}</p>
            </div>
          </div>

          {(project.demoUrl || project.repositoryUrl) && (
            <div className="flex flex-wrap gap-4 pt-6 border-t border-foreground/5">
              {project.demoUrl && (
                <Button asChild>
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    Live Demo
                  </a>
                </Button>
              )}
              {project.repositoryUrl && (
                <Button variant="secondary" asChild>
                  <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer">
                    Repository
                  </a>
                </Button>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
