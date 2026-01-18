/**
 * Application-wide constants
 * Centralized location for magic numbers, strings, and configuration values
 *
 * @remarks
 * Using constants instead of magic numbers improves maintainability
 * and makes it easier to adjust values across the application
 */

/**
 * Animation timing constants (in seconds)
 */
export const ANIMATION_DELAYS = {
  INITIAL: 0.1,
  STAGGER: 0.06,
  SHORT: 0.2,
  MEDIUM: 0.35,
  LONG: 0.5,
} as const;

/**
 * Animation duration constants (in seconds)
 */
export const ANIMATION_DURATIONS = {
  FAST: 0.2,
  NORMAL: 0.35,
  SLOW: 0.6,
} as const;

/**
 * Rate limiting constants
 */
export const RATE_LIMIT = {
  MAX_REQUESTS: 5,
  WINDOW_MS: 60 * 60 * 1000, // 1 hour
} as const;

/**
 * Request security constants
 */
export const REQUEST_SECURITY = {
  MAX_BODY_SIZE: 10 * 1024, // 10KB
  TIMEOUT_MS: 30 * 1000, // 30 seconds
  MAX_NAME_LENGTH: 500,
  MAX_SUBJECT_LENGTH: 500,
  MAX_MESSAGE_LENGTH: 10000,
} as const;

/**
 * Form validation constants
 */
export const FORM_CONSTANTS = {
  SUCCESS_TIMEOUT_MS: 3000,
  DEBOUNCE_MS: 300,
} as const;

/**
 * UI constants
 */
export const UI_CONSTANTS = {
  MOBILE_BREAKPOINT: 768,
  TABLET_BREAKPOINT: 1024,
  DESKTOP_BREAKPOINT: 1280,
} as const;

/**
 * Bento grid span values
 */
export const BENTO_SPANS = {
  COL: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const,
  ROW: [1, 2, 3, 4] as const,
} as const;

/**
 * Project display limits
 */
export const PROJECT_LIMITS = {
  FEATURED_ON_HOME: 4,
  FEATURED_IN_ACCORDION: 6,
  TECH_PREVIEW: 3,
} as const;

/**
 * Skill display limits
 */
export const SKILL_LIMITS = {
  HERO_DISPLAY: 5,
} as const;
