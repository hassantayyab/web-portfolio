"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-white/5",
        "motion-reduce:animate-none motion-reduce:bg-white/10",
        className
      )}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-white/15 bg-card/50 overflow-hidden">
      {/* Image skeleton */}
      <Skeleton className="h-48 w-full rounded-none" />
      
      {/* Content skeleton */}
      <div className="p-5 space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        
        {/* Tags skeleton */}
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-14 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonBentoGrid() {
  return (
    <div className="grid gap-4 p-4 md:p-6 w-full h-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6 auto-rows-fr">
      {/* Large hero cell */}
      <div className="col-span-2 md:col-span-3 row-span-2 rounded-2xl border border-white/15 bg-card/50">
        <Skeleton className="h-full w-full rounded-2xl" />
      </div>
      
      {/* Photo cell */}
      <div className="col-span-1 row-span-2 rounded-2xl border border-white/15 bg-card/50">
        <Skeleton className="h-full w-full rounded-2xl" />
      </div>
      
      {/* Skills cell */}
      <div className="col-span-2 row-span-1 rounded-2xl border border-white/15 bg-card/50">
        <Skeleton className="h-full w-full rounded-2xl" />
      </div>
      
      {/* Other cells */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="col-span-1 row-span-1 rounded-2xl border border-white/15 bg-card/50">
          <Skeleton className="h-full w-full rounded-2xl" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn("h-4", i === lines - 1 ? "w-3/4" : "w-full")}
        />
      ))}
    </div>
  );
}

