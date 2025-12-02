"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/lib/types";
import { X, ExternalLink, Github, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap and keyboard handling
  useEffect(() => {
    if (!project) return;

    const modal = modalRef.current;
    const closeButton = closeButtonRef.current;

    if (!modal) return;

    // Focus the close button when modal opens
    closeButton?.focus();

    // Get all focusable elements within the modal
    const getFocusableElements = () => {
      const selector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
      return Array.from(modal.querySelectorAll<HTMLElement>(selector)).filter(
        (el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden')
      );
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      // Focus trap: Tab key
      if (e.key === "Tab") {
        const focusableElements = getFocusableElements();
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-4 md:inset-10 lg:inset-20 z-50 flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-title"
            aria-describedby="project-description"
          >
            <div 
              ref={modalRef}
              className="relative w-full max-w-3xl max-h-full overflow-hidden rounded-2xl bg-card border border-white/10 shadow-2xl"
            >
              {/* Close button */}
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label="Close project modal"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>

              {/* Scrollable content */}
              <div className="max-h-[80vh] overflow-y-auto">
                {/* Header image */}
                <div className="relative h-64 md:h-80">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-primary/20 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-8xl md:text-9xl font-bold text-primary/30">
                      {project.title[0]}
                    </span>
                  </div>

                  {/* Badges */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    {project.featured && (
                      <Badge className="bg-primary/20 text-primary border-primary/30">
                        Featured Project
                      </Badge>
                    )}
                    <Badge variant="outline" className="bg-black/30 backdrop-blur-sm border-white/10">
                      <Calendar className="w-3 h-3 mr-1" />
                      {project.year}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  {/* Title and links */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                    <h2 id="project-title" className="text-2xl md:text-3xl font-bold">{project.title}</h2>
                    
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {project.liveUrl && (
                        <Button asChild size="sm" className="gap-2">
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                            Live Demo
                          </a>
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button asChild variant="outline" size="sm" className="gap-2">
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4" />
                            Source
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
                      About
                    </h3>
                    <p id="project-description" className="text-muted-foreground leading-relaxed">
                      {project.longDescription || project.description}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
                      Technologies Used
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="bg-white/5 hover:bg-white/10 transition-colors"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

