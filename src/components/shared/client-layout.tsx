"use client";

import dynamic from "next/dynamic";
import { Navbar } from "@/components/navigation";
import { SkipToContent } from "./skip-to-content";

// Dynamically import CursorGlow to reduce initial bundle size
// Only load on client side and conditionally based on device
const CursorGlow = dynamic(() => import("./cursor-glow").then((mod) => ({ default: mod.CursorGlow })), {
  ssr: false,
});

interface ClientLayoutProps {
  children: React.ReactNode;
  showNavbar?: boolean;
  showCursorGlow?: boolean;
}

export function ClientLayout({ 
  children, 
  showNavbar = true,
  showCursorGlow = true 
}: ClientLayoutProps) {
  return (
    <>
      <SkipToContent />
      {showCursorGlow && <CursorGlow />}
      {showNavbar && <Navbar />}
      {children}
    </>
  );
}

