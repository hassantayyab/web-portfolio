"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";

export function HeroCell() {
  const words = personalInfo.title.split(" ");

  return (
    <div className="relative h-full flex flex-col justify-center p-6 md:p-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-50" />
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="relative z-10">
        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-sm md:text-base text-primary font-medium mb-2"
        >
          Hello, I&apos;m
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 tracking-tight"
        >
          {personalInfo.name}
        </motion.h1>

        {/* Animated title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-2 text-lg md:text-xl lg:text-2xl text-muted-foreground"
        >
          {words.map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
              className="inline-block"
            >
              {word}
            </motion.span>
          ))}
        </motion.div>

        {/* Short bio */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-4 text-sm md:text-base text-muted-foreground/80 max-w-md"
        >
          {personalInfo.shortBio}
        </motion.p>
      </div>

      {/* Decorative element */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.5 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute -right-20 -bottom-20 w-60 h-60 rounded-full bg-primary/20 blur-3xl"
      />
    </div>
  );
}

