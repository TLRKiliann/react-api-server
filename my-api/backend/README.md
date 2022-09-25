
# Backend setup & config

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

**IMPORTANT**

> Number(request.params.id);

- Use Number if "id": 1 instead "id": "1"

> response.end(JSON.stringify(note))

- Display in format string in your browser.
- Not requiered if you use json format : 
**app.use(express.json()) + response.json(note)**

> response.json(note)

- Display in format json in your browser.

> response.end(note)

- Display error in your browser.
