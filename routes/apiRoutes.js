const router = require("express").Router();
const notes = require("../db/Notes");

router.get("/notes", (req, res) => {
  notes.getNotes().then((notes) => res.json(notes)).catch((err) => res.status(500).json(err))
});

router.post("/notes", (req, res) => {
  notes.addNote(req.body).then((note) => res.json(note)).catch((err) => res.status(500).json(err))
});


router.post("/notes/:id", (req, res) => {
  notes.removeNote(req.params.id).then(() => res.json({ ok: true })).catch((err) => res.status(500).json(err))
});

module.exports = router;