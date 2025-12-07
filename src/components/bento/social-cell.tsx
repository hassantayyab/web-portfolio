'use client';

import { socialLinks } from '@/lib/data';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { SiGithub, SiGmail, SiLinkedin, SiX } from 'react-icons/si';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  github: SiGithub,
  linkedin: SiLinkedin,
  x: SiX,
  mail: SiGmail,
};

export function SocialCell() {
  return (
    <div className='relative min-h-[120px] md:min-h-0 h-full flex flex-col justify-center p-4 sm:p-6 md:p-8 overflow-hidden'>
      {/* Social links - Horizontal layout */}
      <div className='flex items-center gap-2 sm:gap-3 md:gap-4 flex-wrap'>
        {socialLinks.map((link, index) => {
          const Icon = iconMap[link.icon] || ExternalLink;

          return (
            <motion.a
              key={link.name}
              href={link.url}
              target='_blank'
              rel='noopener noreferrer'
              className={cn(
                'flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 md:px-5 lg:px-6 py-2.5 sm:py-3 md:py-3.5 rounded-xl min-h-[44px]',
                'bg-white/5 border border-white/15 transition-all duration-300 cursor-pointer',
                'hover:bg-white/10 hover:border-white/25 hover:shadow-lg group',
              )}
            >
              <Icon className='w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary transition-colors' />
              {link.name && (
                <span className='text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors tracking-wider'>
                  {link.name}
                </span>
              )}
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}
