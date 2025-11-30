import { SkeletonBentoGrid } from "@/components/shared/skeleton";

export default function Loading() {
  return (
    <main className="h-screen w-screen overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-primary/5 pointer-events-none" />
      <div className="fixed inset-0 dot-pattern opacity-30 pointer-events-none" />

      {/* Loading skeleton */}
      <div className="h-full pt-20 md:pt-16">
        <SkeletonBentoGrid />
      </div>
    </main>
  );
}

