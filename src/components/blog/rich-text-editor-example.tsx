'use client';

import { useState } from 'react';
import { RichTextEditor } from './rich-text-editor';

/**
 * Example component showing how to use the RichTextEditor
 * This is for demonstration purposes only
 */
export function RichTextEditorExample() {
  const [content, setContent] = useState<Record<string, unknown>>({
    type: 'doc',
    content: [],
  });

  // Mock image upload handler (in production, this would upload to your storage)
  const handleImageUpload = async (file: File): Promise<string> => {
    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In production, upload to Supabase Storage, Cloudinary, or S3
    // For now, return a data URL for demo purposes
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className='max-w-4xl mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Rich Text Editor Example</h1>

      <div className='mb-4 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800'>
        <h2 className='text-lg font-semibold mb-2 text-blue-900 dark:text-blue-100'>
          ✨ New Features Available
        </h2>
        <ul className='text-sm text-blue-800 dark:text-blue-200 space-y-1'>
          <li>📸 Image upload and insertion</li>
          <li>💻 Code blocks with syntax highlighting</li>
          <li>📊 Tables with row/column management</li>
          <li>↔️ Text alignment (left, center, right, justify)</li>
          <li>➖ Horizontal rules</li>
          <li>🎨 Text colors and highlighting</li>
        </ul>
      </div>

      <RichTextEditor
        content={content}
        onChange={setContent}
        placeholder='Start writing your blog post...'
        editable={true}
        showStats={true}
        maxCharacters={10000}
        onImageUpload={handleImageUpload}
      />

      <div className='mt-8'>
        <h2 className='text-xl font-semibold mb-2'>Editor Output (JSON):</h2>
        <pre className='bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-auto max-h-96'>
          {JSON.stringify(content, null, 2)}
        </pre>
      </div>
    </div>
  );
}
