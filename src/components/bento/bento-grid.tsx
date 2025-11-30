"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid gap-3 md:gap-4 p-4 md:p-6 w-full h-full",
        "grid-cols-2 md:grid-cols-4 lg:grid-cols-12",
        "grid-rows-[repeat(4,1fr)]",
        className
      )}
    >
      {children}
    </div>
  );
}

interface BentoCellProps {
  children: ReactNode;
  className?: string;
  colSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  rowSpan?: 1 | 2 | 3 | 4;
}

export function BentoCell({
  children,
  className,
  colSpan = 1,
  rowSpan = 1,
}: BentoCellProps) {
  const colSpanClasses: Record<number, string> = {
    1: "col-span-1",
    2: "col-span-1 md:col-span-2",
    3: "col-span-2 md:col-span-3",
    4: "col-span-2 md:col-span-4",
    5: "col-span-2 md:col-span-5",
    6: "col-span-2 md:col-span-6",
    7: "col-span-2 md:col-span-7",
    8: "col-span-2 md:col-span-8",
    9: "col-span-2 md:col-span-9",
    10: "col-span-2 md:col-span-10",
    11: "col-span-2 md:col-span-11",
    12: "col-span-2 md:col-span-12",
  };

  const rowSpanClasses: Record<number, string> = {
    1: "row-span-1",
    2: "row-span-1 md:row-span-2",
    3: "row-span-2 md:row-span-3",
    4: "row-span-2 md:row-span-4",
  };

  return (
    <div
      className={cn(
        "bento-cell group",
        colSpanClasses[colSpan],
        rowSpanClasses[rowSpan],
        className
      )}
    >
      {children}
    </div>
  );
}

