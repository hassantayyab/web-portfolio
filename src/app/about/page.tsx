import { Metadata } from "next";
import AboutPageClient from "./about-client";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about my background, skills, experience, and what drives me as a full-stack developer.",
  openGraph: {
    title: "About | John Doe",
    description: "Learn more about my background, skills, and experience.",
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
