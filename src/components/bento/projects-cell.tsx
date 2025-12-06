'use client';

import { ANIMATION_DURATIONS, PROJECT_LIMITS } from '@/lib/constants';
import { projects } from '@/lib/data';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Calendar, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';

export function ProjectsCell() {
  const featuredProjects = useMemo(
    () => projects.filter((p) => p.featured).slice(0, PROJECT_LIMITS.FEATURED_ON_HOME),
    [],
  );
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
    <div className='relative min-h-[400px] md:min-h-0 h-full flex flex-col overflow-hidden'>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className='flex items-center justify-between p-4 sm:p-5 md:p-5 pb-0'
      >
        <h3 className='text-sm font-medium text-muted-foreground uppercase tracking-wider'>
          Featured Projects
        </h3>
        <Link
          href='/projects'
          className='flex items-center gap-1 text-sm text-primary group min-h-[44px] justify-end'
          aria-label='View all projects'
        >
          <span className='hidden sm:inline'>View All</span>
          <ArrowUpRight
            className='w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform'
            aria-hidden='true'
          />
        </Link>
      </motion.div>

      {/* Projects Accordion */}
      <div className='flex-1 flex flex-col p-4 sm:p-5 md:p-6 pt-3 overflow-hidden'>
        {featuredProjects.map((project, index) => {
          const isExpanded = expandedId === project.id;

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={cn(
                'border-b border-white/15 last:border-b-0',
                isExpanded ? 'flex-1 min-h-0' : 'flex-none',
              )}
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
                            <span className='text-xs sm:text-sm text-primary font-medium'>{project.year}</span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className='text-xs sm:text-sm text-muted-foreground/90 line-clamp-2 sm:line-clamp-3 mb-3'>
                          {project.description}
                        </p>

                        {/* Technologies */}
                        <div className='flex flex-wrap gap-1 sm:gap-1.5 mt-3'>
                          {project.technologies
                            .slice(0, PROJECT_LIMITS.TECH_PREVIEW)
                            .map((tech) => (
                              <span
                                key={tech}
                                className='text-xs sm:text-sm px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-white/5 text-muted-foreground/80 border border-white/10 hover:bg-white/10 hover:border-white/15 transition-colors'
                              >
                                {tech}
                              </span>
                            ))}
                          {project.technologies.length > PROJECT_LIMITS.TECH_PREVIEW && (
                            <span className='text-xs sm:text-sm px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-primary/10 text-primary/90 border border-primary/25'>
                              +{project.technologies.length - PROJECT_LIMITS.TECH_PREVIEW}
                            </span>
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
