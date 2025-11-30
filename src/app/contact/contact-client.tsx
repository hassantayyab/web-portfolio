"use client";

import { motion } from "framer-motion";
import { ContactForm } from "@/components/shared/contact-form";
import { personalInfo } from "@/lib/data";

export default function ContactPageClient() {
  return (
    <main className="min-h-screen pt-24 pb-16 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Get in Touch
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or just want to say hello? Fill out the form below and I&apos;ll get back to you as soon as possible.
          </p>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <div className="bg-card/50 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Email
                </h3>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-xl md:text-2xl text-primary hover:underline"
                >
                  {personalInfo.email}
                </a>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Location
                </h3>
                <p className="text-xl md:text-2xl text-foreground">
                  {personalInfo.location}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-card/50 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm"
        >
          <ContactForm />
        </motion.div>
      </div>
    </main>
  );
}

