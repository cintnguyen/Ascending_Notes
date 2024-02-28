import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'
import ListGroup from 'react-bootstrap/ListGroup';


const Note = ({ note, key, toggleImportance, deleteNote }) => {
  const starIcon = note.important === true ? "star-filled.png" : "star-empty.png"
  const importantLabel = note.important ? "Unmark as favorite" : "Mark as favorite"
  const deleteIcon = "icons8-delete-30.png"

  return (
    <ListGroup horizontal>
      <ListGroup.Item as="li" className='Note'>
          <div key={key}>
            {note.content}
          <ListGroup.Item>
            <Button
              // variant="outline-light"
              id="important"
              onClick={toggleImportance}
              aria-label={importantLabel}
              aria-pressed={note.important}> 
              <Image
                src={`../images/${starIcon}`}
                alt="star icon."
                width="30"
                height="30"
                fluid
              /> 
              make important
              </Button>
              <Button variant="danger" className ="delete"
              onClick={deleteNote}
              aria-label=""
              > 
              <img
                src={`../images/${deleteIcon}`}
                alt="star icon."
              /> 
              delete
              </Button>
              </ListGroup.Item>
        </div>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default Note;