import React, { useState } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';

const TextEditor = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const handleEditorChange = (newState) => {
    setEditorState(newState);
  };

  const handleStyleToggle = (style) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  return (
    <div className="text-editor-container">
      {/* Ribbon Toolbar */}
      <div className="ribbon-toolbar fixed top-0 left-0 w-[200px] h-full">
        <button onClick={() => handleStyleToggle('BOLD')}><b>B</b></button>
        <button onClick={() => handleStyleToggle('ITALIC')}><i>I</i></button>
        <button onClick={() => handleStyleToggle('UNDERLINE')}><u>U</u></button>
      </div>

      {/* Editor */}
      <div className="bg-white shadow mx-auto my-4" style={{ width: '210mm', height: '297mm' }}>
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
