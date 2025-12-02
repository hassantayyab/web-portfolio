"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Global error boundary component for root-level error handling
 * Catches errors that occur in the root layout
 */
export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log error to error reporting service (e.g., Sentry)
    console.error("Global error:", {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
    });

    // In production, send to error monitoring service
    // Example: Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen bg-background">
        <main className="min-h-screen flex items-center justify-center p-4">
          <div className="text-center max-w-md mx-auto">
            {/* Error Icon */}
            <div className="mb-8">
              <div className="w-20 h-20 mx-auto rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertCircle className="w-10 h-10 text-destructive" />
              </div>
            </div>

            {/* Error Message */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-4">
                Application Error
              </h1>
              <p className="text-muted-foreground mb-6">
                A critical error occurred. Please refresh the page or contact support if the problem persists.
              </p>
              {error.digest && (
                <p className="text-xs text-muted-foreground mb-6">
                  Error ID: {error.digest}
                </p>
              )}
            </div>

            {/* Reset Button */}
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh Page
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}

