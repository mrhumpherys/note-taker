const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
let { notes } = require('./db/db.json');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto')

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.static('public'));

function createNewNote(body, noteArray) {
    const newNote = body;
    noteArray.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: noteArray}, null, 2)
    );
    return newNote;
}
app.delete('/api/notes/:id', (req, res) => {
    const reqID = req.params.id;

    let note = notes.filter(note => {
        return note.id === reqID;
    })[0];

    console.log(note);
    const index = notes.indexOf(note);

    notes.splice(index, 1);

    fs.writeFileSync('./db/db.json', JSON.stringify(notes), 'utf8');
    res.json("Note deleted");
});
app.get('/api/notes', (req, res) => {
    let results = notes;
    res.json(results);
})
app.post('/api/notes', (req,res) => {
    req.body.id = crypto.randomBytes(16).toString("hex");
    const note = createNewNote(req.body, notes);
    res.json(note);
})

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
    console.log(`Api server now on port ${PORT}`);
});