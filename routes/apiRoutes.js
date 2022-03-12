const router = require("express").Router();
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
let noteArray = require("../db/db.json");

router.post("/notes", (req, res) => {
  const note = { title: req.body.title, text: req.body.text };
  note.id = uuidv4();
  noteArray.push(note);
  console.log(note);
  fs.writeFile(
    path.join(__dirname, "../db/db.json"),
    JSON.stringify(noteArray),
    () => {
      console.log("file written succesfully");
    }
  );
  res.end();
});

router.get("/notes", (req, res) => {
  res.json(noteArray);
});

router.delete("/notes/:id", (req, res) => {
  const id = req.params.id;
  const newNoteArray = noteArray.filter((obj) => obj.id !== id);
  noteArray = newNoteArray;
  res.json(noteArray);
});

module.exports = router;
