import React, { useState, useEffect } from 'react';
import SearchNote from "./components/SearchNote";
import Note from './components/Note';
import noteService from './services/noteservices';
import './App.css';


const App = () => {
  const [notes, setNotes] = useState([]);
  const [filterNotes, setFilterNotes] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [editPhoneNumber, setEditPhoneNumber] = useState([]);

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
        setFilterNotes(initialNotes)
      })
  }, []);

  //Display all with btn display
  const displayNote = () => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
        setFilterNotes(initialNotes)
      })
  };

  const displayContact = () => {
    noteService
      .callInfo()
  };

  const searchNumber = (event) => {
    setSearchName(event.target.value);
  };

  //Search note (best practice)
  const handleSearch = (e) => {
    e.preventDefault();
    const searchNum = notes.filter(note => {
      return note.name === searchName
      ? `${note.name} ${note.phone}`
      : null;
    })
    //console.log("searchNum : ", searchNum)
    if (searchNum === "") {
      setNotes([]);
    } else {
      setFilterNotes(searchNum);
      setSearchName([]);
    }
  };

  //Value name to add
  const handleNewName = (event) => {
    setNewName(event.target.value);
  };
  //Value number to add
  const handleNewPhone = (event) => {
    setNewPhone(event.target.value);
  };

  const generateId = () => {
    const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id)) : 0
      return maxId + 1;
  };

  //Add note
  const handleAddContact = (event) => {
    event.preventDefault();
    const noteObject = {
      id: generateId(),
      name: newName,
      number: newPhone,
      editNum: false
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewName('')
        setNewPhone('')
      })
      .catch(error => {
        alert(`Number or Name is missing !`)
        setNotes([])
      })
  };

  //Delete note
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

  //To change note.number
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
          <label>Display Number of Contacts</label>
          <button onClick={displayContact}>Catch Response</button>
          <a
            href='http://localhost:4001/info'
            className="page--info"
          >
            Go to page
          </a>
        </div>


        <form onSubmit={(e) => handleSearch(e)} className="display--div">
          <label>Search Contact</label>
          <input
            type="text"
            value={searchName}
            onChange={searchNumber} 
            placeholder="Enter name"
            style={{width: "30%"}}/>
          <button type="submit">Search</button>
        </form>


        {searchName ? filterNotes.map(note => (
          <SearchNote
            key={note.id}
            name={note.name}
            number={note.number}
          />
          )) : null
        }

        <form onSubmit={(e) => handleAddContact(e)}
          className="display--div">
          <label>Add New Contact</label>
          <input
            type="text"
            value={newName}
            onChange={handleNewName}
            placeholder="Enter name" autoComplete="off" required/>
          <input
            type="text"
            value={newPhone}
            onChange={handleNewPhone} 
            placeholder="Phone number" required/>
          <button type="submit">Enter</button>
        </form>

        {notes.map(note => (
          <Note
            key={note.id}
            note={note}
            handleDelete={() => handleDelete(note.id)}
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
