'use client';

import { navigationItems, personalInfo, socialLinks } from '@/lib/data';
import { Command } from 'cmdk';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ExternalLink,
  FileText,
  FolderOpen,
  Github,
  Home,
  Linkedin,
  Mail,
  Twitter,
  User,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const runCommand = useCallback(
    (command: () => void) => {
      onOpenChange(false);
      command();
    },
    [onOpenChange],
  );

  useEffect(() => {
    if (!open) {
      setSearch('');
    }
  }, [open]);

  const getIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'home':
        return <Home className='w-4 h-4' />;
      case 'projects':
        return <FolderOpen className='w-4 h-4' />;
      case 'about':
        return <User className='w-4 h-4' />;
      case 'github':
        return <Github className='w-4 h-4' />;
      case 'linkedin':
        return <Linkedin className='w-4 h-4' />;
      case 'twitter':
        return <Twitter className='w-4 h-4' />;
      case 'email':
        return <Mail className='w-4 h-4' />;
      default:
        return <ExternalLink className='w-4 h-4' />;
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onOpenChange(false)}
            className='fixed inset-0 z-50 bg-black/50 backdrop-blur-sm'
          />

          {/* Command Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className='fixed left-1/2 top-[20%] z-50 w-full max-w-lg -translate-x-1/2'
          >
            <Command
              className='rounded-2xl border border-white/10 bg-background/95 backdrop-blur-xl shadow-2xl overflow-hidden'
              loop
            >
              <div className='flex items-center border-b border-white/10 px-4'>
                <Command.Input
                  value={search}
                  onValueChange={setSearch}
                  placeholder='Type a command or search...'
                  className='flex h-14 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground'
                />
                <kbd className='pointer-events-none h-5 select-none items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 font-mono text-xs font-medium text-muted-foreground hidden sm:inline-flex'>
                  ESC
                </kbd>
              </div>

              <Command.List className='max-h-[300px] overflow-y-auto p-2'>
                <Command.Empty className='py-6 text-center text-sm text-muted-foreground'>
                  No results found.
                </Command.Empty>

                {/* Navigation */}
                <Command.Group heading='Navigation' className='px-2'>
                  {navigationItems.map((item) => (
                    <Command.Item
                      key={item.href}
                      value={item.name}
                      onSelect={() => runCommand(() => router.push(item.href))}
                      className='flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg cursor-pointer text-muted-foreground data-[selected=true]:bg-white/10 data-[selected=true]:text-foreground transition-colors'
                    >
                      {getIcon(item.name)}
                      <span>{item.name}</span>
                    </Command.Item>
                  ))}
                </Command.Group>

                {/* Actions */}
                <Command.Group heading='Actions' className='px-2 mt-2'>
                  <Command.Item
                    value='contact email'
                    onSelect={() =>
                      runCommand(() => window.open(`mailto:${personalInfo.email}`, '_blank'))
                    }
                    className='flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg cursor-pointer text-muted-foreground data-[selected=true]:bg-white/10 data-[selected=true]:text-foreground transition-colors'
                  >
                    <Mail className='w-4 h-4' />
                    <span>Send Email</span>
                  </Command.Item>
                  {personalInfo.resumeUrl && (
                    <Command.Item
                      value='download resume cv'
                      onSelect={() =>
                        runCommand(() => window.open(personalInfo.resumeUrl, '_blank'))
                      }
                      className='flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg cursor-pointer text-muted-foreground data-[selected=true]:bg-white/10 data-[selected=true]:text-foreground transition-colors'
                    >
                      <FileText className='w-4 h-4' />
                      <span>Download Resume</span>
                    </Command.Item>
                  )}
                </Command.Group>

                {/* Social Links */}
                <Command.Group heading='Social' className='px-2 mt-2'>
                  {socialLinks
                    .filter((link) => link.icon !== 'mail')
                    .map((link) => (
                      <Command.Item
                        key={link.name}
                        value={link.name}
                        onSelect={() => runCommand(() => window.open(link.url, '_blank'))}
                        className='flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg cursor-pointer text-muted-foreground data-[selected=true]:bg-white/10 data-[selected=true]:text-foreground transition-colors'
                      >
                        {getIcon(link.icon)}
                        <span>{link.name}</span>
                        <ExternalLink className='w-3 h-3 ml-auto opacity-50' />
                      </Command.Item>
                    ))}
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
