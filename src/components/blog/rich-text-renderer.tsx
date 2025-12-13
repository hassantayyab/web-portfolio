'use client';

import { useEffect, useRef } from 'react';
import { generateHTML } from '@tiptap/html';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import { common, createLowlight } from 'lowlight';

const lowlight = createLowlight(common);

interface RichTextRendererProps {
  content: Record<string, unknown>;
  className?: string;
}

/**
 * Renders Tiptap JSON content as formatted HTML
 * Supports all editor features including code blocks, tables, images, etc.
 */
export function RichTextRenderer({ content, className = '' }: RichTextRendererProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  // Debug: Log the content structure
  console.log('RichTextRenderer received content:', {
    type: typeof content,
    isString: typeof content === 'string',
    isObject: typeof content === 'object',
    hasType: content && typeof content === 'object' && 'type' in content,
    contentPreview: typeof content === 'string' ? content.substring(0, 100) : JSON.stringify(content).substring(0, 200),
  });

  // Validate and normalize content structure
  let normalizedContent = content;
  
  // If content is a string, try to parse it as JSON first
  if (typeof content === 'string') {
    try {
      normalizedContent = JSON.parse(content);
      console.log('Parsed string content as JSON:', normalizedContent);
    } catch {
      // If not JSON, it's plain text/markdown - this shouldn't happen but handle it
      console.warn('Content is plain text/markdown, converting to Tiptap format');
      // Convert markdown-like text to Tiptap JSON structure
      const lines = content.split('\n');
      const nodes: any[] = [];
      
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;
        
        // Handle headings
        if (trimmed.startsWith('## ')) {
          nodes.push({
            type: 'heading',
            attrs: { level: 2 },
            content: [{ type: 'text', text: trimmed.replace(/^##\s+/, '') }],
          });
        } else if (trimmed.startsWith('### ')) {
          nodes.push({
            type: 'heading',
            attrs: { level: 3 },
            content: [{ type: 'text', text: trimmed.replace(/^###\s+/, '') }],
          });
        } else if (trimmed.startsWith('# ')) {
          nodes.push({
            type: 'heading',
            attrs: { level: 1 },
            content: [{ type: 'text', text: trimmed.replace(/^#\s+/, '') }],
          });
        } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          // Bullet list
          nodes.push({
            type: 'bulletList',
            content: [{
              type: 'listItem',
              content: [{
                type: 'paragraph',
                content: [{ type: 'text', text: trimmed.replace(/^[-*]\s+/, '') }],
              }],
            }],
          });
        } else {
          // Regular paragraph
          nodes.push({
            type: 'paragraph',
            content: [{ type: 'text', text: trimmed }],
          });
        }
      }
      
      normalizedContent = {
        type: 'doc',
        content: nodes.length > 0 ? nodes : [{
          type: 'paragraph',
          content: [{ type: 'text', text: content }],
        }],
      };
    }
  }

  // Ensure content has proper structure
  if (!normalizedContent || typeof normalizedContent !== 'object') {
    console.error('Invalid content structure:', normalizedContent);
    return (
      <div className={`rich-text-content prose prose-lg dark:prose-invert max-w-none ${className}`}>
        <p className="text-red-500">Error: Invalid content format</p>
        <pre className="text-xs mt-2">{JSON.stringify(content, null, 2)}</pre>
      </div>
    );
  }

  // If content doesn't have type, wrap it
  if (!normalizedContent.type) {
    normalizedContent = {
      type: 'doc',
      content: Array.isArray(normalizedContent) ? normalizedContent : [normalizedContent],
    };
  }
  
  // Ensure it has content array
  if (!normalizedContent.content || !Array.isArray(normalizedContent.content)) {
    console.warn('Content missing content array, wrapping:', normalizedContent);
    normalizedContent = {
      type: 'doc',
      content: [normalizedContent],
    };
  }

  // Generate HTML from Tiptap JSON
  let html: string;
  try {
    html = generateHTML(normalizedContent, [
    StarterKit.configure({
      codeBlock: false, // Using CodeBlockLowlight instead
    }),
    Underline,
    Link.configure({
      openOnClick: true,
      HTMLAttributes: {
        target: '_blank',
        rel: 'noopener noreferrer',
        class: 'text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300',
      },
    }),
    Image.configure({
      HTMLAttributes: {
        class: 'rounded-lg max-w-full h-auto my-4',
      },
    }),
    CodeBlockLowlight.configure({
      lowlight,
    }),
    Table.configure({
      HTMLAttributes: {
        class: 'border-collapse table-auto w-full my-4',
      },
    }),
    TableRow,
    TableHeader.configure({
      HTMLAttributes: {
        class: 'border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 px-4 py-2 font-semibold',
      },
    }),
    TableCell.configure({
      HTMLAttributes: {
        class: 'border border-gray-300 dark:border-gray-700 px-4 py-2',
      },
    }),
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    TextStyle,
    Color,
    Highlight,
    ]);
  } catch (error) {
    console.error('Error generating HTML from Tiptap content:', error);
    return (
      <div className={`rich-text-content prose prose-lg dark:prose-invert max-w-none ${className}`}>
        <p className="text-red-500">Error rendering content. Please check the content format.</p>
      </div>
    );
  }

  // Add copy button to code blocks after render
  useEffect(() => {
    if (!contentRef.current) return;

    const codeBlocks = contentRef.current.querySelectorAll('pre');
    
    codeBlocks.forEach((pre) => {
      // Skip if button already exists
      if (pre.querySelector('.copy-button')) return;

      const button = document.createElement('button');
      button.className = 'copy-button';
      button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
      `;
      button.title = 'Copy code';

      button.addEventListener('click', async () => {
        const code = pre.querySelector('code')?.textContent || '';
        try {
          await navigator.clipboard.writeText(code);
          button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          `;
          setTimeout(() => {
            button.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            `;
          }, 2000);
        } catch (err) {
          console.error('Failed to copy:', err);
        }
      });

      pre.style.position = 'relative';
      pre.appendChild(button);
    });
  }, [html]);

  return (
    <div
      ref={contentRef}
      className={`rich-text-content prose prose-lg dark:prose-invert max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

