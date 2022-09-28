
# Server setup & config (back)

A simple API to test CRUD with express (back) & axios (front). You need 2 consoles to run app completely. One for front & the second for backend. Therefore, axios can communicate with express.
Install

**Changed index.js by server.js !**

└─ $ npm init

└─ $ npm install express

└─ $ npm install --save-dev nodemon

└─ $ npm install --save-dev json-server

## Run CMD :

└─ $ npm start (node)

└─ $ npm run dev (nodemon)

└─ $ npm run server (json-server create a db.json at same time)

(port:3001)

(package.json)

{
  "name": "backend",
  "version": "1.0.0",
  "description": "server-api",
  "main": "server.js",
  "scripts": {

    "start": "node server.js",

    "dev": "nodemon server.js",

    "server": "json-server -p3001 --watch db.json",

    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "koalatr33",
  "license": "ISC",
  "dependencies": {

    "express": "^4.18.1"		    //express

  },
  "devDependencies": {
    "json-server": "^0.17.0", 	//json-server

    "nodemon": "^2.0.20"		    //nodemon
  }
}

**With json-server you need to create & config .env in backend folder with :**

    FAST_REFRESH=false;

Verify if server running with browser

Look at server.js and test if server communicate with your browser :

└─ $ npm run dev

or

└─ $ npm start

and enter :

    http://localhost/4000

    http://localhost/4000/api/notes

└─ $ npm run server

    http://localhost/3001/notes(/withId)

in your browser.

## Test server with console.log() example : 

(server.js)

- GET

```
app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find(note => {
    console.log(note.id, typeof note.id, id, typeof id, note.id === id)
    return note.id === id
  })
  console.log(note)
  response.json(note)
})
```
```
app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  console.log(id)
  const note = notes.find(note => note.id === id);
  console.log(note)
  response.end(JSON.stringify(note))
})
```

- POST

```
app.post('/api/notes', (request, response) => {
  const note = request.body;
  console.log("Successfull added !");
  console.log(note);
  response.json(note);
});
```

(It's possible to retrieve data with :

```
  const id = request.body.id;
  const name = request.body.name;
  const number = request.body.number;
  const note = id + " " + name + " " + number;
```

but not as well structured as in json format.)

- DELETE

It's not recommanded to use delete method on a local server !

(App.js)

```
app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  const note = notes.filter(note => note.id !== id);
  console.log("Successfull deleted !");
  console.log(note);
  response.json(note);
});
```

```
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
```

(noteservices.js)

```
const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then(response => response.data);
};
```

- PUT (create or update)

(App.js)

```
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
```

(noteservices.js)

```
const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then(response => response.data);
};
```

---

**IMPORTANT**

- Number(request.params.id);

Use Number if "id": 1 instead "id": "1"

- response.end(JSON.stringify(note))

Display in format string in your browser.
Not requiered if you use json format : 
**app.use(express.json()) + response.json(note)**

- response.json(note)

Display in format json in your browser.

- response.end(note)

Display error in your browser.

---

## Middleware

json-parser (middleware)

`app.use(express.json())`

Middleware are functions that can be used for handling request and response objects.