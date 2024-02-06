require('dotenv').config();
const cors = require('cors')
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(cors())
app.use(express.json()); // Parse JSON bodies

const url = process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

//Get all notes for display
app.get('/api/notes', /* authenticateToken, */ async (req, res) => {
    try {
        //find all notes from database
        const notes = await Note.find()
        //return notes to FE in json
        res.json({ notes: notes })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal Server Error" })
    }
});

//create a new note in the db
app.post('/api/createNote', async (req, res) => {
    try {

        if (!req.body.content) {
            return res.status(400).send({ error: "Note validation failed: content: Path `content` is required." });
        }

        //create a new note using the req body, all new notes' importance should always be false to start
        const note = await Note.create({
            content: req.body.content,
            important: false
        })

        //check that note was created successfully
        console.log("Note has been added!")
        //send status and note data
        res.status(201).send({ message: "Note added successfully", note: note });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Error adding note" });
    }
})

//toggle importance functionality
app.put('/api/notes/:id', async (req, res) => {
    try {
        //Using id from params find the note that was clicked in the DB
        const note = await Note.findById(req.params.id);
        //If the note does not exist send error message
        if (!note) {
            return res.status(404).send({ error: "unknown endpoint" });
        }
        //update the note with find and update, and set the important to the opposite value each time its clicked
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { $set: { important: !note.important } }, { new: true });
        //send updated note to the frontend
        res.status(200).send({ message: "Note important status changed", note: updatedNote });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Error updating note" });
    }
})

app.delete('/api/notes/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ message: "Note not found" }); 
        }
        await Note.findByIdAndDelete(req.params.id);
        
        res.status(200).json({ message: "Note deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error deleting note" });
    }
});
//Delete test notes only!!!

app.delete('/api/cleartests', async (req, res) => {
    try {
        const note = await Note.deleteMany({content: "This is a testing note"})
        res.status(204).end()
    } catch (err) {
        console.error(err)
        res.status(500).send({ message: "Error deleting test notes" })
    }
})

module.exports = app;