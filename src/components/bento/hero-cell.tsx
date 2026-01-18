'use client';

import { ANIMATION_DELAYS, ANIMATION_DURATIONS } from '@/lib/constants';
import { personalInfo, skills } from '@/lib/data';
import { getSkillIcon } from '@/lib/skill-icons';
import { motion } from 'framer-motion';
import { useMemo } from 'react';

export function HeroCell() {
  const words = useMemo(() => personalInfo.title.split(' '), []);
  const viewableSkills = ['angular', 'ngrx', 'tailwind', 'typescript', 'ux-design'];
  const displaySkills = useMemo(
    () => skills.filter((skill) => viewableSkills.includes(skill.icon)),
    [],
  );

  return (
    <div className='relative min-h-[400px] md:min-h-0 md:h-full overflow-hidden'>
      {/* Background gradient */}
      <div className='absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-transparent opacity-50' />

      {/* Animated grid pattern */}
      <div className='absolute inset-0 grid-pattern opacity-30' />

      {/* Decorative element - positioned here so it's clipped by overflow-hidden */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.5 }}
        transition={{ duration: 1, delay: 0.5 }}
        className='absolute -right-20 -bottom-20 w-60 h-60 rounded-full bg-primary/10 blur-3xl pointer-events-none'
      />

      {/* Scrollable content wrapper */}
      <div className='relative z-10 h-full flex flex-col justify-between p-4 sm:p-6 md:p-8 overflow-y-auto'>
        <div>
        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: ANIMATION_DURATIONS.SLOW, delay: ANIMATION_DELAYS.INITIAL }}
          className='text-sm md:text-base text-muted-foreground font-medium mb-2'
        >
          Hello, I&apos;m
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: ANIMATION_DURATIONS.SLOW, delay: ANIMATION_DELAYS.SHORT }}
          className='text-display font-bold mb-3 tracking-tight wrap-break-word'
        >
          {personalInfo.name}
        </motion.h1>

        {/* Animated title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: ANIMATION_DURATIONS.SLOW, delay: ANIMATION_DELAYS.MEDIUM }}
          className='flex flex-wrap gap-2 text-lg md:text-xl lg:text-2xl text-primary'
        >
          {words.map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: ANIMATION_DURATIONS.NORMAL,
                delay: ANIMATION_DELAYS.LONG + index * ANIMATION_DELAYS.STAGGER,
              }}
              className='inline-block'
            >
              {word}
            </motion.span>
          ))}
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: ANIMATION_DURATIONS.SLOW, delay: 0.7 }}
          className='my-4 text-base sm:text-lg text-muted-foreground/80 sm:max-w-xl text-pretty'
        >
          {personalInfo.bio}
        </motion.p>
        </div>

        {/* Skills Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: ANIMATION_DURATIONS.SLOW, delay: 0.9 }}
          className='flex items-center gap-2 md:gap-3 lg:gap-4 flex-wrap mt-4 md:mt-0'
        >
          {displaySkills.map((skill, index) => {
            const IconComponent = getSkillIcon(skill.icon);

            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: ANIMATION_DURATIONS.NORMAL,
                  delay: 1 + index * ANIMATION_DELAYS.STAGGER,
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                className='group flex items-center gap-1.5 px-2 py-1.5 sm:px-2.5 sm:py-1.5 md:px-3 md:py-2 rounded-lg bg-white/5 border border-white/15 hover:bg-white/10 hover:border-white/25 hover:shadow-md transition-all duration-300 min-h-[36px]'
              >
                <IconComponent
                  className='w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-muted-foreground group-hover:text-foreground transition-colors shrink-0'
                  aria-hidden='true'
                />
                <span className='text-sm md:text-sm text-muted-foreground/80 group-hover:text-foreground transition-colors font-medium'>
                  {skill.name}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
