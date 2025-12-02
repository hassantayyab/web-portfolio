import { z } from "zod";

/**
 * Environment variable schema for runtime validation
 * Validates all environment variables used in the application
 * 
 * @remarks
 * This ensures type safety and provides clear error messages
 * if required environment variables are missing or invalid
 */
const envSchema = z.object({
  // Public environment variables (exposed to client)
  NEXT_PUBLIC_SITE_URL: z.string().url().default("https://johndoe.dev"),

  // Server-only environment variables
  RESEND_API_KEY: z.string().optional(),
  CONTACT_EMAIL: z.string().email().optional(),

  // Node environment
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

/**
 * Validated environment variables
 * Throws error at startup if required env vars are missing or invalid
 */
function getEnv() {
  try {
    return envSchema.parse({
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
      RESEND_API_KEY: process.env.RESEND_API_KEY,
      CONTACT_EMAIL: process.env.CONTACT_EMAIL,
      NODE_ENV: process.env.NODE_ENV,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map((err) => err.path.join(".")).join(", ");
      throw new Error(
        `❌ Invalid environment variables:\n${missingVars}\n\n` +
          `Please check your .env.local file and ensure all required variables are set correctly.`
      );
    }
    throw error;
  }
}

/**
 * Validated environment variables
 * Use this instead of accessing process.env directly
 */
export const env = getEnv();

/**
 * Type-safe environment variables
 */
export type Env = z.infer<typeof envSchema>;

