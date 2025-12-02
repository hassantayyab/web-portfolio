'use client';

import { skills } from '@/lib/data';
import { getSkillIcon } from '@/lib/skill-icons';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export function SkillsCell() {
  // Get first 12 skills for display (4 cols x 3 rows)
  const displaySkills = skills.slice(0, 12);

  return (
    <div className='relative h-full flex flex-col p-4 md:p-6 overflow-hidden'>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className='mb-2 md:mb-3'
      >
        <h3 className='text-sm md:text-sm font-medium text-muted-foreground uppercase tracking-wider'>
          Tech Stack
        </h3>
      </motion.div>

      {/* Skills grid */}
      <div className='flex-1 grid grid-cols-4 grid-rows-3 gap-2 md:gap-3 h-full'>
        {displaySkills.map((skill, index) => {
          const IconComponent = getSkillIcon(skill.icon);

          return (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className='group relative flex flex-col items-center justify-center gap-1.5 h-full'
            >
              <div
                className={cn(
                  'w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center',
                  'bg-white/5 border border-white/15 transition-all duration-300',
                  'group-hover:bg-white/10 group-hover:border-white/25 group-hover:shadow-lg group-hover:shadow-primary/10',
                )}
              >
                <IconComponent className='w-5 h-5 md:w-6 md:h-6 text-muted-foreground group-hover:text-primary transition-colors' />
              </div>

              {/* Skill name - always visible */}
              <span className='text-sm md:text-sm text-muted-foreground/80 group-hover:text-foreground transition-colors text-center leading-tight'>
                {skill.name}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
