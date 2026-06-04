import React from "react";
import Image from "next/image";
import Badge from "@/components/ui/Badge";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  // Truncate description to 150 characters
  const description = project.description.length > 150 ? project.description.substring(0, 147) + "..." : project.description;

  return (
    <button
      onClick={() => onClick(project)}
      className="flex flex-col text-left text-foreground bg-card border rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label={`Lihat detail proyek ${project.name}`}
    >
      <div className="relative w-full aspect-video bg-muted border-b">
        {project.thumbnail ? (
          <Image src={project.thumbnail} alt={`Thumbnail proyek ${project.name}`} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            <svg className="w-12 h-12 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>
      <div className="flex flex-col flex-grow p-5">
        <div className="flex justify-between items-start gap-4 mb-2">
          <h3 className="text-xl font-bold line-clamp-1">{project.name}</h3>
          <Badge variant={project.category} label={project.category} />
        </div>
        <p className="text-muted-foreground text-sm flex-grow mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.techStack.map((tech) => (
            <Badge key={tech} variant="default" label={tech} />
          ))}
        </div>
      </div>
    </button>
  );
}
