import React, { useRef, useEffect } from 'react';
import { Bold, Italic, Underline, List, ListOrdered, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: string;
}

const TextEditor: React.FC<TextEditorProps> = ({ 
  value, 
  onChange, 
  placeholder = "Enter your text here...",
  height = "200px" 
}) => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const executeCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleInput();
  };

  const isCommandActive = (command: string): boolean => {
    return document.queryCommandState(command);
  };

  const ButtonStyle = (isActive: boolean) => ({
    padding: '8px',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    backgroundColor: isActive ? '#3b82f6' : '#ffffff',
    color: isActive ? '#ffffff' : '#374151',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  });

  return (
    <div className="border border-gray-300 rounded-md overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex gap-1 flex-wrap">
        <button
          type="button"
          style={ButtonStyle(isCommandActive('bold'))}
          onClick={() => executeCommand('bold')}
          title="Bold"
        >
          <Bold size={16} />
        </button>
        
        <button
          type="button"
          style={ButtonStyle(isCommandActive('italic'))}
          onClick={() => executeCommand('italic')}
          title="Italic"
        >
          <Italic size={16} />
        </button>
        
        <button
          type="button"
          style={ButtonStyle(isCommandActive('underline'))}
          onClick={() => executeCommand('underline')}
          title="Underline"
        >
          <Underline size={16} />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1"></div>

        <button
          type="button"
          style={ButtonStyle(isCommandActive('justifyLeft'))}
          onClick={() => executeCommand('justifyLeft')}
          title="Align Left"
        >
          <AlignLeft size={16} />
        </button>
        
        <button
          type="button"
          style={ButtonStyle(isCommandActive('justifyCenter'))}
          onClick={() => executeCommand('justifyCenter')}
          title="Align Center"
        >
          <AlignCenter size={16} />
        </button>
        
        <button
          type="button"
          style={ButtonStyle(isCommandActive('justifyRight'))}
          onClick={() => executeCommand('justifyRight')}
          title="Align Right"
        >
          <AlignRight size={16} />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1"></div>

        <button
          type="button"
          style={ButtonStyle(isCommandActive('insertUnorderedList'))}
          onClick={() => executeCommand('insertUnorderedList')}
          title="Bullet List"
        >
          <List size={16} />
        </button>
        
        <button
          type="button"
          style={ButtonStyle(isCommandActive('insertOrderedList'))}
          onClick={() => executeCommand('insertOrderedList')}
          title="Numbered List"
        >
          <ListOrdered size={16} />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1"></div>

        <select
          onChange={(e) => executeCommand('fontSize', e.target.value)}
          className="px-2 py-1 border text-[#012657] border-gray-300 rounded text-sm"
          defaultValue="3"
        >
          <option value="1">Small</option>
          <option value="3">Normal</option>
          <option value="5">Large</option>
          <option value="7">Extra Large</option>
        </select>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="p-3 text-[#012657] focus:outline-none"
        style={{
          minHeight: height,
          fontFamily: 'Lexend',
          fontSize: '14px',
          lineHeight: '1.5',
        }}
        data-placeholder={placeholder}
        suppressContentEditableWarning={true}
      />

      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export default TextEditor;