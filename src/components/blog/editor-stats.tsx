'use client';

import { Editor } from '@tiptap/react';
import { useMemo } from 'react';

interface EditorStatsProps {
  editor: Editor;
}

export function EditorStats({ editor }: EditorStatsProps) {
  const stats = useMemo(() => {
    const { characters, words } = editor.storage.characterCount;
    
    // Calculate reading time (average adult reads 200-250 words per minute)
    const readTime = Math.ceil(words() / 200) || 1;

    return {
      characters: characters(),
      words: words(),
      readTime,
    };
  }, [editor.storage.characterCount]);

  const limit = editor.extensionManager.extensions.find(
    (ext) => ext.name === 'characterCount'
  )?.options.limit;

  const percentage = limit ? Math.round((100 / limit) * stats.characters) : 0;
  const isNearLimit = percentage >= 80;
  const isAtLimit = percentage >= 100;

  return (
    <div className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-4 py-2">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
          <span>
            <span className="font-medium">{stats.words}</span> word{stats.words !== 1 ? 's' : ''}
          </span>
          <span className="text-gray-400 dark:text-gray-600">•</span>
          <span>
            <span className={`font-medium ${isAtLimit ? 'text-red-600 dark:text-red-400' : isNearLimit ? 'text-yellow-600 dark:text-yellow-400' : ''}`}>
              {stats.characters}
            </span>{' '}
            character{stats.characters !== 1 ? 's' : ''}
            {limit && (
              <span className={isNearLimit ? 'text-yellow-600 dark:text-yellow-400' : ''}>
                {' '}/ {limit}
              </span>
            )}
          </span>
          <span className="text-gray-400 dark:text-gray-600">•</span>
          <span>
            <span className="font-medium">{stats.readTime}</span> min read
          </span>
        </div>

        {limit && isNearLimit && (
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-24 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all ${
                  isAtLimit
                    ? 'bg-red-600 dark:bg-red-400'
                    : 'bg-yellow-600 dark:bg-yellow-400'
                }`}
                style={{ width: `${Math.min(percentage, 100)}%` }}
              />
            </div>
            <span
              className={`text-xs font-medium ${
                isAtLimit
                  ? 'text-red-600 dark:text-red-400'
                  : 'text-yellow-600 dark:text-yellow-400'
              }`}
            >
              {percentage}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

