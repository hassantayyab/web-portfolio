"use client";

import { motion } from "framer-motion";
import { ClientLayout } from "@/components/shared/client-layout";
import { PageTransition } from "@/components/shared";
import { Timeline } from "@/components/shared/timeline";
import { personalInfo, skills, experiences, education } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, GraduationCap, Briefcase, Code, Heart } from "lucide-react";

export default function AboutPageClient() {
  const skillsByCategory = {
    frontend: skills.filter((s) => s.category === "frontend"),
    backend: skills.filter((s) => s.category === "backend"),
    tools: skills.filter((s) => s.category === "tools"),
  };

  return (
    <ClientLayout>
      <main className="min-h-screen">
        {/* Background effects */}
        <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-primary/5 pointer-events-none" />
        <div className="fixed inset-0 dot-pattern opacity-30 pointer-events-none" />

        <PageTransition>
          <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 py-24 md:py-32">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">About Me</h1>
              <p className="text-lg text-muted-foreground">
                Get to know more about my background, experience, and what drives me.
              </p>
            </motion.div>

            {/* Bio Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-16"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">Who I Am</h2>
              </div>
              
              <div className="prose prose-invert prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  {personalInfo.bio}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{personalInfo.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>{personalInfo.timezone}</span>
                </div>
              </div>
            </motion.section>

            {/* Skills Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-16"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Code className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">Skills & Technologies</h2>
              </div>

              <div className="space-y-6">
                {/* Frontend */}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
                    Frontend
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillsByCategory.frontend.map((skill) => (
                      <Badge
                        key={skill.name}
                        variant="secondary"
                        className="px-4 py-2 text-sm bg-white/5 hover:bg-white/10 transition-colors"
                      >
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Backend */}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
                    Backend
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillsByCategory.backend.map((skill) => (
                      <Badge
                        key={skill.name}
                        variant="secondary"
                        className="px-4 py-2 text-sm bg-white/5 hover:bg-white/10 transition-colors"
                      >
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Tools */}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
                    Tools & Platforms
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillsByCategory.tools.map((skill) => (
                      <Badge
                        key={skill.name}
                        variant="secondary"
                        className="px-4 py-2 text-sm bg-white/5 hover:bg-white/10 transition-colors"
                      >
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Experience Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-16"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">Experience</h2>
              </div>

              <Timeline experiences={experiences} />
            </motion.section>

            {/* Education Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">Education</h2>
              </div>

              <div className="space-y-6">
                {education.map((edu) => (
                  <div
                    key={edu.id}
                    className="p-6 rounded-2xl bg-card/50 border border-white/10"
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
                      <h3 className="text-lg font-semibold">{edu.degree}</h3>
                      <span className="text-sm text-muted-foreground">
                        {edu.startDate} — {edu.endDate}
                      </span>
                    </div>
                    <p className="text-primary mb-1">{edu.school}</p>
                    <p className="text-sm text-muted-foreground mb-2">{edu.location}</p>
                    {edu.description && (
                      <p className="text-sm text-muted-foreground">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </motion.section>
          </div>
        </PageTransition>
      </main>
    </ClientLayout>
  );
}

