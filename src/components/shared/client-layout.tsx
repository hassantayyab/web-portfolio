"use client";

import { useState, useEffect } from "react";
import { Navbar, CommandPalette } from "@/components/navigation";
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
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Global keyboard shortcut for command palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }
      if (e.key === "Escape") {
        setCommandPaletteOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {showCursorGlow && <CursorGlow />}
      {showNavbar && (
        <Navbar onCommandPaletteOpen={() => setCommandPaletteOpen(true)} />
      )}
      <CommandPalette
        open={commandPaletteOpen}
        onOpenChange={setCommandPaletteOpen}
      />
      {children}
    </>
  );
}

