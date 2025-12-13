'use client';

import { CheckCircle2, Cloud, AlertCircle, Loader2 } from 'lucide-react';

export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

interface SaveStatusIndicatorProps {
  status: SaveStatus;
  lastSaved?: Date | null;
  error?: string | null;
}

export function SaveStatusIndicator({
  status,
  lastSaved,
  error,
}: SaveStatusIndicatorProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'saving':
        return {
          icon: Loader2,
          text: 'Saving...',
          className: 'text-blue-600 dark:text-blue-400',
          iconClassName: 'animate-spin',
        };
      case 'saved':
        return {
          icon: CheckCircle2,
          text: lastSaved
            ? `Saved ${formatTimeSince(lastSaved)}`
            : 'Saved',
          className: 'text-green-600 dark:text-green-400',
          iconClassName: '',
        };
      case 'error':
        return {
          icon: AlertCircle,
          text: error || 'Failed to save',
          className: 'text-red-600 dark:text-red-400',
          iconClassName: '',
        };
      default:
        return {
          icon: Cloud,
          text: 'Not saved',
          className: 'text-gray-500 dark:text-gray-400',
          iconClassName: '',
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  // Don't show error status
  if (status === 'error') {
    return null;
  }

  return (
    <div className={`flex items-center gap-2 text-sm ${config.className}`}>
      <Icon className={`h-4 w-4 ${config.iconClassName}`} />
      <span>{config.text}</span>
    </div>
  );
}

function formatTimeSince(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  if (seconds < 10) {
    return 'just now';
  } else if (seconds < 60) {
    return `${seconds}s ago`;
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m ago`;
  } else {
    const hours = Math.floor(seconds / 3600);
    return `${hours}h ago`;
  }
}

