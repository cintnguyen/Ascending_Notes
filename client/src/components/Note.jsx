const Note = ({ note, key, toggleImportance, deleteNote }) => {
  const starIcon = note.important === true ? "star-filled.png" : "star-empty.png"
  const importantLabel = note.important ? "Unmark as favorite" : "Mark as favorite"
  const deleteIcon = "icons8-delete-30.png"

  return (
    <>
      <div key={key}>
        {note.content}
        <button
          onClick={toggleImportance}
          aria-label={importantLabel}
          aria-pressed={note.important}> 
          <img
            src={`../images/${starIcon}`}
            alt="star icon."
          /> 
          </button>
          <button
          onClick={deleteNote}
          aria-label=""
          > 
          <img
            src={`../images/${deleteIcon}`}
            alt="star icon."
          /> 
          </button>
      </div>
    </>
  );
};

export default Note;
