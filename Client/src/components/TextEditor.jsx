import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import { FaBold, FaItalic, FaUnderline, FaAlignLeft, FaAlignCenter, FaAlignRight, FaAlignJustify, FaUndo, FaRedo, FaCut, FaCopy, FaPaste, FaImage } from 'react-icons/fa';
import axios from 'axios';

const TextEditor = ({ documentId }) => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('Untitled Document');
  const quillRef = useRef(null);

  useEffect(() => {
    if (documentId) {
      fetchDocument();
    }
  }, [documentId]);

  const fetchDocument = async () => {
    try {
      const response = await axios.get(`/api/documents/${documentId}`);
      setContent(response.data.content);
      setTitle(response.data.title);
    } catch (err) {
      console.error('Error fetching document:', err);
    }
  };

  const saveDocument = async () => {
    try {
      if (documentId) {
        await axios.put(`/api/documents/${documentId}`, { title, content });
      } else {
        const response = await axios.post('/api/documents', { title, content });
        // Handle new document creation if needed
      }
    } catch (err) {
      console.error('Error saving document:', err);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleChange = (value) => {
    setContent(value);
  };

  // Custom toolbar with all required features
  const modules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'align': [] }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['link', 'image'],
        ['clean'],
        ['undo', 'redo']
      ],
      handlers: {
        undo: () => {
          if (quillRef.current) {
            quillRef.current.getEditor().history.undo();
          }
        },
        redo: () => {
          if (quillRef.current) {
            quillRef.current.getEditor().history.redo();
          }
        },
        image: () => {
          const input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('accept', 'image/*');
          input.click();
          
          input.onchange = async () => {
            const file = input.files[0];
            if (!file) return;
            
            const formData = new FormData();
            formData.append('image', file);
            
            try {
              // You'll need to implement an image upload endpoint
              const response = await axios.post('/api/upload', formData);
              const url = response.data.url;
              
              const quill = quillRef.current.getEditor();
              const range = quill.getSelection();
              quill.insertEmbed(range.index, 'image', url);
            } catch (err) {
              console.error('Error uploading image:', err);
            }
          };
        }
      }
    },
    history: {
      delay: 1000,
      maxStack: 500,
      userOnly: true
    },
    clipboard: {
      matchVisual: false,
    }
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'align',
    'list', 'bullet',
    'link', 'image',
    'undo', 'redo'
  ];

  // Custom buttons for the toolbar
  const CustomToolbar = () => (
    <div id="toolbar" className="ql-toolbar ql-snow">
      <button className="ql-bold" title="Bold">
        <FaBold />
      </button>
      <button className="ql-italic" title="Italic">
        <FaItalic />
      </button>
      <button className="ql-underline" title="Underline">
        <FaUnderline />
      </button>
      
      <select className="ql-align" title="Alignment">
        <option value=""></option>
        <option value="left"><FaAlignLeft /></option>
        <option value="center"><FaAlignCenter /></option>
        <option value="right"><FaAlignRight /></option>
        <option value="justify"><FaAlignJustify /></option>
      </select>
      
      <button className="ql-undo" title="Undo">
        <FaUndo />
      </button>
      <button className="ql-redo" title="Redo">
        <FaRedo />
      </button>
      <button className="ql-cut" title="Cut" onClick={() => document.execCommand('cut')}>
        <FaCut />
      </button>
      <button className="ql-copy" title="Copy" onClick={() => document.execCommand('copy')}>
        <FaCopy />
      </button>
      <button className="ql-paste" title="Paste" onClick={() => document.execCommand('paste')}>
        <FaPaste />
      </button>
      <button className="ql-image" title="Insert Image">
        <FaImage />
      </button>
    </div>
  );

  return (
    <div className="text-editor-container">
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        onBlur={saveDocument}
        className="document-title"
        placeholder="Document Title"
      />
      <CustomToolbar />
      <ReactQuill
        ref={quillRef}
        value={content}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        onBlur={saveDocument}
        className="quill-editor"
      />
    </div>
  );
};

export default TextEditor;