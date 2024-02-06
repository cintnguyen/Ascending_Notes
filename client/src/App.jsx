

import { useState, useEffect } from 'react';
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import noteService from './services/notes'

//create variable for backend url
const baseUrl = 'http://localhost:3001/api'

const App = () => {
  // const [notes, setNotes] = useState([])
  const [allNotes, setAllNotes] = useState([])
  const [formData, setFormData] = useState({
    content: "",
    important: false
  })
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)


  //Fetch all notes from the database

  useEffect(() => {
    const fetchAllNotes = async () => {
      try {
        //fetch data from mongo 
        const response = await fetch(`${baseUrl}/notes`)

        //parse data into json
        const data = await response.json()

        //set all notes into the state variable for all notes
        setAllNotes(data.notes)
      } catch (error) {
        setError(error)
      }
    }

    //call the fetch function within useEffect and then recall this effect whenever there is a change to ALl notes 
    fetchAllNotes()
  }, [allNotes])

  //create a handle submit for the form to add a new note

  const handleSubmit = async (event) => {
    //prevent default reload of submit button 
    event.preventDefault()
    try {
      //Fetch to backend API using a POST method with the correct endpoint
      const response = await fetch(`${baseUrl}/createNote`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json', // Set the content type header
        },
        body: JSON.stringify(formData) // Stringify the body
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // Handle response from server
      const data = await response.json()
      console.log(data)
      

    } catch (error) {
      setErrorMessage("there was an error")
      console.error("There was a problem with the fetch operation: ", error)
    }
  }


  //Update formDate when there is a change in form box and set state variable formData to be the value of the form
  const handleNoteChange = (event) => {

    //pull name and value data from target of the event
    const { name, value } = event.target

    //set formData state variable to a new changed value using the setFormData function
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value  //This should match the name of the input changed and update its value
    }))
  }


  //create function toggle imporantance status of note that was clicked 

  const toggleImportanceOf = async (id) => {
    //Fetch to backend API using a PUT method with the correct endpoint
    try {
      const response = await fetch(`${baseUrl}/notes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      })


      // return new allNotes array
      if (response.ok) {
        setAllNotes((currentNotes) => {

          //loop through notes, if id is equal to any of the notes id then change that note's important status if not return the original note
          return currentNotes.map((note) => {
            if (note._id === id) {
              return { ...note, important: !note.important }
            } else {
              return note
            }
          })
        })
      } else {
        console.error("Failed to like the post", await response.json())
      }

    } catch (error) {
      console.error("There was an error liking the post: ", error)
    }

  }


  //Delete notes  

  const deleteNote = async (id) => {
    //Fetch to backend API using a DELETE method with the correct endpoint
    try {
      const response = await fetch(`${baseUrl}/notes/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })


      // return new allNotes array
      if (response.ok) {
        //loop through notes and return all notes that are not equal to the ID from the param
        setAllNotes((currentNotes) => {
          return currentNotes.filter((note) => note._id !== id)
        })
      } else {
        console.error("Failed to like the post", await response.json())
      }

    } catch (error) {
      console.error("There was an error liking the post: ", error)
    }

  }


  //Toggle show all for notes and show all notes marked as important. (If showAll is true, show all notes, if not true only show imporant notes)
  const notesToShow = showAll
    ? allNotes
    : allNotes.filter(note => note.important)



  return (
    <>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul id="notes">
        {notesToShow.map(note =>
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note._id)}
            deleteNote={() => deleteNote(note._id)}
          />
        )}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={formData.content}
          name="content"
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
      <Footer />
    </>
  )
}

export default App
