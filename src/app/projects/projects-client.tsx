'use client';

import { ProjectCard, ProjectModal } from '@/components/projects';
import { PageLayout } from '@/components/shared/page-layout';
import { projects } from '@/lib/data';
import { Project } from '@/lib/types';
import { useState } from 'react';

export default function ProjectsPageClient() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <PageLayout
        title='Projects'
        description="A collection of projects I've worked on, from web applications to open source contributions. Each project represents a unique challenge and learning experience."
        maxWidth='7xl'
      >
        {/* Projects grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6'>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </PageLayout>

      {/* Project modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
}
