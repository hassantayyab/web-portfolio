'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Editor } from '@tiptap/react';
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  FileCode,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Highlighter,
  Image as ImageIcon,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Minus,
  Palette,
  Quote,
  Redo,
  RemoveFormatting,
  Strikethrough,
  Table as TableIcon,
  Underline as UnderlineIcon,
  Undo,
} from 'lucide-react';
import { useCallback, useRef, useState } from 'react';

interface EditorToolbarProps {
  editor: Editor;
  onImageUpload?: (file: File) => Promise<string>;
}

export function EditorToolbar({ editor, onImageUpload }: EditorToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('Enter URL:', previousUrl);

    if (url === null) {
      return;
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const addImage = useCallback(() => {
    if (onImageUpload && fileInputRef.current) {
      fileInputRef.current.click();
    } else {
      // Fallback to URL input if no upload handler
      const url = window.prompt('Enter image URL:');
      if (url) {
        editor.chain().focus().setImage({ src: url }).run();
      }
    }
  }, [editor, onImageUpload]);

  const handleImageUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file || !onImageUpload) return;

      setIsUploadingImage(true);
      try {
        const url = await onImageUpload(file);
        editor.chain().focus().setImage({ src: url }).run();
      } catch (error) {
        console.error('Image upload failed:', error);
        alert('Failed to upload image. Please try again.');
      } finally {
        setIsUploadingImage(false);
        // Reset input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    },
    [editor, onImageUpload],
  );

  const insertTable = useCallback(() => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  }, [editor]);

  const setTextColor = useCallback(() => {
    const color = window.prompt('Enter color (e.g., #ff0000 or red):');
    if (color) {
      editor.chain().focus().setColor(color).run();
    }
  }, [editor]);

  const setHighlight = useCallback(() => {
    const color = window.prompt('Enter highlight color (e.g., #ffff00 or yellow):');
    if (color) {
      editor.chain().focus().setHighlight({ color }).run();
    }
  }, [editor]);

  const ToolbarButton = ({
    onClick,
    active,
    disabled,
    icon: Icon,
    tooltip,
  }: {
    onClick: () => void;
    active?: boolean;
    disabled?: boolean;
    icon: typeof Bold;
    tooltip: string;
  }) => (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type='button'
            variant='ghost'
            size='sm'
            onClick={onClick}
            disabled={disabled}
            className={`h-8 w-8 p-0 ${
              active
                ? 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
            }`}
          >
            <Icon className='h-4 w-4' />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className='text-xs'>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <>
      {/* Hidden file input for image upload */}
      <input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        onChange={handleImageUpload}
        className='hidden'
      />

      <div className='border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-2'>
        <div className='flex flex-wrap items-center gap-1'>
          {/* Text Formatting */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive('bold')}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            icon={Bold}
            tooltip='Bold (Ctrl+B)'
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive('italic')}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            icon={Italic}
            tooltip='Italic (Ctrl+I)'
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            active={editor.isActive('underline')}
            disabled={!editor.can().chain().focus().toggleUnderline().run()}
            icon={UnderlineIcon}
            tooltip='Underline (Ctrl+U)'
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            active={editor.isActive('strike')}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            icon={Strikethrough}
            tooltip='Strikethrough'
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            active={editor.isActive('code')}
            disabled={!editor.can().chain().focus().toggleCode().run()}
            icon={Code}
            tooltip='Inline Code'
          />

          <Separator orientation='vertical' className='mx-1 h-6' />

          {/* Headings */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            active={editor.isActive('heading', { level: 1 })}
            icon={Heading1}
            tooltip='Heading 1'
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            active={editor.isActive('heading', { level: 2 })}
            icon={Heading2}
            tooltip='Heading 2'
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            active={editor.isActive('heading', { level: 3 })}
            icon={Heading3}
            tooltip='Heading 3'
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
            active={editor.isActive('heading', { level: 4 })}
            icon={Heading4}
            tooltip='Heading 4'
          />

          <Separator orientation='vertical' className='mx-1 h-6' />

          {/* Lists */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive('bulletList')}
            icon={List}
            tooltip='Bullet List'
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive('orderedList')}
            icon={ListOrdered}
            tooltip='Numbered List'
          />

          <Separator orientation='vertical' className='mx-1 h-6' />

          {/* Text Alignment */}
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            active={editor.isActive({ textAlign: 'left' })}
            icon={AlignLeft}
            tooltip='Align Left'
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            active={editor.isActive({ textAlign: 'center' })}
            icon={AlignCenter}
            tooltip='Align Center'
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            active={editor.isActive({ textAlign: 'right' })}
            icon={AlignRight}
            tooltip='Align Right'
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            active={editor.isActive({ textAlign: 'justify' })}
            icon={AlignJustify}
            tooltip='Justify'
          />

          <Separator orientation='vertical' className='mx-1 h-6' />

          {/* Other Formatting */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            active={editor.isActive('blockquote')}
            icon={Quote}
            tooltip='Blockquote'
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            active={editor.isActive('codeBlock')}
            icon={FileCode}
            tooltip='Code Block'
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            icon={Minus}
            tooltip='Horizontal Rule'
          />

          <Separator orientation='vertical' className='mx-1 h-6' />

          {/* Insert Elements */}
          <ToolbarButton
            onClick={setLink}
            active={editor.isActive('link')}
            icon={LinkIcon}
            tooltip='Add Link (Ctrl+K)'
          />
          <ToolbarButton
            onClick={addImage}
            disabled={isUploadingImage}
            icon={ImageIcon}
            tooltip={isUploadingImage ? 'Uploading...' : 'Insert Image'}
          />
          <ToolbarButton onClick={insertTable} icon={TableIcon} tooltip='Insert Table' />

          <Separator orientation='vertical' className='mx-1 h-6' />

          {/* Colors */}
          <ToolbarButton onClick={setTextColor} icon={Palette} tooltip='Text Color' />
          <ToolbarButton
            onClick={setHighlight}
            active={editor.isActive('highlight')}
            icon={Highlighter}
            tooltip='Highlight'
          />

          <Separator orientation='vertical' className='mx-1 h-6' />

          {/* Clear Formatting */}
          <ToolbarButton
            onClick={() => editor.chain().focus().unsetAllMarks().run()}
            disabled={!editor.can().chain().focus().unsetAllMarks().run()}
            icon={RemoveFormatting}
            tooltip='Clear Formatting'
          />

          <Separator orientation='vertical' className='mx-1 h-6' />

          {/* Undo/Redo */}
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
            icon={Undo}
            tooltip='Undo (Ctrl+Z)'
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
            icon={Redo}
            tooltip='Redo (Ctrl+Y)'
          />
        </div>

        {/* Table Actions - Show when inside a table */}
        {editor.isActive('table') && (
          <div className='flex items-center gap-1 mt-2 pt-2 border-t border-gray-200 dark:border-gray-800'>
            <span className='text-xs text-gray-600 dark:text-gray-400 mr-2'>Table:</span>
            <Button
              type='button'
              variant='ghost'
              size='sm'
              onClick={() => editor.chain().focus().addColumnBefore().run()}
              className='h-7 text-xs px-2'
            >
              Add Column Left
            </Button>
            <Button
              type='button'
              variant='ghost'
              size='sm'
              onClick={() => editor.chain().focus().addColumnAfter().run()}
              className='h-7 text-xs px-2'
            >
              Add Column Right
            </Button>
            <Button
              type='button'
              variant='ghost'
              size='sm'
              onClick={() => editor.chain().focus().deleteColumn().run()}
              className='h-7 text-xs px-2'
            >
              Delete Column
            </Button>
            <Separator orientation='vertical' className='mx-1 h-6' />
            <Button
              type='button'
              variant='ghost'
              size='sm'
              onClick={() => editor.chain().focus().addRowBefore().run()}
              className='h-7 text-xs px-2'
            >
              Add Row Above
            </Button>
            <Button
              type='button'
              variant='ghost'
              size='sm'
              onClick={() => editor.chain().focus().addRowAfter().run()}
              className='h-7 text-xs px-2'
            >
              Add Row Below
            </Button>
            <Button
              type='button'
              variant='ghost'
              size='sm'
              onClick={() => editor.chain().focus().deleteRow().run()}
              className='h-7 text-xs px-2'
            >
              Delete Row
            </Button>
            <Separator orientation='vertical' className='mx-1 h-6' />
            <Button
              type='button'
              variant='ghost'
              size='sm'
              onClick={() => editor.chain().focus().deleteTable().run()}
              className='h-7 text-xs px-2 text-red-600 dark:text-red-400'
            >
              Delete Table
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
