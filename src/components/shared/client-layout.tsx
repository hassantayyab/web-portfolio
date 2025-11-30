"use client";

import { Navbar } from "@/components/navigation";
import { CursorGlow } from "./cursor-glow";

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
      {showCursorGlow && <CursorGlow />}
      {showNavbar && <Navbar />}
      {children}
    </>
  );
}

