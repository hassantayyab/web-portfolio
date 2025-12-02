"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ClientLayout } from "@/components/shared/client-layout";
import { ProjectCard, ProjectModal } from "@/components/projects";
import { projects } from "@/lib/data";
import { Project } from "@/lib/types";
import { PageLayout } from "@/components/shared/page-layout";

export default function ProjectsPageClient() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>("all");

  // Get unique technologies for filter
  const allTechnologies = Array.from(
    new Set(projects.flatMap((p) => p.technologies))
  ).sort();

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((p) => p.technologies.includes(filter));

  return (
    <ClientLayout>
      <PageLayout
        title="Projects"
        description="A collection of projects I've worked on, from web applications to open source contributions. Each project represents a unique challenge and learning experience."
        maxWidth="7xl"
      >

            {/* Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-8"
            >
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all min-h-[44px] ${
                    filter === "all"
                      ? "bg-primary text-primary-foreground"
                      : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
                  }`}
                >
                  All Projects
                </button>
                {allTechnologies.slice(0, 8).map((tech) => (
                  <button
                    key={tech}
                    onClick={() => setFilter(tech)}
                    className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all min-h-[44px] ${
                      filter === tech
                        ? "bg-primary text-primary-foreground"
                        : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
                    }`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Projects grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </div>

            {/* Empty state */}
            {filteredProjects.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-muted-foreground">
                  No projects found with the selected filter.
                </p>
                <button
                  onClick={() => setFilter("all")}
                  className="mt-4 text-primary hover:underline"
                >
                  Clear filter
                </button>
              </motion.div>
            )}
      </PageLayout>

      {/* Project modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </ClientLayout>
  );
}

