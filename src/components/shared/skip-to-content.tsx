/**
 * Skip to content link for keyboard navigation accessibility
 * Allows users to skip navigation and jump directly to main content
 * Always rendered but visually hidden until focused (for screen reader compatibility)
 */
export function SkipToContent() {
  return (
    <a
      href='#main-content'
      className='sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:shadow-lg'
    >
      Skip to main content
    </a>
  );
}

