"use client";

import React from "react";
import Image from "next/image";
import Badge from "@/components/ui/Badge";
import type { Project } from "@/types";
import { motion } from "framer-motion";

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  // Truncate description to 150 characters
  const description = project.description.length > 150 ? project.description.substring(0, 147) + "..." : project.description;

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(project)}
      className="group flex flex-col text-left text-foreground bg-card border border-foreground/5 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-foreground/15 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer h-full w-full"
      aria-label={`Lihat detail proyek ${project.name}`}
    >
      <div className="relative w-full aspect-video bg-muted border-b border-foreground/5 overflow-hidden">
        {project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt={`Thumbnail proyek ${project.name}`}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30 bg-muted/40">
            <svg className="w-12 h-12 transition-transform duration-500 ease-out group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>
      <div className="flex flex-col flex-grow p-6">
        <div className="flex justify-between items-start gap-4 mb-3">
          <h3 className="text-xl font-bold line-clamp-1 tracking-tight group-hover:text-foreground/90 transition-colors duration-300">
            {project.name}
          </h3>
          <Badge variant={project.category} label={project.category} className="shrink-0" />
        </div>
        <p className="text-muted-foreground text-sm flex-grow mb-6 leading-relaxed">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.techStack.map((tech) => (
            <Badge key={tech} variant="default" label={tech} className="bg-foreground/[0.03] border border-foreground/[0.08]" />
          ))}
        </div>
      </div>
    </motion.button>
  );
}
