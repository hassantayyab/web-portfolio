/**
 * Web Vitals tracking for performance monitoring
 * Tracks Core Web Vitals and other performance metrics
 */

import { Metric, onCLS, onFCP, onFID, onINP, onLCP, onTTFB } from 'web-vitals';

type ReportHandler = (metric: Metric) => void;

/**
 * Send metrics to analytics endpoint
 */
function sendToAnalytics(metric: Metric) {
  // In production, send to your analytics service
  // Example: Google Analytics, Vercel Analytics, etc.

  if (process.env.NODE_ENV === 'production') {
    // Example: Send to Vercel Analytics
    // if (typeof window !== 'undefined' && (window as any).va) {
    //   (window as any).va('track', metric.name, metric.value);
    // }

    // Example: Send to custom analytics endpoint
    // fetch('/api/analytics', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(metric),
    // }).catch(console.error);

    // For now, log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Web Vitals]', metric);
    }
  }
}

/**
 * Initialize Web Vitals tracking
 */
export function initWebVitals(onPerfEntry?: ReportHandler) {
  if (typeof window === 'undefined') return;

  const reportHandler = onPerfEntry || sendToAnalytics;

  // Core Web Vitals
  onCLS(reportHandler);
  onFID(reportHandler);
  onFCP(reportHandler);
  onLCP(reportHandler);
  onTTFB(reportHandler);

  // Additional metrics (INP replaces FID in 2024)
  onINP(reportHandler);
}

/**
 * Get performance metrics summary
 */
export function getPerformanceSummary(): {
  navigation: PerformanceNavigationTiming | null;
  paint: PerformancePaintTiming[] | null;
  resource: PerformanceResourceTiming[] | null;
} {
  if (typeof window === 'undefined') {
    return {
      navigation: null,
      paint: null,
      resource: null,
    };
  }

  const navigation = performance.getEntriesByType('navigation')[0] as
    | PerformanceNavigationTiming
    | undefined;
  const paint = performance.getEntriesByType('paint') as PerformancePaintTiming[];
  const resource = performance.getEntriesByType('resource') as PerformanceResourceTiming[];

  return {
    navigation: navigation || null,
    paint: paint.length > 0 ? paint : null,
    resource: resource.length > 0 ? resource : null,
  };
}
