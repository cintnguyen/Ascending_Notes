const Note = ({ note, key, toggleImportance, deleteNote }) => {
  const starIcon = note.important === true ? "star-filled.png" : "star-empty.png"
  const importantLabel = note.important ? "Unmark as favorite" : "Mark as favorite"
  const deleteIcon = "icons8-delete-30.png"

  return (
    <li className='Note'>
      <div key={key}>
        {note.content}
        <button 
          id="important"
          onClick={toggleImportance}
          aria-label={importantLabel}
          aria-pressed={note.important}> 
          <img
            src={`../images/${starIcon}`}
            alt="star icon."
            
          /> 
          make important
          </button>
          <button className ="delete"
          onClick={deleteNote}
          aria-label=""
          > 
          <img
            src={`../images/${deleteIcon}`}
            alt="star icon."
          /> 
          delete
          </button>
      </div>
      </li>
  );
};

export default Note;
