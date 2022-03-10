const router = require('express').Router()
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const noteArray = require('../db/db.json')


router.post('/notes', (req, res) => {
 const note = req.body;
 note.id = uuidv4();
 noteArray.push(note)
 fs.writeFileSync(
    path.join(__dirname, '../db/db.json'),
    JSON.stringify({ noteArray }, null, 2)
  );
})


module.exports = router;