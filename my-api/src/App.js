import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const baseUrl = 'http://localhost:4000/api/notes';

function App() {
  const [notes, setNotes] = useState([]);
  const [filterNotes, setFilterNotes] = useState([]);

  useEffect(() => {
    axios
      .get(baseUrl)
      .then(initialNotes => {
        console.log("promise fullfield")
        setNotes(initialNotes.data);
        setFilterNotes(initialNotes.data)
      });
  }, []);

  return (
    <div className="App">


      {notes.map(note => (
        <div key={note.id}>
          <p>{note.id}</p>
          <p>{note.name}</p>
          <p>{note.number}</p>
        </div>
      ))}

      {filterNotes.map(note => (
        <div key={note.id}>
          <p>{note.id}</p>
          <p>{note.name}</p>
          <p>{note.number}</p>
        </div>
      ))}

      
    </div>
  );
}

export default App;
