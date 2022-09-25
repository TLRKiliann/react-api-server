const express = require('express');
const app = express();

app.use(express.json());

const PORT = 4000;

let notes = [
  {
    "id": 1,
    "name": "Jeremy",
    "number": "022 343 56 78"
  },
  {
    "id": 2,
    "name": "Agnes",
    "number": "021 324 44 54"
  },
  {
    "id": 3,
    "name": "Sarah",
    "number": "024 535 33 22"
  },
]

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
  console.log(note)
  response.json(note)
});

app.listen(PORT, () => console.log(`[+] Server is running on port : ${PORT}`));
