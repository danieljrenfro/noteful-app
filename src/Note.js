import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import './Note.css';

export default function Note(props) {
  const note = props.note;
  const modifiedDate = format(new Date(note.modified), "MMM dd, yyyy HH:mm:ss");
  
  return (
    <li className='note-item'>
      <h2 className='note-title'><Link to={`/note/${note.id}`}>{note.name}</Link></h2>
      <div>
        <p>Date modified on {modifiedDate}</p>
        <button>Delete</button>
      </div>
    </li>
  )
}