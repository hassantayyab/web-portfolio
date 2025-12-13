/**
 * Convert Tiptap JSON content to markdown string
 * Handles old blog posts that were stored as JSON
 */

interface TiptapNode {
  type: string;
  content?: TiptapNode[];
  text?: string;
  attrs?: Record<string, unknown>;
  marks?: Array<{ type: string; attrs?: Record<string, unknown> }>;
}

function extractTextFromNode(node: TiptapNode): string {
  if (node.text) {
    return node.text;
  }
  
  if (node.content && Array.isArray(node.content)) {
    return node.content.map(extractTextFromNode).join('');
  }
  
  return '';
}

function convertNodeToMarkdown(node: TiptapNode, level = 0): string {
  const indent = '  '.repeat(level);
  let result = '';

  switch (node.type) {
    case 'doc':
      if (node.content) {
        return node.content.map(child => convertNodeToMarkdown(child, level)).join('\n\n');
      }
      return '';

    case 'heading':
      const headingLevel = (node.attrs?.level as number) || 1;
      const headingText = extractTextFromNode(node);
      const hashes = '#'.repeat(headingLevel);
      return `${hashes} ${headingText}`;

    case 'paragraph':
      if (node.content) {
        return node.content.map(child => convertNodeToMarkdown(child, level)).join('');
      }
      return '';

    case 'text':
      let text = node.text || '';
      // Apply marks
      if (node.marks) {
        for (const mark of node.marks) {
          switch (mark.type) {
            case 'bold':
              text = `**${text}**`;
              break;
            case 'italic':
              text = `*${text}*`;
              break;
            case 'code':
              text = `\`${text}\``;
              break;
            case 'link':
              const href = mark.attrs?.href as string;
              if (href) {
                text = `[${text}](${href})`;
              }
              break;
          }
        }
      }
      return text;

    case 'bulletList':
      if (node.content) {
        return node.content.map(child => convertNodeToMarkdown(child, level)).join('\n');
      }
      return '';

    case 'orderedList':
      if (node.content) {
        return node.content.map((child, index) => {
          const listItem = convertNodeToMarkdown(child, level);
          return `${index + 1}. ${listItem.replace(/^- /, '')}`;
        }).join('\n');
      }
      return '';

    case 'listItem':
      if (node.content) {
        const content = node.content.map(child => convertNodeToMarkdown(child, level + 1)).join('\n');
        return `- ${content}`;
      }
      return '';

    case 'codeBlock':
      const code = extractTextFromNode(node);
      const language = (node.attrs?.language as string) || '';
      return `\`\`\`${language}\n${code}\n\`\`\``;

    case 'blockquote':
      if (node.content) {
        const quote = node.content.map(child => convertNodeToMarkdown(child, level)).join('\n');
        return quote.split('\n').map(line => `> ${line}`).join('\n');
      }
      return '';

    case 'hardBreak':
      return '\n';

    case 'horizontalRule':
      return '---';

    default:
      // For unknown types, just extract text
      return extractTextFromNode(node);
  }
}

export function convertTiptapJsonToMarkdown(content: unknown): string {
  // If it's already a string, return it
  if (typeof content === 'string') {
    return content;
  }

  // If it's null or undefined, return empty string
  if (!content) {
    return '';
  }

  // If it's an object, try to convert it
  if (typeof content === 'object') {
    try {
      const node = content as TiptapNode;
      return convertNodeToMarkdown(node);
    } catch (error) {
      console.error('Error converting Tiptap JSON to markdown:', error);
      // Fallback: try to extract any text
      return JSON.stringify(content);
    }
  }

  // Fallback
  return String(content);
}

