import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const baseUrl = 'http://localhost:4000/api/notes';

function App() {
  const [notes, setNotes] = useState([]);
  const [filterNotes, setFilterNotes] = useState([]);

  const [newName, setNewName] = useState("");

  useEffect(() => {
    axios
      .get(baseUrl)
      .then(initialNotes => {
        console.log("promise fullfield")
        setNotes(initialNotes.data);
        setFilterNotes(initialNotes.data)
      });
  }, []);

  const displayNote = () => {
    axios
      .get(baseUrl)
      .then(initialNotes => {
        console.log("promise fullfield")
        setNotes(initialNotes.data);
        setFilterNotes(initialNotes.data)
      });
  };

  const searchNumber = (event) => {
    setNewName(event.target.value)
  }

  const handleSearch = () => {
    const searchNum = notes.filter(note => {
      return note.name === newName ? `${note.name} ${note.phone}` : null;
    })
    if (newName === "") {
      setNotes([])
    } else {
      setFilterNotes(searchNum)
    }
  };

  return (
    <div className="App">

      <div className="subApp--div">

        <div className="main--title">
          <h1>React API</h1>
        </div>

        <div className="display--div">
          <label>Display All Contacts</label>
          <button onClick={displayNote}>Display</button>
        </div>

        <div className="display--div">
          <label>Search Contact</label>
          <input type="text" value={newName} onChange={searchNumber} />
          <button onClick={handleSearch}>Search</button>
        </div>

        {filterNotes.map(note => (
          <div key={note.id} className="filtermap--div">
            <p>{note.name}</p>
            <p>{note.number}</p>
          </div>
        ))}

        {notes.map(note => (
          <div key={note.id} className="notemap--div">
            <p>{note.id}</p>
            <p>{note.name}</p>
            <p>{note.number}</p>
          </div>
        ))}

      </div>

    </div>
  );
}

export default App;
