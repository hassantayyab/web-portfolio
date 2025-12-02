"use client";

import { motion } from "framer-motion";
import { ClientLayout } from "@/components/shared/client-layout";
import { PageLayout } from "@/components/shared/page-layout";
import { Timeline } from "@/components/shared/timeline";
import { personalInfo, skills, experiences, education } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar } from "lucide-react";

export default function AboutPageClient() {
  const skillsByCategory = {
    frontend: skills.filter((s) => s.category === "frontend"),
    backend: skills.filter((s) => s.category === "backend"),
    tools: skills.filter((s) => s.category === "tools"),
  };

  return (
    <ClientLayout>
      <PageLayout
        title="About Me"
        description="Get to know more about my background, experience, and what drives me."
        maxWidth="4xl"
      >

            {/* Bio Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-16"
            >
              <h2 className="text-2xl font-semibold mb-6">Who I Am</h2>
              
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
              <h2 className="text-2xl font-semibold mb-6">Skills & Technologies</h2>

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
              <h2 className="text-2xl font-semibold mb-8">Experience</h2>

              <Timeline experiences={experiences} />
            </motion.section>

            {/* Education Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-2xl font-semibold mb-6">Education</h2>

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
      </PageLayout>
    </ClientLayout>
  );
}

