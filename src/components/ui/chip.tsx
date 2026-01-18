import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface ChipProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'primary';
}

export const Chip = ({ children, className, variant = 'default' }: ChipProps) => {
  return (
    <span
      className={cn(
        'text-sm px-2.5 py-1 rounded-full transition-colors',
        variant === 'default' &&
          'bg-white/5 text-muted-foreground/80 border border-white/10 hover:bg-white/10 hover:border-white/15',
        variant === 'primary' && 'bg-primary/10 text-primary/90 border border-primary/25',
        className,
      )}
    >
      {children}
    </span>
  );
};
