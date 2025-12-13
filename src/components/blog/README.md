# Blog Components

This directory contains all blog-related components, including the rich text editor.

## Rich Text Editor

A fully-featured rich text editor built with Tiptap for creating and editing blog posts.

### Features

#### Text Formatting

- **Bold** (Ctrl+B)
- _Italic_ (Ctrl+I)
- <u>Underline</u> (Ctrl+U)
- ~~Strikethrough~~
- `Inline Code`

#### Headings

- Heading 1 (largest)
- Heading 2
- Heading 3
- Heading 4

#### Lists

- Bullet lists (unordered)
- Numbered lists (ordered)
- Nested lists support

#### Other Features

- Blockquotes
- Links (with URL input)
- Undo/Redo functionality
- Clear formatting
- Character and word count
- Reading time estimation
- Character limit support (optional)

#### Advanced Features (Phase 3)

- 📸 **Images**: Upload and insert images with custom upload handler
- 💻 **Code Blocks**: Syntax-highlighted code blocks using Lowlight
- 📊 **Tables**: Insertable tables with add/delete rows/columns
- ↔️ **Text Alignment**: Left, center, right, and justify
- ➖ **Horizontal Rules**: Visual separators
- 🎨 **Text Colors**: Custom text colors
- 🖍️ **Highlighting**: Text background highlighting

### Usage

#### Basic Usage

```tsx
'use client';

import { useState } from 'react';
import { RichTextEditor } from '@/components/blog';

export function MyComponent() {
  const [content, setContent] = useState<Record<string, unknown>>({
    type: 'doc',
    content: [],
  });

  return <RichTextEditor content={content} onChange={setContent} placeholder='Start writing...' />;
}
```

#### Advanced Usage with Image Upload

```tsx
'use client';

import { useState } from 'react';
import { RichTextEditor } from '@/components/blog';

export function MyComponent() {
  const [content, setContent] = useState<Record<string, unknown>>({
    type: 'doc',
    content: [],
  });

  // Handle image upload to your storage service
  const handleImageUpload = async (file: File): Promise<string> => {
    // Upload to Supabase Storage, Cloudinary, S3, etc.
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const { url } = await response.json();
    return url;
  };

  return (
    <RichTextEditor
      content={content}
      onChange={setContent}
      placeholder='Start writing your blog post...'
      editable={true}
      showStats={true}
      maxCharacters={10000}
      onImageUpload={handleImageUpload}
      className='my-custom-class'
    />
  );
}
```

### Props

| Prop            | Type                                         | Default                             | Description                                |
| --------------- | -------------------------------------------- | ----------------------------------- | ------------------------------------------ |
| `content`       | `string \| Record<string, unknown>`          | `undefined`                         | The editor content (Tiptap JSON format)    |
| `onChange`      | `(content: Record<string, unknown>) => void` | `undefined`                         | Callback fired when content changes        |
| `placeholder`   | `string`                                     | `"Start writing your blog post..."` | Placeholder text when editor is empty      |
| `editable`      | `boolean`                                    | `true`                              | Whether the editor is editable             |
| `className`     | `string`                                     | `""`                                | Additional CSS classes for the wrapper     |
| `showStats`     | `boolean`                                    | `true`                              | Whether to show character/word count stats |
| `maxCharacters` | `number`                                     | `undefined`                         | Maximum character limit (optional)         |
| `onImageUpload` | `(file: File) => Promise<string>`            | `undefined`                         | Handler for image uploads, returns URL     |

### Components

#### RichTextEditor

The main editor component that combines the editor, toolbar, and stats.

#### EditorToolbar

The toolbar component with all formatting controls. Automatically included when `editable={true}`.

#### EditorStats

Displays character count, word count, and estimated reading time. Automatically included when `showStats={true}`.

### Storage Format

The editor stores content in Tiptap's JSON format, which is compatible with ProseMirror. This format is:

- Easy to parse and validate
- Secure (no arbitrary HTML)
- Extensible
- Compatible with the rendering component (to be implemented in Phase 8)

Example content structure:

```json
{
  "type": "doc",
  "content": [
    {
      "type": "heading",
      "attrs": { "level": 1 },
      "content": [{ "type": "text", "text": "My Blog Post" }]
    },
    {
      "type": "paragraph",
      "content": [
        { "type": "text", "text": "This is a " },
        {
          "type": "text",
          "text": "bold",
          "marks": [{ "type": "bold" }]
        },
        { "type": "text", "text": " word." }
      ]
    }
  ]
}
```

### Styling

The editor comes with pre-configured styles in `editor-styles.css` that are automatically imported in the global CSS. The styles include:

- Typography for all text elements
- Proper spacing and indentation
- Dark mode support
- Focus states
- Link styling
- Code formatting

You can customize the appearance by:

1. Modifying `editor-styles.css`
2. Adding custom classes via the `className` prop
3. Using Tailwind utilities

### Keyboard Shortcuts

| Shortcut                                 | Action       |
| ---------------------------------------- | ------------ |
| `Ctrl/Cmd + B`                           | Bold         |
| `Ctrl/Cmd + I`                           | Italic       |
| `Ctrl/Cmd + U`                           | Underline    |
| `Ctrl/Cmd + Z`                           | Undo         |
| `Ctrl/Cmd + Shift + Z` or `Ctrl/Cmd + Y` | Redo         |
| `Ctrl/Cmd + K`                           | Add Link     |
| `Ctrl/Cmd + Shift + 8`                   | Bullet List  |
| `Ctrl/Cmd + Shift + 7`                   | Ordered List |

### Current Status

✅ **Phase 2 Complete**: Basic rich text editor with all essential features  
✅ **Phase 3 Complete**: Advanced features including images, code blocks, tables, alignment, and colors  
✅ **Phase 4 Complete**: API integration with auto-save, image upload, and error handling

### Auto-Save Editor (Phase 4)

The `RichTextEditorWithAutoSave` component adds automatic draft saving:

```tsx
import { RichTextEditorWithAutoSave } from '@/components/blog';

<RichTextEditorWithAutoSave
  blogData={{
    title: 'My Blog Post',
    slug: 'my-blog-post',
    author: 'John Doe',
    tags: ['javascript', 'react'],
  }}
  onSave={(savedBlog) => console.log('Saved:', savedBlog.id)}
  onError={(error) => alert('Save failed: ' + error)}
  onImageUpload={handleImageUpload}
  autoSaveDelay={2000}
  enableAutoSave={true}
/>;
```

**Features:**

- 💾 Automatic draft saving (debounced)
- 🔄 Retry logic with exponential backoff
- 📊 Save status indicator (idle/saving/saved/error)
- ⏱️ Configurable auto-save delay
- 🔍 Error handling and reporting

### Next Steps

Phase 5 will create the blog creation page.

Phase 8 will add:

- RichTextRenderer component for displaying formatted content
- Proper HTML rendering from editor JSON
- Responsive image handling
- Table of contents generation

### Example Component

See `rich-text-editor-example.tsx` for a complete working example.
