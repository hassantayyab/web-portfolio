'use client';

import { ProjectCard, ProjectModal } from '@/components/projects';
import { PageLayout } from '@/components/shared/page-layout';
import { projects } from '@/lib/data';
import { Project } from '@/lib/types';
import { useMemo, useState } from 'react';

export default function ProjectsPageClient() {
  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => {
      const aYear = Number.parseInt(a.year, 10) || 0;
      const bYear = Number.parseInt(b.year, 10) || 0;
      return bYear - aYear;
    });
  }, []);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <PageLayout
        title='Projects'
        description='A selection of shipped client work and product builds across SaaS, AI, marketplaces, and mobile—happy to share deeper case studies on request.'
        maxWidth='7xl'
      >
        {/* Projects grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6'>
          {sortedProjects.map((project, index) => (
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
