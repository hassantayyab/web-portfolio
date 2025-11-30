"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { cn } from "@/lib/utils";

export function AvailabilityCell() {
  const statusConfig = {
    available: {
      color: "bg-green-500",
      ringColor: "ring-green-500/30",
      text: "Available",
      bgGradient: "from-green-500/20 via-transparent to-transparent",
    },
    busy: {
      color: "bg-yellow-500",
      ringColor: "ring-yellow-500/30",
      text: "Limited Availability",
      bgGradient: "from-yellow-500/20 via-transparent to-transparent",
    },
    "not-available": {
      color: "bg-red-500",
      ringColor: "ring-red-500/30",
      text: "Not Available",
      bgGradient: "from-red-500/20 via-transparent to-transparent",
    },
  };

  const status = statusConfig[personalInfo.availability];

  return (
    <div className="relative h-full flex flex-col justify-center items-center p-4 md:p-6 overflow-hidden">
      {/* Background gradient */}
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-50", status.bgGradient)} />

      {/* Content */}
      <div className="relative z-10 text-center">
        {/* Animated status indicator */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, type: "spring" }}
          className="flex items-center justify-center mb-3"
        >
          <span className={cn("relative flex h-4 w-4")}>
            <span
              className={cn(
                "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                status.color
              )}
            />
            <span
              className={cn(
                "relative inline-flex rounded-full h-4 w-4",
                status.color
              )}
            />
          </span>
        </motion.div>

        {/* Status text */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-sm font-medium mb-1"
        >
          {status.text}
        </motion.p>

        {/* Availability text */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="text-xs text-muted-foreground"
        >
          {personalInfo.availabilityText}
        </motion.p>
      </div>
    </div>
  );
}

