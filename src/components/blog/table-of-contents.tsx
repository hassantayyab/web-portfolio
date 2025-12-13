'use client';

import { useEffect, useState } from 'react';

interface Heading {
  id: string;
  level: number;
  text: string;
}

interface TableOfContentsProps {
  content: Record<string, unknown>;
}

/**
 * Generates a slug from text for use as an anchor ID.
 */
function slugify(text: string): string {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

/**
 * Extract headings from Tiptap JSON content
 */
function extractHeadings(content: Record<string, unknown>): Heading[] {
  const headings: Heading[] = [];
  const nodes = content.content as any[];

  if (!nodes) return [];

  nodes.forEach((node: any) => {
    if (node.type === 'heading' && node.attrs && node.content) {
      const level = node.attrs.level as number;
      const text = node.content.map((c: any) => c.text || '').join('');
      const id = slugify(text);

      headings.push({ id, level, text });
    }
  });

  return headings;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const extracted = extractHeadings(content);
    setHeadings(extracted);
  }, [content]);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -80% 0px',
      }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div className="sticky top-24 hidden lg:block">
      <div className="bg-card border rounded-xl p-4 max-h-[calc(100vh-8rem)] overflow-y-auto">
        <h3 className="text-sm font-semibold mb-3 text-foreground">On This Page</h3>
        <nav className="space-y-1">
          {headings.map((heading) => (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              className={`block text-sm transition-colors hover:text-primary ${
                activeId === heading.id
                  ? 'text-primary font-medium'
                  : 'text-muted-foreground'
              }`}
              style={{
                paddingLeft: `${(heading.level - 1) * 0.75}rem`,
              }}
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(heading.id);
                if (element) {
                  const top = element.getBoundingClientRect().top + window.pageYOffset - 100;
                  window.scrollTo({ top, behavior: 'smooth' });
                }
              }}
            >
              {heading.text}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

/**
 * Generate table of contents data (for server/static use)
 */
export function generateTableOfContents(content: Record<string, unknown>): Heading[] {
  return extractHeadings(content);
}
