'use client';

import { useEffect, useState } from 'react';

/**
 * Skip to content link for keyboard navigation accessibility
 * Allows users to skip navigation and jump directly to main content
 */
export function SkipToContent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Show skip link when Tab is pressed (first keyboard interaction)
      if (e.key === 'Tab' && !isVisible) {
        setIsVisible(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <a
      href='#main-content'
      className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-100 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
    >
      Skip to main content
    </a>
  );
}



