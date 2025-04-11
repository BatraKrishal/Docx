// client/src/App.jsx
import { useState, useEffect } from 'react';
import './App.css';
import TextEditor from './components/TextEditor.jsx';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/test')  // Calls Express backend (via Vite proxy)
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div>
      <TextEditor />
    </div>
  );
}

export default App;