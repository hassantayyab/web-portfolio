'use client';

import { Button } from '@/components/ui/button';
import { navigationItems, personalInfo } from '@/lib/data';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check admin authentication status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/session');
        const data = await response.json();
        setIsAdmin(data.authenticated === true);
      } catch (error) {
        console.error('Auth check error:', error);
        setIsAdmin(false);
      }
    };

    checkAuth();
  }, []);

  // Split name for styling (first name bold, last name italic)
  const nameParts = personalInfo.name.split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');

  return (
    <>
      <motion.header
        initial={false}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled ? 'py-2' : 'py-4',
        )}
      >
        <nav
          className={cn(
            'mx-4 md:mx-5 flex items-center justify-between px-4 md:px-6 py-3 rounded-2xl border border-white/15 backdrop-blur-xl transition-all duration-300',
            isScrolled ? 'bg-background/80 shadow-lg shadow-black/20' : 'bg-background/50',
          )}
          aria-label='Main navigation'
        >
          {/* Logo/Name - Left Side */}
          <Link href='/' className='flex items-center gap-1 group cursor-pointer'>
            <span className='text-lg font-bold tracking-tight group-hover:text-primary transition-colors'>
              {firstName}
            </span>
            <span className='text-lg italic font-light text-muted-foreground group-hover:text-primary/80 transition-colors'>
              {lastName}
            </span>
          </Link>

          {/* Desktop Navigation - Right Side */}
          <div className='hidden md:flex items-center gap-1'>
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative px-4 py-2 text-sm font-medium rounded-full transition-colors min-h-[44px] flex items-center cursor-pointer',
                    isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId='navbar-active'
                      className='absolute inset-0 bg-white/15 rounded-full'
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className='relative z-10'>{item.name}</span>
                </Link>
              );
            })}
            {isAdmin && (
              <Link
                href='/admin/blog-editor'
                className={cn(
                  'relative px-4 py-2 text-sm font-medium rounded-full transition-colors min-h-[44px] flex items-center cursor-pointer',
                  pathname === '/admin/blog-editor' || pathname.startsWith('/admin/blog-editor/')
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {(pathname === '/admin/blog-editor' || pathname.startsWith('/admin/blog-editor/')) && (
                  <motion.span
                    layoutId='navbar-active'
                    className='absolute inset-0 bg-white/15 rounded-full'
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className='relative z-10'>Admin</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className='flex md:hidden items-center gap-2'>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className='h-9 w-9 rounded-full'
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls='mobile-menu'
            >
              {isMobileMenuOpen ? (
                <X className='w-4 h-4' aria-hidden='true' />
              ) : (
                <Menu className='w-4 h-4' aria-hidden='true' />
              )}
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              id='mobile-menu'
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className='mx-4 mt-2 py-2 rounded-2xl border border-white/15 bg-background/90 backdrop-blur-xl shadow-xl md:hidden'
              aria-label='Mobile navigation'
            >
              {navigationItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      'flex items-center px-4 py-3.5 text-sm transition-colors min-h-[44px] cursor-pointer',
                      isActive
                        ? 'text-foreground bg-white/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-white/5',
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
              {isAdmin && (
                <Link
                  href='/admin/blog-editor'
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center px-4 py-3.5 text-sm transition-colors min-h-[44px] cursor-pointer',
                    pathname === '/admin/blog-editor' || pathname.startsWith('/admin/blog-editor/')
                      ? 'text-foreground bg-white/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/5',
                  )}
                >
                  Admin
                </Link>
              )}
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
