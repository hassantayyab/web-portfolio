/**
 * Rate limiting utility with support for Redis/KV and in-memory fallback
 * Supports distributed rate limiting for multi-instance deployments
 */

import { RATE_LIMIT } from "./constants";

interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

/**
 * In-memory rate limit store (fallback for development)
 */
const inMemoryStore = new Map<string, { count: number; resetTime: number }>();

/**
 * Check if IP is rate limited using in-memory store
 */
function checkInMemoryRateLimit(ip: string): RateLimitResult {
  const now = Date.now();
  const record = inMemoryStore.get(ip);

  if (!record || now > record.resetTime) {
    inMemoryStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT.WINDOW_MS });
    return {
      success: true,
      limit: RATE_LIMIT.MAX_REQUESTS,
      remaining: RATE_LIMIT.MAX_REQUESTS - 1,
      reset: now + RATE_LIMIT.WINDOW_MS,
    };
  }

  if (record.count >= RATE_LIMIT.MAX_REQUESTS) {
    return {
      success: false,
      limit: RATE_LIMIT.MAX_REQUESTS,
      remaining: 0,
      reset: record.resetTime,
    };
  }

  record.count++;
  return {
    success: true,
    limit: RATE_LIMIT.MAX_REQUESTS,
    remaining: RATE_LIMIT.MAX_REQUESTS - record.count,
    reset: record.resetTime,
  };
}

/**
 * Check rate limit with Redis/KV support
 * 
 * For production, configure one of:
 * - Vercel KV: Set KV_REST_API_URL and KV_REST_API_TOKEN env vars
 * - Upstash Redis: Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN env vars
 * 
 * Falls back to in-memory store if neither is configured
 */
export async function checkRateLimit(ip: string): Promise<RateLimitResult> {
  // Try Vercel KV first
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    try {
      return await checkVercelKVRateLimit(ip);
    } catch (error) {
      // Only log in development, fallback silently in production
      if (process.env.NODE_ENV === "development") {
        console.error("Vercel KV rate limit error, falling back to in-memory:", error);
      }
      return checkInMemoryRateLimit(ip);
    }
  }

  // Try Upstash Redis
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    try {
      return await checkUpstashRateLimit(ip);
    } catch (error) {
      // Only log in development, fallback silently in production
      if (process.env.NODE_ENV === "development") {
        console.error("Upstash Redis rate limit error, falling back to in-memory:", error);
      }
      return checkInMemoryRateLimit(ip);
    }
  }

  // Fallback to in-memory
  return checkInMemoryRateLimit(ip);
}

/**
 * Check rate limit using Vercel KV
 */
async function checkVercelKVRateLimit(ip: string): Promise<RateLimitResult> {
  const key = `rate_limit:${ip}`;
  const now = Date.now();
  const windowStart = now - (now % RATE_LIMIT.WINDOW_MS);

  try {
    const response = await fetch(`${process.env.KV_REST_API_URL}/get/${key}`, {
      headers: {
        Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`KV API error: ${response.status}`);
    }

    const data = await response.json();
    const count = data.result ? parseInt(data.result, 10) : 0;

    if (count >= RATE_LIMIT.MAX_REQUESTS) {
      return {
        success: false,
        limit: RATE_LIMIT.MAX_REQUESTS,
        remaining: 0,
        reset: windowStart + RATE_LIMIT.WINDOW_MS,
      };
    }

    // Increment count
    const newCount = count + 1;
    await fetch(`${process.env.KV_REST_API_URL}/set/${key}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        value: newCount.toString(),
        ex: Math.ceil(RATE_LIMIT.WINDOW_MS / 1000), // TTL in seconds
      }),
    });

    return {
      success: true,
      limit: RATE_LIMIT.MAX_REQUESTS,
      remaining: RATE_LIMIT.MAX_REQUESTS - newCount,
      reset: windowStart + RATE_LIMIT.WINDOW_MS,
    };
  } catch (error) {
    throw new Error(`Vercel KV rate limit failed: ${error}`);
  }
}

/**
 * Check rate limit using Upstash Redis
 */
async function checkUpstashRateLimit(ip: string): Promise<RateLimitResult> {
  const key = `rate_limit:${ip}`;
  const now = Date.now();
  const windowStart = now - (now % RATE_LIMIT.WINDOW_MS);

  try {
    // Use Upstash REST API
    const response = await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        ["GET", key],
        ["INCR", key],
        ["EXPIRE", key, Math.ceil(RATE_LIMIT.WINDOW_MS / 1000)],
      ]),
    });

    if (!response.ok) {
      throw new Error(`Upstash API error: ${response.status}`);
    }

    const results = await response.json();
    const currentCount = results[0].result ? parseInt(results[0].result, 10) : 0;
    const newCount = results[1].result ? parseInt(results[1].result, 10) : 1;

    if (currentCount >= RATE_LIMIT.MAX_REQUESTS) {
      return {
        success: false,
        limit: RATE_LIMIT.MAX_REQUESTS,
        remaining: 0,
        reset: windowStart + RATE_LIMIT.WINDOW_MS,
      };
    }

    return {
      success: true,
      limit: RATE_LIMIT.MAX_REQUESTS,
      remaining: RATE_LIMIT.MAX_REQUESTS - newCount,
      reset: windowStart + RATE_LIMIT.WINDOW_MS,
    };
  } catch (error) {
    throw new Error(`Upstash Redis rate limit failed: ${error}`);
  }
}

