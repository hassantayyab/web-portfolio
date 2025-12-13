'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

interface MarkdownRendererProps {
  content: string | unknown;
  className?: string;
}

export function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  // Only render if content is a string (markdown)
  // Ignore old JSON format blogs
  const contentStr = typeof content === 'string' ? content : '';
  
  if (!contentStr) {
    return (
      <div className={`rich-text-content prose prose-lg dark:prose-invert max-w-none ${className}`}>
        <p className="text-muted-foreground italic">Content not available. Please edit this blog post to convert it to markdown format.</p>
      </div>
    );
  }

  return (
    <div className={`rich-text-content prose prose-lg dark:prose-invert max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h1: ({ node, ...props }) => <h1 className="text-h1 font-bold mt-10 mb-6" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-h2 font-bold mt-8 mb-5" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-h3 font-semibold mt-7 mb-4" {...props} />,
          h4: ({ node, ...props }) => <h4 className="text-h4 font-semibold mt-6 mb-3" {...props} />,
          p: ({ node, ...props }) => <p className="text-lg leading-8 mb-6" {...props} />,
          ul: ({ node, ...props }) => <ul className="list-disc my-4 pl-6" {...props} />,
          ol: ({ node, ...props }) => <ol className="list-decimal my-4 pl-6" {...props} />,
          li: ({ node, ...props }) => <li className="mb-3 text-lg leading-7" {...props} />,
          code: ({ node, className, children, ...props }: any) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="bg-gray-100 dark:bg-gray-800 text-red-600 dark:text-red-400 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                  {children}
                </code>
              );
            }
            return (
              <code className={`${className} block`} {...props}>
                {children}
              </code>
            );
          },
          pre: ({ node, children, ...props }: any) => (
            <pre className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto my-6 relative border border-gray-800" {...props}>
              {children}
            </pre>
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-blue-500 dark:border-blue-400 pl-4 py-2 my-4 italic bg-gray-50 dark:bg-gray-900 rounded-r" {...props} />
          ),
          a: ({ node, ...props }) => (
            <a className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300" target="_blank" rel="noopener noreferrer" {...props} />
          ),
          img: ({ node, ...props }) => (
            <img className="rounded-lg shadow-lg my-6 max-w-full h-auto" {...props} />
          ),
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse border border-gray-300 dark:border-gray-700" {...props} />
            </div>
          ),
          thead: ({ node, ...props }) => (
            <thead className="bg-gray-100 dark:bg-gray-800" {...props} />
          ),
          tbody: ({ node, ...props }) => (
            <tbody {...props} />
          ),
          tr: ({ node, ...props }) => (
            <tr className="border-b border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors" {...props} />
          ),
          th: ({ node, ...props }) => (
            <th className="border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 px-4 py-3 font-semibold text-left" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="border border-gray-300 dark:border-gray-700 px-4 py-3" {...props} />
          ),
        }}
      >
        {contentStr}
      </ReactMarkdown>
    </div>
  );
}
