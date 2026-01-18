'use client';

import { Chip } from '@/components/ui/chip';
import { ANIMATION_DURATIONS, PROJECT_LIMITS } from '@/lib/constants';
import { projects } from '@/lib/data';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Calendar, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';

export function ProjectsCell() {
  const featuredProjects = useMemo(() => {
    return projects
      .filter((p) => p.featured)
      .sort((a, b) => {
        const aYear = Number.parseInt(a.year, 10) || 0;
        const bYear = Number.parseInt(b.year, 10) || 0;
        return bYear - aYear;
      })
      .slice(0, PROJECT_LIMITS.FEATURED_ON_HOME);
  }, []);
  const [expandedId, setExpandedId] = useState<string | null>(featuredProjects[0]?.id || null);

  const toggleProject = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (featuredProjects.length === 0) {
    return (
      <div className='relative h-full flex flex-col items-center justify-center p-6 overflow-hidden'>
        <p className='text-body text-muted-foreground text-center'>
          No featured projects available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className='grid grid-rows-[auto_1fr] min-h-[400px] md:min-h-0 h-full'>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className='flex items-center justify-between px-4 pt-4 sm:px-5 sm:pt-5 md:px-6 md:pt-6 pb-2'
      >
        <h2 className='text-sm font-medium text-muted-foreground uppercase tracking-wider'>
          Featured Projects
        </h2>
        <Link
          href='/projects'
          className='flex items-center gap-1 text-sm text-primary group'
          aria-label='View all projects'
        >
          <span className='hidden sm:inline'>View All</span>
          <ArrowUpRight
            className='w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform'
            aria-hidden='true'
          />
        </Link>
      </motion.div>

      {/* Projects Accordion - scrollable area */}
      <div className='overflow-y-auto px-4 pb-4 sm:px-5 sm:pb-5 md:px-6 md:pb-6'>
        {featuredProjects.map((project, index) => {
          const isExpanded = expandedId === project.id;

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className='border-b border-white/15 last:border-b-0'
            >
              {/* Project Header - Always Visible */}
              <button
                onClick={() => toggleProject(project.id)}
                className={cn(
                  'w-full flex items-center justify-between py-3 sm:py-3.5 md:py-3 text-left group transition-colors min-h-[48px] cursor-pointer',
                  isExpanded ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                )}
                aria-expanded={isExpanded}
                aria-controls={`project-content-${project.id}`}
              >
                <span
                  className={cn(
                    'text-sm sm:text-base md:text-base font-medium transition-all line-clamp-1 pr-2',
                    isExpanded && 'text-foreground',
                  )}
                >
                  {project.title}
                </span>
                <ChevronDown
                  className={cn(
                    'w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ease-in-out shrink-0',
                    isExpanded && 'rotate-180',
                  )}
                  aria-hidden='true'
                />
              </button>

              {/* Expanded Content */}
              <AnimatePresence mode='wait'>
                {isExpanded && (
                  <motion.div
                    id={`project-content-${project.id}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: ANIMATION_DURATIONS.NORMAL, ease: 'easeInOut' }}
                    className='overflow-hidden'
                  >
                    <div className='pb-4 space-y-3'>
                      {/* Project Card */}
                      <div className='relative rounded-xl overflow-hidden bg-linear-to-br from-primary/10 via-primary/5 to-transparent border border-white/15 p-3 sm:p-4 md:p-5'>
                        {/* Year Badge */}
                        <div className='mb-2'>
                          <div className='flex items-center gap-1.5'>
                            <Calendar className='w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary' />
                            <span className='text-sm text-primary font-medium'>{project.year}</span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className='text-sm text-muted-foreground/90 line-clamp-2 sm:truncate mb-3'>
                          {project.description}
                        </p>

                        {/* Technologies */}
                        <div className='flex flex-wrap gap-1.5 mt-3'>
                          {project.technologies
                            .slice(0, PROJECT_LIMITS.TECH_PREVIEW)
                            .map((tech) => (
                              <Chip key={tech}>{tech}</Chip>
                            ))}
                          {project.technologies.length > PROJECT_LIMITS.TECH_PREVIEW && (
                            <Chip variant='primary'>
                              +{project.technologies.length - PROJECT_LIMITS.TECH_PREVIEW}
                            </Chip>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
