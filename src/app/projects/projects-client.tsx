"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ClientLayout } from "@/components/shared/client-layout";
import { ProjectCard, ProjectModal } from "@/components/projects";
import { projects } from "@/lib/data";
import { Project } from "@/lib/types";
import { PageTransition } from "@/components/shared";

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
      <main className="min-h-screen">
        {/* Background effects */}
        <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-primary/5 pointer-events-none" />
        <div className="fixed inset-0 dot-pattern opacity-30 pointer-events-none" />

        <PageTransition>
          <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-24 md:py-32">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Projects</h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                A collection of projects I&apos;ve worked on, from web applications
                to open source contributions. Each project represents a unique
                challenge and learning experience.
              </p>
            </motion.div>

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
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
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
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          </div>
        </PageTransition>

        {/* Project modal */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </main>
    </ClientLayout>
  );
}

