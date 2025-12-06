'use client';

import { Badge } from '@/components/ui/badge';
import { Project } from '@/lib/types';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Calendar, ExternalLink, Github } from 'lucide-react';
import { memo } from 'react';

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}

export const ProjectCard = memo(function ProjectCard({
  project,
  index,
  onClick,
}: ProjectCardProps) {
  return (
    <motion.article
      onClick={onClick}
      className={cn(
        'group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer',
        'bg-card/50 border border-white/15 backdrop-blur-sm',
        'hover:border-white/25 hover:bg-card/70 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300',
      )}
    >
      {/* Project image/placeholder */}
      <div className='relative h-40 sm:h-48 overflow-hidden'>
        <div className='absolute inset-0 bg-linear-to-br from-primary/30 via-primary/20 to-primary/10' />

        {/* Subtle pattern overlay */}
        <div className='absolute inset-0 opacity-20 grid-pattern' />

        {/* Project initial as placeholder */}
        <div className='absolute inset-0 flex items-center justify-center'>
          <span className='text-5xl sm:text-6xl font-bold text-primary/40 group-hover:scale-110 group-hover:text-primary/50 transition-all duration-300'>
            {project.title[0]}
          </span>
        </div>

        {/* Hover overlay */}
        <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3'>
          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              target='_blank'
              rel='noopener noreferrer'
              onClick={(e) => e.stopPropagation()}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className='w-11 h-11 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
              aria-label={`View ${project.title} live demo`}
            >
              <ExternalLink className='w-5 h-5' aria-hidden='true' />
            </motion.a>
          )}
          {project.githubUrl && (
            <motion.a
              href={project.githubUrl}
              target='_blank'
              rel='noopener noreferrer'
              onClick={(e) => e.stopPropagation()}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className='w-11 h-11 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
              aria-label={`View ${project.title} source code on GitHub`}
            >
              <Github className='w-5 h-5' aria-hidden='true' />
            </motion.a>
          )}
        </div>

        {/* Featured badge */}
        {project.featured && (
          <div className='absolute top-2 sm:top-3 left-2 sm:left-3'>
            <Badge
              variant='secondary'
              className='bg-primary/20 text-primary border-primary/30 text-xs sm:text-sm'
            >
              Featured
            </Badge>
          </div>
        )}

        {/* Year badge */}
        <div className='absolute top-2 sm:top-3 right-2 sm:right-3'>
          <Badge
            variant='outline'
            className='bg-black/30 backdrop-blur-sm border-white/15 text-xs sm:text-sm'
          >
            <Calendar className='w-3 h-3 mr-1' />
            {project.year}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className='flex-1 flex flex-col p-4 sm:p-5'>
        <h3 className='text-base sm:text-lg font-semibold mb-2 group-hover:text-primary transition-colors'>
          {project.title}
        </h3>

        <p className='text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 line-clamp-2 flex-1'>
          {project.description}
        </p>

        {/* Technologies */}
        <div className='flex flex-wrap gap-1 sm:gap-1.5'>
          {project.technologies.slice(0, 4).map((tech) => (
            <Badge
              key={tech}
              variant='outline'
              className='text-xs sm:text-sm bg-white/5 border-white/150'
            >
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 4 && (
            <Badge variant='outline' className='text-xs sm:text-sm bg-white/5 border-white/15'>
              +{project.technologies.length - 4}
            </Badge>
          )}
        </div>
      </div>
    </motion.article>
  );
});
