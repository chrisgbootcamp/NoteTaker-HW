const router = require("express").Router();
const Notes = require("../db/Notes");

router.get("/api/notes", (req, res) => {
  Notes.getNotes().then((notes) => res.json(notes)).catch((err) => res.status(500).json(err))
});

router.post("/api/notes", (req, res) => {
  Notes.addNote(req.body).then((note) => res.json(note)).catch((err) => res.status(500).json(err))
});


router.post("/api/notes/:id", (req, res) => {
  Notes.removeNote(req.params.id).then(() => res.json({ ok: true })).catch((err) => res.status(500).json)

})