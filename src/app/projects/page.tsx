import { Metadata } from "next";
import ProjectsPageClient from "./projects-client";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore my portfolio of web development projects, from full-stack applications to open source contributions.",
  openGraph: {
    title: "Projects | John Doe",
    description: "Explore my portfolio of web development projects.",
  },
};

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}
