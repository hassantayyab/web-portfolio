"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { ArrowRight, ArrowUpRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ContactForm } from "@/components/shared/contact-form";

export function ContactCell() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <motion.button
        onClick={() => setIsFormOpen(true)}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "relative h-full w-full flex flex-col justify-center items-center p-6 overflow-hidden cursor-pointer text-left",
          "group"
        )}
      >
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
        
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

        {/* Arrow at top right */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1, type: "spring" }}
          className="absolute top-4 right-4 md:top-5 md:right-5 z-20"
        >
          <ArrowUpRight className="w-6 h-6 md:w-7 md:h-7 text-primary/60 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </motion.div>

        <div className="relative z-10 text-center">
          {/* Text */}
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="text-xl md:text-2xl font-semibold mb-2"
          >
            Let&apos;s work together
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="text-sm md:text-base text-muted-foreground mb-4"
          >
            {personalInfo.email}
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="flex items-center justify-center gap-2 text-sm md:text-base text-primary font-medium group-hover:gap-3 transition-all"
          >
            <span>Get in touch</span>
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
          </motion.div>
        </div>

        {/* Corner decoration */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-bl-full opacity-50" />
      </motion.button>

      {/* Contact Form Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFormOpen(false)}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed inset-4 md:inset-10 lg:inset-y-20 lg:inset-x-[20%] z-50 flex items-start justify-center overflow-y-auto"
            >
              <div className="relative w-full max-w-2xl rounded-2xl bg-card border border-white/10 shadow-2xl p-6 md:p-8 my-auto">
                {/* Close button */}
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Header */}
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">Get in Touch</h2>
                  <p className="text-muted-foreground">
                    Have a project in mind or just want to say hello? Fill out the form below and I&apos;ll get back to you as soon as possible.
                  </p>
                </div>

                {/* Form */}
                <ContactForm />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
