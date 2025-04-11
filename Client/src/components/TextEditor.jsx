import React, { useState } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';

const TextEditor = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [pageSize, setPageSize] = useState('A4');

  const handleEditorChange = (newState) => {
    setEditorState(newState);
  };

  const handleStyleToggle = (style) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const sizeMap = {
    A4: { width: '210mm', height: '297mm' },
    Letter: { width: '8.5in', height: '11in' },
    Custom: { width: '100%', height: 'auto' }, // fallback or default
  };

  const { width, height } = sizeMap[pageSize] || sizeMap.Custom;

  return (
    <div className="text-editor-container">
      {/* Ribbon Toolbar */}
      <div className="ribbon-toolbar fixed top-0 left-0 w-[200px] h-full">
        <button onClick={() => handleStyleToggle('BOLD')}><b>B</b></button>
        <button onClick={() => handleStyleToggle('ITALIC')}><i>I</i></button>
        <button onClick={() => handleStyleToggle('UNDERLINE')}><u>U</u></button>
      </div>

      {/* Editor */}
      <div className="bg-white shadow mx-auto my-4 p-20 text-black" style={{ width, height }}>
        <Editor 
          editorState={editorState} 
          onChange={handleEditorChange} 
          placeholder="Start typing here..." 
        />
      </div>
    </div>
  );
};

export default TextEditor;
