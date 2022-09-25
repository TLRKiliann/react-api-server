import React, { useState, useEffect } from 'react';
import noteService from './services/noteservices';
import './App.css';


function App() {
  const [notes, setNotes] = useState([]);
  const [filterNotes, setFilterNotes] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [switchNumber, setSwitchNumber] = useState(false);

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
        setFilterNotes(initialNotes)
      })
  }, []);

  //console.log("notes : ", notes)
  //console.log("filterNotes : ", filterNotes)

  const displayNote = () => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
        setFilterNotes(initialNotes)
      })
  };

  const searchNumber = (event) => {
    setSearchName(event.target.value)
  };

  const handleSearch = () => {
    const searchNum = notes.filter(note => {
      return note.name === searchName ? `${note.name} ${note.phone}` : null;
    })
    console.log("searchNum : ", searchNum)
    if (searchNum === "") {
      setNotes([])
    } else {
      setFilterNotes(searchNum)
    }
  };

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewPhone = (event) => {
    setNewPhone(event.target.value);
  };

  const handleAddContact = (event) => {
    event.preventDefault();
    const noteObject = {
      id: new Date().toISOString(),
      name: newName,
      number: newPhone,
    }
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewName('')
        setNewPhone('')
      })
  };

  const handleDelete = (id) => {
    const note = notes.find(note => note.id === id);
    if (window.confirm(`Delete ${note.name} ?`)) {
      noteService
        .remove(id)
        .then(returnedNote => {
          setNotes(notes.filter(note => note.id !== id))
        })
        .catch(error => {
          alert(`the note '${note.name}' was already deleted from server`)
          setNotes(notes.filter(note => note.id !== id))
        })
    } else {
      return null;
    }
  };

  const handleSwitch = () => {
    setSwitchNumber(!switchNumber);
  };

  const handleChangeNumber = (event) => {
    setNewPhone(event.target.value);
  };

  const validateNumber = (event, id) => {
    event.preventDefault();
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
          <input type="text" value={searchName} onChange={searchNumber} />
          <button onClick={handleSearch}>Search</button>
        </div>

        <div className="display--div">
          <label>Add New Contact</label>
          <input type="text" value={newName} onChange={handleNewName} />
          <input type="text" value={newPhone} onChange={handleNewPhone} />
          <button onClick={handleAddContact}>Enter</button>
        </div>

        {notes.slice(0, 10).map(note => (
          <div key={note.id} className="filtermap--div">
            <p>{note.name}</p>
            <p>{note.number}</p>
            <button onClick={() => handleDelete(note.id)}>Delete</button>
            <button onClick={handleSwitch}>
              {switchNumber ? "hide" : "change"}
            </button>
            {switchNumber ? (
              <div>
                <input value={newPhone} onChange={() => handleChangeNumber(note.id)} />
                <button onClick={() => validateNumber(note.id)}>
                  Validate
                </button>
              </div>
              ) : null
            }
          </div>
        ))}

        {filterNotes.map(note => (
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
