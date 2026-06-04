"use client";

import React, { useState, useMemo } from "react";
import { TechStackSection } from "./TechStackSection";
import { ProjectFilter } from "./ProjectFilter";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import EmptyState from "@/components/ui/EmptyState";
import { filterProjects } from "@/lib/utils";
import { projects as softwareProjects } from "@/data/projects";
import type { Project, ProjectCategory } from "@/types";

const CATEGORIES: ProjectCategory[] = ["Web App", "Mobile App", "API", "Open Source"];

export function SoftwareClient() {
  const [currentCategory, setCurrentCategory] = useState<ProjectCategory | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => filterProjects(softwareProjects, currentCategory), [currentCategory]);

  return (
    <>
      <TechStackSection />

      <section className="py-12">
        <h2 className="text-3xl font-bold mb-8">Featured Projects</h2>

        <ProjectFilter categories={CATEGORIES} currentCategory={currentCategory} onChangeCategory={setCurrentCategory} />

        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} onClick={setSelectedProject} />
            ))}
          </div>
        ) : (
          <EmptyState itemLabel="proyek" onReset={() => setCurrentCategory(null)} />
        )}
      </section>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
}
