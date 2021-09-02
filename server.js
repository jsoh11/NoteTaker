const express = require('express');
const path = require('path');
const api = require('./routes/index.js');
const fs = require('fs')
const db = require('./db/db.json')
const uuid = require('./helpers/uuid');


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
            JSON.stringify(db, null, 1),
        )
    }
})
app.delete('/api/notes', (req, res) => {
    const dataId = req.params.id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        // Make a new array of all tips except the one with the ID provided in the URL
        const result = json.filter((dataDB) => id !== id);
  
        // Save that array to the filesystem
        writeToFile('./db/db.json', result);
  
        // Respond to the DELETE request
        res.json(`Item ${dataId} has been deleted 🗑️`);
      });
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