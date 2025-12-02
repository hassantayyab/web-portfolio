'use client';

import { socialLinks } from '@/lib/data';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Linkedin, Mail, Twitter } from 'lucide-react';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  mail: Mail,
};

export function SocialCell() {
  return (
    <div className='relative h-full flex flex-col justify-center p-6 md:p-8 overflow-hidden'>
      {/* Social links - Horizontal layout */}
      <div className='flex items-center gap-3 md:gap-4 flex-wrap'>
        {socialLinks.map((link, index) => {
          const Icon = iconMap[link.icon] || ExternalLink;

          return (
            <motion.a
              key={link.name}
              href={link.url}
              target='_blank'
              rel='noopener noreferrer'
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ y: -2, scale: 1.02 }}
              className={cn(
                'flex items-center gap-2.5 px-5 md:px-6 py-3 md:py-3.5 rounded-xl min-h-[44px]',
                'bg-white/5 border border-white/15 transition-all duration-300',
                'hover:bg-white/10 hover:border-white/25 hover:shadow-lg group',
              )}
            >
              <Icon className='w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors' />
              <span className='text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors uppercase tracking-wider'>
                {link.name}
              </span>
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}
