'use client';

import { useEffect } from 'react';
import { initWebVitals } from '@/lib/web-vitals';

/**
 * Client component to initialize Web Vitals tracking
 */
export function WebVitalsScript() {
  useEffect(() => {
    initWebVitals();
  }, []);

  return null;
}

