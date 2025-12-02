"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function ContactCell() {
  return (
    <Link href="/contact">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "relative h-full w-full flex flex-col justify-center items-center p-6 md:p-8 overflow-hidden cursor-pointer text-left",
          "group border-2 border-primary/30 group-hover:border-primary/50 transition-all duration-300",
          "shadow-lg shadow-primary/10 group-hover:shadow-xl group-hover:shadow-primary/20 group-hover:scale-[1.01]"
        )}
      >
        {/* Enhanced animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/20 to-primary/10 opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
        
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

        {/* Glow effect */}
        <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors duration-500" />

        {/* Arrow at top right */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1, type: "spring" }}
          className="absolute top-4 right-4 md:top-5 md:right-5 z-20"
        >
          <ArrowUpRight className="w-6 h-6 md:w-7 md:h-7 text-primary group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </motion.div>

        <div className="relative z-10 text-center">
          {/* Text */}
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-3"
          >
            Let&apos;s work together
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="text-base md:text-lg lg:text-xl text-muted-foreground"
          >
            {personalInfo.email}
          </motion.p>
        </div>

        {/* Enhanced corner decoration */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/20 rounded-bl-full opacity-60 group-hover:opacity-80 transition-opacity" />
      </motion.div>
    </Link>
  );
}
