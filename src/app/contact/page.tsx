import { Metadata } from "next";
import { siteConfig } from "@/lib/metadata";
import ContactPageClient from "./contact-client";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.name}. Whether you have a project in mind, want to collaborate, or just want to say hello, I'd love to hear from you.`,
  keywords: [
    "Contact Developer",
    "Hire Web Developer",
    "Freelance Developer",
    "Web Development Services",
    "Contact Form",
  ],
  openGraph: {
    title: `Contact | ${siteConfig.name}`,
    description: `Get in touch with ${siteConfig.name}. Whether you have a project in mind, want to collaborate, or just want to say hello.`,
    url: `${siteConfig.url}/contact`,
    type: "website",
    images: [siteConfig.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact | ${siteConfig.name}`,
    description: `Get in touch with ${siteConfig.name}.`,
    images: [siteConfig.ogImage],
  },
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
};

export default function ContactPage() {
  return (
    <ContactPageClient />
  );
}

