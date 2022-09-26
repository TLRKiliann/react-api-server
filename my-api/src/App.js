import React, { useState, useEffect } from 'react';
import Note from './components/Note';
import noteService from './services/noteservices';
import './App.css';


function App() {
  const [notes, setNotes] = useState([]);
  const [filterNotes, setFilterNotes] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  //const [switchNumber, setSwitchNumber] = useState(false);
  const [editPhoneNumber, setEditPhoneNumber] = useState([]);

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
      return note.name === searchName
      ? `${note.name} ${note.phone}`
      : null;
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

  /*const handleSwitch = () => {
    setSwitchNumber(!switchNumber);
  };*/

  const handleChangeNumber = (event) => {
    setEditPhoneNumber(event.target.value);
  };

  //Change note.editNum to true !
  const switchEditNum = (id) => {
    const note = notes.find(note => note.id === id);
    const switchPhone = { ...note, editNum: !note.editNum }
    setEditPhoneNumber(note ? note.number : null);

    noteService
      .update(id, switchPhone)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote));
      })
      .catch(error => {
        console.log("Error server with note.editNum")
        setNotes(notes.filter(n => n.id !== id))
      })
  };

  //Change phone number !
  const validateNumber = (id) => {
    const note = notes.find(n => n.id === id)
    const newNumber = {...note, number: editPhoneNumber};

    noteService
      .update(id, newNumber)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id === id ? returnedNote : note));
      })
      .catch(error => {
        alert(`the note '${note.number}' not found !`)
        setNotes(notes.filter(n => n.id !== id))
      })
    setEditPhoneNumber([]);
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

        {filterNotes.map(note => (
          <div key={note.id} className="notemap--div">
            <p>{note.id}</p>
            <p>{note.name}</p>
            <p>{note.number}</p>
          </div>
        ))}

        {notes.map(note => (
          <Note
            key={note.id}
            note={note}
            handleDelete={handleDelete}
            editNum={note.editNum}
            editPhoneNumber={editPhoneNumber}
            handleChangeNumber={(e) => handleChangeNumber(e)}
            validateNumber={() => validateNumber(note.id)}
            switchEditNum={() => switchEditNum(note.id)}
          />
        ))}

      </div>
    </div>
  );
}

export default App;
