'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { RichTextEditor } from './rich-text-editor';
import { SaveStatusIndicator, SaveStatus } from './save-status-indicator';

interface AutoSaveData {
  id?: string;
  title: string;
  slug: string;
  content: Record<string, unknown>;
  excerpt?: string;
  author: string;
  coverImage?: string | null;
  tags?: string[];
  category?: string;
  featured?: boolean;
}

interface RichTextEditorWithAutoSaveProps {
  initialContent?: Record<string, unknown>;
  blogData: Omit<AutoSaveData, 'content'>;
  onSave?: (savedBlog: AutoSaveData & { id: string }) => void;
  onError?: (error: string) => void;
  placeholder?: string;
  editable?: boolean;
  className?: string;
  showStats?: boolean;
  maxCharacters?: number;
  onImageUpload?: (file: File) => Promise<string>;
  autoSaveDelay?: number; // Delay in ms before auto-saving (default: 2000ms)
  enableAutoSave?: boolean; // Enable/disable auto-save (default: true)
}

export function RichTextEditorWithAutoSave({
  initialContent,
  blogData,
  onSave,
  onError,
  placeholder,
  editable = true,
  className,
  showStats = true,
  maxCharacters,
  onImageUpload,
  autoSaveDelay = 2000,
  enableAutoSave = true,
}: RichTextEditorWithAutoSaveProps) {
  const [content, setContent] = useState<Record<string, unknown>>(
    initialContent || { type: 'doc', content: [] }
  );
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [blogId, setBlogId] = useState<string | undefined>(blogData.id);

  // Refs for debouncing
  const saveTimeoutRef = useRef<NodeJS.Timeout>();
  const retryTimeoutRef = useRef<NodeJS.Timeout>();
  const retryCountRef = useRef(0);
  const MAX_RETRIES = 3;

  // Save function with retry logic
  const saveDraft = useCallback(
    async (dataToSave: AutoSaveData, isRetry = false) => {
      if (!isRetry) {
        setSaveStatus('saving');
        setError(null);
      }

      try {
        const response = await fetch('/api/blogs/draft', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...dataToSave,
            id: blogId,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to save draft');
        }

        const result = await response.json();

        // Update blog ID if this was the first save
        if (!blogId && result.blog?.id) {
          setBlogId(result.blog.id);
        }

        setSaveStatus('saved');
        setLastSaved(new Date());
        retryCountRef.current = 0; // Reset retry count on success

        if (onSave && result.blog) {
          onSave(result.blog);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to save';

        // Implement retry logic
        if (retryCountRef.current < MAX_RETRIES) {
          retryCountRef.current += 1;
          const retryDelay = Math.min(1000 * Math.pow(2, retryCountRef.current), 10000);

          console.log(`Save failed, retrying in ${retryDelay}ms (attempt ${retryCountRef.current}/${MAX_RETRIES})`);

          retryTimeoutRef.current = setTimeout(() => {
            saveDraft(dataToSave, true);
          }, retryDelay);
        } else {
          // Max retries reached
          console.error('Save error:', err);
          setSaveStatus('error');
          setError(errorMessage);
          retryCountRef.current = 0; // Reset for next attempt

          if (onError) {
            onError(errorMessage);
          }
        }
      }
    },
    [blogId, onSave, onError]
  );

  // Debounced auto-save when content changes
  useEffect(() => {
    if (!enableAutoSave || !editable) return;

    // Clear existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Set new timeout for auto-save
    saveTimeoutRef.current = setTimeout(() => {
      const dataToSave: AutoSaveData = {
        ...blogData,
        content,
      };

      saveDraft(dataToSave);
    }, autoSaveDelay);

    // Cleanup
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [content, blogData, enableAutoSave, editable, autoSaveDelay, saveDraft]);

  // Cleanup retry timeout on unmount
  useEffect(() => {
    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, []);

  // Manual save function that can be called externally
  const manualSave = useCallback(() => {
    const dataToSave: AutoSaveData = {
      ...blogData,
      content,
    };
    saveDraft(dataToSave);
  }, [blogData, content, saveDraft]);

  return (
    <div className="space-y-4">
      {enableAutoSave && (
        <div className="flex justify-end">
          <SaveStatusIndicator status={saveStatus} lastSaved={lastSaved} error={error} />
        </div>
      )}

      <RichTextEditor
        content={content}
        onChange={setContent}
        placeholder={placeholder}
        editable={editable}
        className={className}
        showStats={showStats}
        maxCharacters={maxCharacters}
        onImageUpload={onImageUpload}
      />
    </div>
  );
}

// Export the manual save function type for external use
export type { AutoSaveData };

