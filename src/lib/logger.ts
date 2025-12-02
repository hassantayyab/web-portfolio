/**
 * Environment-aware logging utility
 * Provides structured logging with different levels for development and production
 */

interface LogContext {
  [key: string]: unknown;
}

class Logger {
  private isDevelopment = typeof process !== 'undefined' && process.env?.NODE_ENV === 'development';
  private isProduction = typeof process !== 'undefined' && process.env?.NODE_ENV === 'production';

  /**
   * Log info messages (development only)
   */
  info(message: string, context?: LogContext): void {
    if (this.isDevelopment) {
      console.log(`[INFO] ${message}`, context || '');
    }
  }

  /**
   * Log warning messages
   */
  warn(message: string, context?: LogContext): void {
    if (this.isDevelopment) {
      console.warn(`[WARN] ${message}`, context || '');
    }
    // In production, send to error monitoring service
    // Example: Sentry.captureMessage(message, { level: 'warning', extra: context });
  }

  /**
   * Log error messages
   */
  error(message: string, error?: Error | unknown, context?: LogContext): void {
    const errorContext = {
      ...context,
      error:
        error instanceof Error
          ? {
              message: error.message,
              stack: error.stack,
              name: error.name,
            }
          : String(error),
    };

    if (this.isDevelopment) {
      console.error(`[ERROR] ${message}`, errorContext);
    } else {
      // In production, send to error monitoring service
      // Example: Sentry.captureException(error, { extra: context });

      // Log to server logs (structured format for production)
      if (this.isProduction && typeof process !== 'undefined' && process.env) {
        // Structured logging for production (can be picked up by log aggregation services)
        const logEntry = JSON.stringify({
          level: 'error',
          message,
          timestamp: new Date().toISOString(),
          ...errorContext,
        });
        // In production, this would typically go to a logging service
        // For now, we'll use console.error but in a structured way
        console.error(logEntry);
      }
    }
  }

  /**
   * Log debug messages (development only)
   */
  debug(message: string, context?: LogContext): void {
    if (this.isDevelopment) {
      console.debug(`[DEBUG] ${message}`, context || '');
    }
  }
}

export const logger = new Logger();
