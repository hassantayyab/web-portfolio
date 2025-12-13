'use client';

import { Button } from '@/components/ui/button';
import CharacterCount from '@tiptap/extension-character-count';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { Table } from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { Markdown } from '@tiptap/markdown';
import { Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { common, createLowlight } from 'lowlight';
import { Code2, FileText } from 'lucide-react';
import { useEffect, useState } from 'react';
import { EditorStats } from './editor-stats';
import { EditorToolbar } from './editor-toolbar';

// Create lowlight instance for syntax highlighting
const lowlight = createLowlight(common);

interface RichTextEditorProps {
  content?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  editable?: boolean;
  className?: string;
  showStats?: boolean;
  maxCharacters?: number;
  onImageUpload?: (file: File) => Promise<string>; // Returns image URL
}

export function RichTextEditor({
  content,
  onChange,
  placeholder = 'Start writing your blog post...',
  editable = true,
  className = '',
  showStats = true,
  maxCharacters,
  onImageUpload,
}: RichTextEditorProps) {
  // Default to source mode when editing to show raw markdown
  const [sourceMode, setSourceMode] = useState(editable);
  const [markdownContent, setMarkdownContent] = useState(content || '');

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      Markdown,
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4],
        },
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
        // Disable default code block to use CodeBlockLowlight instead
        codeBlock: false,
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class:
            'text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300',
        },
      }),
      // Image support
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto',
        },
      }),
      // Code blocks with syntax highlighting
      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: 'plaintext',
      }),
      // Table support
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'border-collapse table-auto w-full',
        },
      }),
      TableRow,
      TableHeader.configure({
        HTMLAttributes: {
          class:
            'border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 px-4 py-2 font-semibold',
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: 'border border-gray-300 dark:border-gray-700 px-4 py-2',
        },
      }),
      // Text alignment
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right', 'justify'],
      }),
      // Text color and styling
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      Placeholder.configure({
        placeholder,
      }),
      CharacterCount.configure({
        limit: maxCharacters,
      }),
    ],
    content: content || '',
    contentType: 'markdown',
    editable,
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose lg:prose-lg dark:prose-invert focus:outline-none max-w-none min-h-[400px] px-4 py-3',
      },
    },
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getMarkdown());
      }
    },
  });

  // Update editor content when content prop changes
  useEffect(() => {
    if (editor && content !== undefined && !sourceMode) {
      const currentContent = editor.getMarkdown();
      const newContent = content || '';

      // Only update if content has actually changed
      // Use normalize comparison to handle whitespace differences
      const currentNormalized = currentContent.replace(/\r\n/g, '\n').trim();
      const newNormalized = newContent.replace(/\r\n/g, '\n').trim();

      if (currentNormalized !== newNormalized) {
        // Set content as markdown to preserve newlines and formatting
        editor.commands.setContent(newContent, {
          contentType: 'markdown',
        });
      }
    }
  }, [content, editor, sourceMode]);

  // Sync markdown content when content prop changes (for source mode)
  useEffect(() => {
    if (content !== undefined) {
      setMarkdownContent(content || '');
    }
  }, [content]);

  // Update editable state when prop changes
  useEffect(() => {
    if (editor) {
      editor.setEditable(editable);
    }
  }, [editable, editor]);

  const handleSourceModeToggle = () => {
    if (sourceMode) {
      // Switching from source to WYSIWYG - update editor with markdown content
      if (editor && markdownContent !== undefined) {
        editor.commands.setContent(markdownContent, {
          contentType: 'markdown',
        });
        if (onChange) {
          onChange(markdownContent);
        }
      }
    } else {
      // Switching from WYSIWYG to source - get markdown from editor
      if (editor) {
        const currentMarkdown = editor.getMarkdown();
        setMarkdownContent(currentMarkdown);
      }
    }
    setSourceMode(!sourceMode);
  };

  const handleMarkdownChange = (newMarkdown: string) => {
    setMarkdownContent(newMarkdown);
    if (onChange) {
      onChange(newMarkdown);
    }
  };

  if (!editor) {
    return (
      <div className='w-full h-[400px] rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 animate-pulse' />
    );
  }

  return (
    <div className={`w-full ${className}`}>
      <div className='rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 overflow-hidden'>
        {editable && (
          <div className='flex items-center justify-between border-b border-gray-200 dark:border-gray-800 px-4 py-2'>
            <div className='flex items-center gap-2'>
              <Button
                type='button'
                variant='ghost'
                size='sm'
                onClick={handleSourceModeToggle}
                className='gap-2'
              >
                {sourceMode ? (
                  <>
                    <FileText className='w-4 h-4' />
                    Visual
                  </>
                ) : (
                  <>
                    <Code2 className='w-4 h-4' />
                    Source
                  </>
                )}
              </Button>
            </div>
            {!sourceMode && <EditorToolbar editor={editor} onImageUpload={onImageUpload} />}
          </div>
        )}

        {sourceMode ? (
          <div className='relative'>
            <textarea
              value={markdownContent}
              onChange={(e) => handleMarkdownChange(e.target.value)}
              placeholder={placeholder}
              className='w-full min-h-[400px] p-4 font-mono text-sm bg-transparent border-0 resize-none focus:outline-none focus:ring-0 dark:text-gray-100'
              style={{
                fontFamily:
                  'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
              }}
            />
          </div>
        ) : (
          <div className='relative'>
            <EditorContent editor={editor} />
          </div>
        )}

        {showStats && !sourceMode && <EditorStats editor={editor} />}
        {showStats && sourceMode && (
          <div className='border-t border-gray-200 dark:border-gray-800 px-4 py-2 text-xs text-muted-foreground'>
            {markdownContent.length} characters
            {markdownContent.split(/\s+/).filter(Boolean).length > 0 && (
              <> • {markdownContent.split(/\s+/).filter(Boolean).length} words</>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Export the Editor type for use in other components
export type { Editor };
