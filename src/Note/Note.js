import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

import React, { Component } from 'react';
import './Note.css';
import NotefulContext from '../NotefulContext';

function deleteNote(noteId, cb) {
  fetch(`http://localhost:9090/notes/${noteId}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    }
  })
  .then(res => {
    if (!res.ok) {
      return res.json().then(error => {
        throw error;
      });
    }
  })
  .then(() => cb(noteId))
  .catch(error => console.log(error))
}

class Note extends Component {
  static contextType = NotefulContext;
  
  render() {
    const note = this.props.note;
    const modifiedDate = format(new Date(note.modified), "MMM dd, yyyy HH:mm:ss");
    
    return (
      <li className='note-item'>
        <h2 className='note-title'><Link to={`/note/${note.id}`}>{note.name}</Link></h2>
        <div>
          <p>Date modified on {modifiedDate}</p>
          <button onClick={() => deleteNote(note.id, this.context.deleteNote(note.id))}>Delete</button>
        </div>
      </li>
    )
  }
}

Note.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    modified: PropTypes.string.isRequired,
    folderId: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  })
}

export default Note;