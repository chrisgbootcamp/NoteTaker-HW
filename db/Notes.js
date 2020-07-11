const fs = require("fs");
const util = require("util");
const { parse } = require("path");


const readFileAsnyc = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Notes {
    read() {
        return readFileAsnyc("db/db.json", "utf-8");
    }
    write(note) {
        return writeFileAsync("db/db.json", JSON.stringify(note));
    }

    getNotes() {
        return this.read().then(function(notes) {
            let parsedNotes = [];
            try {
                parsedNotes = parsedNotes.concat(JSON.parse(notes));
                console.log(parsedNotes)
                
            } catch (error) {
                parsedNotes = [];
            }
            return parsedNotes;
        })
    }

    // note = req.body
    addNotes(note){
        const { title, text } = note;
        var id = 100;

        if(title === false || text === false){
            throw new Error (" title or texdt cannot be  blank")}

        const newNote = { title, text, id: id++ }

        return this.getNotes().then((notes) => [...notes, newNote]).then(function(updatedNotes) {
            this.write(updatedNotes).then(() => newNote)
        })
    } 
    //id = req.params.id
    removeNote(id) {
        return this.getNotes().then(notes => notes.filter((note) => note.id !== id).then((filteredNotes => this.write(filteredNotes))),
    }

}

module.exports = new Notes();