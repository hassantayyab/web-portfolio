import { z } from "zod";
import {
  Project,
  Skill,
  SocialLink,
  Experience,
  Education,
  PersonalInfo,
  Blog,
} from "./types";

/**
 * Zod schemas for runtime data validation
 * Validates data structure to catch errors early
 */

export const skillSchema = z.object({
  name: z.string().min(1),
  icon: z.string().min(1),
  category: z.enum(["frontend", "backend", "tools", "other"]),
});

export const projectSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  longDescription: z.string().optional(),
  image: z.string().min(1),
  technologies: z.array(z.string()).min(1),
  liveUrl: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
  featured: z.boolean().optional(),
  year: z.string().regex(/^\d{4}$/, "Year must be a 4-digit number"),
});

export const socialLinkSchema = z.object({
  name: z.string().min(1),
  url: z.string().url(),
  icon: z.string().min(1),
});

export const experienceSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  company: z.string().min(1),
  companyUrl: z.string().url().optional(),
  location: z.string().min(1),
  startDate: z.string().min(1),
  endDate: z.union([z.string().min(1), z.literal("Present")]),
  description: z.array(z.string()).min(1),
  technologies: z.array(z.string()).optional(),
});

export const educationSchema = z.object({
  id: z.string().min(1),
  degree: z.string().min(1),
  school: z.string().min(1),
  location: z.string().min(1),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  description: z.string().optional(),
});

export const personalInfoSchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  email: z.string().email(),
  location: z.string().min(1),
  timezone: z.string().min(1),
  bio: z.string().min(1),
  shortBio: z.string().min(1),
  availability: z.enum(["available", "busy", "not-available"]),
  availabilityText: z.string().min(1),
  resumeUrl: z.string().url().optional(),
  avatarUrl: z.string().min(1),
});

export const blogSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  content: z.string().optional(),
  image: z.string().optional(),
  category: z.string().min(1),
  tags: z.array(z.string()),
  publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  readTime: z.string().min(1),
  featured: z.boolean().optional(),
});

/**
 * Validate data arrays at runtime (useful for development)
 * Call this in development mode to catch data errors early
 */
export function validateData() {
  if (process.env.NODE_ENV === "development") {
    // Import data dynamically to avoid circular dependencies
    import("./data").then(({ personalInfo, skills, projects, socialLinks, experiences, education, blogs }) => {
      try {
        personalInfoSchema.parse(personalInfo);
        z.array(skillSchema).parse(skills);
        z.array(projectSchema).parse(projects);
        z.array(socialLinkSchema).parse(socialLinks);
        z.array(experienceSchema).parse(experiences);
        z.array(educationSchema).parse(education);
        z.array(blogSchema).parse(blogs);
        console.log("✅ All data validated successfully");
      } catch (error) {
        if (error instanceof z.ZodError) {
          console.error("❌ Data validation failed:", error.errors);
        }
      }
    });
  }
}

