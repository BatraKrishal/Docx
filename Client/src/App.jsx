// client/src/App.jsx
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/test')  // Calls Express backend (via Vite proxy)
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div>
      <h1>Vite + React + Express</h1>
      <p>Backend says: {data || "Loading..."}</p>
    </div>
  );
}

export default App;