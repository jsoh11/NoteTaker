const express = require('express');
const path = require('path');
const api = require('./routes/index.js');
const fs = require('fs')
let db = require('./db/db.json')
const uuid = require('./helpers/uuid');
const {
    readFromFile,
    writeToFile,
  } = require('./helpers/fsUtils');

const PORT = process.env.PORT || 3001;

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    res.json(db)
})

app.post('/api/notes', (req, res) => {

    console.log(`${req.method} was received`)

    const { title, text } = req.body;

    if (title, text) {
        const newDb = {
            title,
            text,
            id: uuid(),
        };

        db.push(newDb)
        fs.writeFile(
            './db/db.json',
            JSON.stringify(db, null, 1), () => {
                res.send('saved')
            }
        )
    }
})
app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
        console.log(db);   
        console.log(noteId);   
       db = db.filter((note) => note.id !== noteId);
        console.log(db)
      writeToFile('./db/db.json', db);

      res.json(`Item ${noteId} has been deleted 🗑️`);
      console.log('test')
  });

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, './public/notes.html'))
);

app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, './public/index.html'))
);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);

// * `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.