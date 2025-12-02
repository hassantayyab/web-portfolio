'use client';

import { personalInfo, skills } from '@/lib/data';
import { getSkillIcon } from '@/lib/skill-icons';
import { motion } from 'framer-motion';

export function HeroCell() {
  const words = personalInfo.title.split(' ');
  // Get first 6 skills for display in hero
  const displaySkills = skills.slice(0, 6);

  return (
    <div className='relative h-full flex flex-col justify-between p-6 md:p-8 overflow-hidden'>
      {/* Background gradient */}
      <div className='absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-50' />

      {/* Animated grid pattern */}
      <div className='absolute inset-0 grid-pattern opacity-30' />

      <div className='relative z-10'>
        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className='text-sm md:text-base text-primary font-medium mb-2'
        >
          Hello, I&apos;m
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='text-3xl md:text-4xl lg:text-5xl font-bold mb-3 tracking-tight'
        >
          {personalInfo.name}
        </motion.h1>

        {/* Animated title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className='flex flex-wrap gap-2 text-lg md:text-xl lg:text-2xl text-muted-foreground'
        >
          {words.map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
              className='inline-block'
            >
              {word}
            </motion.span>
          ))}
        </motion.div>

        {/* Short bio */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className='mt-4 text-sm md:text-base text-muted-foreground/80 max-w-md'
        >
          {personalInfo.shortBio}
        </motion.p>
      </div>

      {/* Skills Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
        className='relative z-10 flex items-center gap-3 md:gap-4 flex-wrap'
      >
        {displaySkills.map((skill, index) => {
          const IconComponent = getSkillIcon(skill.icon);

          return (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 1 + index * 0.05 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className='group flex items-center gap-1.5 px-2.5 py-1.5 md:px-3 md:py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300'
            >
              <IconComponent className='w-4 h-4 md:w-5 md:h-5 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0' />
              <span className='text-sm md:text-sm text-muted-foreground/80 group-hover:text-foreground transition-colors font-medium'>
                {skill.name}
              </span>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Decorative element */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.5 }}
        transition={{ duration: 1, delay: 0.5 }}
        className='absolute -right-20 -bottom-20 w-60 h-60 rounded-full bg-primary/20 blur-3xl'
      />
    </div>
  );
}
