"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { FileText, Download } from "lucide-react";
import { cn } from "@/lib/utils";

export function ResumeCell() {
  return (
    <motion.a
      href={personalInfo.resumeUrl || "#"}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative h-full flex flex-col justify-center items-center p-4 md:p-6 overflow-hidden cursor-pointer",
        "group"
      )}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Content */}
      <div className="relative z-10 text-center">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.3, delay: 0.1, type: "spring" }}
          className="w-12 h-12 mx-auto mb-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors"
        >
          <FileText className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors" />
        </motion.div>

        {/* Text */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="text-sm font-medium mb-1"
        >
          Resume
        </motion.p>

        {/* Download indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="flex items-center justify-center gap-1 text-xs text-muted-foreground group-hover:text-primary transition-colors"
        >
          <Download className="w-3 h-3 group-hover:animate-bounce" />
          <span>Download CV</span>
        </motion.div>
      </div>

      {/* Hover shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
    </motion.a>
  );
}

