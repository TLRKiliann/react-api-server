/*const express = require('express');
const app = express();
const router = express.Router();*/


let notes = [
  {
    "id": 1,
    "name": "Jeremy",
    "number": "022 343 56 78",
    "editNum": false
  },
  {
    "id": 2,
    "name": "Agnes",
    "number": "021 324 44 54",
    "editNum": false
  },
  {
    "id": 3,
    "name": "Sarah",
    "number": "024 535 33 22",
    "editNum": false
  },
]
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
};

app.use(requestLogger);

router.get('/', (req, res) => {
  res.json(notes)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
};

app.use(unknownEndpoint);

//module.exports = router;