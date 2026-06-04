"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import type { Project } from "@/types";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (project) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
      // Basic focus trap could be added here
      modalRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-background/80 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      <div ref={modalRef} tabIndex={-1} className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card border rounded-2xl shadow-xl outline-none">
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b bg-card/95 backdrop-blur-sm">
          <h2 id="modal-title" className="text-2xl font-bold line-clamp-1">
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
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border">
              <Image src={project.thumbnail} alt={project.name} fill className="object-cover" sizes="(max-width: 1200px) 100vw, 1200px" />
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <Badge variant={project.category} label={project.category} />
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="default" label={tech} />
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">About</h3>
            <p className="text-muted-foreground whitespace-pre-wrap">{project.fullDescription}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Challenges</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">{project.challenges}</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Solutions</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">{project.solutions}</p>
            </div>
          </div>

          {(project.demoUrl || project.repositoryUrl) && (
            <div className="flex flex-wrap gap-4 pt-4 border-t">
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
      </div>
    </div>
  );
}
