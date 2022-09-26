const express = require('express');
const app = express();
const cors = require('cors');
//const notes = require("./api/notes");
const PORT = 4001;

//app.use("/api/notes", notes);
app.use(cors());
app.use(express.json());

let notes = [
  {
    "id": 1,
    "name": "Jeremy",
    "number": "022 343 56 78",
    "editNum": "false"
  },
  {
    "id": 2,
    "name": "Agnes",
    "number": "021 324 44 54",
    "editNum": "false"
  },
  {
    "id": 3,
    "name": "Sarah",
    "number": "024 535 33 22",
    "editNum": "false"
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello from server !</h1>")
});

app.get("/api/notes", (request, response) => {
  response.json(notes);
});

app.get("/api", (request, response) => {
  console.log("[-] 404 ERROR")
  response.status(404).end();
});

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  console.log(id)
  const note = notes.find(note => note.id === id);
  console.log("GET all", note)
  response.json(note)
});

app.post('/api/notes', (request, response) => {
  const note = request.body;
  console.log("Successfull added !");
  console.log(note);
  response.json(note);
});

app.put('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find(note => note.id === id);
  console.log("Successfull PUT", note)
  response.json(note);
});

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  const note = notes.filter(note => note.id !== id);
  console.log("Successfull deleted !");
  console.log(note);
  response.json(note);
});

app.listen(PORT, () => console.log(`[+] Server is running on port : ${PORT}`));
