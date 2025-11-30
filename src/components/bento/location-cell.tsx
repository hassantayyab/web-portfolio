"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { MapPin, Clock } from "lucide-react";

export function LocationCell() {
  return (
    <div className="relative h-full flex flex-col justify-center p-4 md:p-6 overflow-hidden">
      {/* Animated dots pattern */}
      <div className="absolute inset-0 dot-pattern opacity-20" />

      {/* Content */}
      <div className="relative z-10">
        {/* Location */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2 mb-3"
        >
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
            <MapPin className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Location</p>
            <p className="text-sm font-medium">{personalInfo.location}</p>
          </div>
        </motion.div>

        {/* Timezone */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex items-center gap-2"
        >
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
            <Clock className="w-4 h-4 text-muted-foreground" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Timezone</p>
            <p className="text-sm font-medium">{personalInfo.timezone}</p>
          </div>
        </motion.div>
      </div>

      {/* Decorative globe */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute -right-8 -bottom-8 w-32 h-32"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-primary">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1" />
          <ellipse cx="50" cy="50" rx="45" ry="20" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <ellipse cx="50" cy="50" rx="20" ry="45" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <line x1="5" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="0.5" />
          <line x1="50" y1="5" x2="50" y2="95" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </motion.div>
    </div>
  );
}

