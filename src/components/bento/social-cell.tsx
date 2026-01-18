'use client';

import { socialLinks } from '@/lib/data';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import type { IconType } from 'react-icons';
import { SiGithub, SiGmail, SiLinkedin, SiX, SiYoutube } from 'react-icons/si';

const iconMap: Record<string, IconType> = {
  github: SiGithub,
  linkedin: SiLinkedin,
  x: SiX,
  mail: SiGmail,
  youtube: SiYoutube,
};

export function SocialCell() {
  return (
    <div className='grid h-full overflow-y-auto'>
      {/* Social links - Horizontal layout */}
      <div className='flex items-center justify-start gap-2 sm:gap-3 md:gap-4 flex-wrap p-4 sm:p-6 md:p-8'>
        {socialLinks.map((link, index) => {
          const Icon = iconMap[link.icon] || ExternalLink;
          const accessibleName =
            link.name || (typeof link.icon === 'string' ? link.icon.toUpperCase() : 'Social link');

          return (
            <motion.a
              key={link.url || link.name || index}
              href={link.url}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={accessibleName}
              className={cn(
                'flex items-center gap-2 sm:gap-2.5 px-4 py-3 rounded-md',
                'bg-white/5 border border-white/15 transition-all duration-300 cursor-pointer',
                'hover:bg-white/10 hover:border-white/25 hover:shadow-lg group',
              )}
            >
              <Icon
                className='w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary transition-colors'
                aria-hidden='true'
              />
              {link.name && (
                <span className='text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors tracking-wider'>
                  {link.name}
                </span>
              )}
              {!link.name && <span className='sr-only'>{accessibleName}</span>}
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}
