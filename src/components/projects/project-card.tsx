'use client';

import { Badge } from '@/components/ui/badge';
import { Project } from '@/lib/types';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Calendar, ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}

export function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      onClick={onClick}
      className={cn(
        'group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer',
        'bg-card/50 border border-white/10 backdrop-blur-sm',
        'hover:border-white/20 hover:bg-card/70 transition-all duration-300',
      )}
    >
      {/* Project image/placeholder */}
      <div className='relative h-48 overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/20 to-primary/10' />

        {/* Project initial as placeholder */}
        <div className='absolute inset-0 flex items-center justify-center'>
          <span className='text-6xl font-bold text-primary/30 group-hover:scale-110 transition-transform duration-300'>
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
              className='w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors'
            >
              <ExternalLink className='w-5 h-5' />
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
              className='w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors'
            >
              <Github className='w-5 h-5' />
            </motion.a>
          )}
        </div>

        {/* Featured badge */}
        {project.featured && (
          <div className='absolute top-3 left-3'>
            <Badge
              variant='secondary'
              className='bg-primary/20 text-primary border-primary/30 text-sm'
            >
              Featured
            </Badge>
          </div>
        )}

        {/* Year badge */}
        <div className='absolute top-3 right-3'>
          <Badge variant='outline' className='bg-black/30 backdrop-blur-sm border-white/10 text-sm'>
            <Calendar className='w-3 h-3 mr-1' />
            {project.year}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className='flex-1 flex flex-col p-5'>
        <h3 className='text-lg font-semibold mb-2 group-hover:text-primary transition-colors'>
          {project.title}
        </h3>

        <p className='text-sm text-muted-foreground mb-4 line-clamp-2 flex-1'>
          {project.description}
        </p>

        {/* Technologies */}
        <div className='flex flex-wrap gap-1.5'>
          {project.technologies.slice(0, 4).map((tech) => (
            <Badge
              key={tech}
              variant='outline'
              className='text-sm bg-white/5 border-white/10 hover:bg-white/10'
            >
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 4 && (
            <Badge variant='outline' className='text-sm bg-white/5 border-white/10'>
              +{project.technologies.length - 4}
            </Badge>
          )}
        </div>
      </div>
    </motion.article>
  );
}
