const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const { notes } = require('./db/db.json');
const fs = require('fs');
const path = require('path');

app.use(express.urlencoded({ extend: true }));

app.use(express.json());
app.use(express.static('public'));

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
    console.log(`Api server now on port ${PORT}`);
});