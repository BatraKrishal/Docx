import React, { useState } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';

const TextEditor = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [pageSize, setPageSize] = useState('A4');
  const [activeTab, setActiveTab] = useState('home');

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

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="tab-content p-2 text-black">
            <div className="formatting-group">
              <button onClick={() => handleStyleToggle('BOLD')} className="tool-btn"><b>B</b></button>
              <button onClick={() => handleStyleToggle('ITALIC')} className="tool-btn"><i>I</i></button>
              <button onClick={() => handleStyleToggle('UNDERLINE')} className="tool-btn"><u>U</u></button>
              <button onClick={() => handleStyleToggle('STRIKETHROUGH')} className="tool-btn"><s>S</s></button>
            </div>
            <div className="font-group">
              <select className="tool-select">
                <option>Arial</option>
                <option>Times New Roman</option>
              </select>
              <select className="tool-select">
                {[8, 10, 12, 14, 16, 18, 20, 24, 28, 32].map(size => (
                  <option key={size}>{size}</option>
                ))}
              </select>
              <input type="color" className="tool-btn" />
            </div>
            <div className="alignment-group">
              <button className="tool-btn">Left</button>
              <button className="tool-btn">Center</button>
              <button className="tool-btn">Right</button>
            </div>
          </div>
        );
      case 'file':
        return (
          <div className="tab-content p-2">
            <button className="tool-btn">New</button>
            <button className="tool-btn">Open</button>
            <button className="tool-btn">Save</button>
            <button className="tool-btn">Save As</button>
            <button className="tool-btn">Exit</button>
          </div>
        );
      case 'view':
        return (
          <div className="tab-content p-2">
            <button className="tool-btn">100%</button>
            <button className="tool-btn">Fit Page</button>
            <input type="color" className="tool-btn" title="Background Color" />
            <button className="tool-btn">Watermark</button>
          </div>
        );
      case 'insert':
        return (
          <div className="tab-content p-2">
            <button className="tool-btn">Page Break</button>
            <button className="tool-btn">New Page</button>
            <button className="tool-btn">Image</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="text-editor-container">
      {/* Ribbon Toolbar */}
      <div className="ribbon fixed left-0 top-[15%] w-[5vw] h-[70vh]">
        <div className="tabs flex flex-col">
          {['home', 'file', 'view', 'insert'].map(tab => (
            <button
              key={tab}
              className={`tab-btn p-2 ${activeTab === tab ? 'bg-blue-500 text-white' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        {renderTabContent()}
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
