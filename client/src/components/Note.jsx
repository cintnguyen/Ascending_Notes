const Note = ({ note, toggleImportance }) => {
  return (
    <>
      <li>
        {note.content}
        <button onClick={toggleImportance}> important </button>
      </li>
    </>
  );
};

export default Note;
