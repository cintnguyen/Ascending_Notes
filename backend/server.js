require('dotenv').config();
const cors = require('cors')
const express = require('express');
const mongoose = require('mongoose');
const app = express();


app.use(cors())
app.use(express.json()); // Parse JSON bodies

const url = process.env.DB_STRING

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
    //create a new note using the req body, all new notes' importance should always be false to start
    const note = await Note.create({
      content: req.body.content,
      important: false
    })

    //check that note was created successfully
    console.log("Note has been added!")

    //send status and note data 
    res.status(200).send({ message: "Note added successfully", note: note })
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: "Error adding note" })
  }
})

//toggle importance functionality 

app.put('/api/notes/:id', async (req, res) => {
  try {
    //Using id from params find the note that was clicked in the DB
    const note = await Note.findById(req.params.id);

    //If the note does not exist send error message 
    if (!note) {
      return res.status(404).send({ message: "Note not found" });
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
    const note = await Note.findById(req.params.id)

    if (!note) {
      return res.status(404).send({ message: "Note not found" });
    }

    await Note.findByIdAndDelete(req.params.id)
    res.status(200).send({ message: "Note deleted successfully" })
  } catch (err) {
    console.error(err)
    res.status(500).send({ message: "Error deleting note" })
  }
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

