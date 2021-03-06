import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import React, { Component } from 'react';
import './Note.css';
import NotefulContext from '../NotefulContext';

function deleteNote(noteId, cb) {
  fetch(`https://obscure-stream-85944.herokuapp.com/api/notes/${noteId}`, {
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
  
  generateDeleteButton = (note) => {
    if (this.props.isOpen) {
      return <button onClick={() => deleteNote(note.id, this.context.deleteNoteBack)}>Delete</button>
    }
    return <button onClick={() => deleteNote(note.id, this.context.deleteNote)}>Delete</button>
  }

  render() {
    const note = this.props.note;
    const modifiedDate = new Date(note.date_modified).toLocaleString();
    
    return (
      <li className='note-item'>
        <h2 className='note-title'><Link to={`/note/${note.id}`}>{note.note_name}</Link></h2>
        <div>
          <p>Date modified on {modifiedDate}</p>
          {this.generateDeleteButton(note)}
        </div>
      </li>
    )
  }
}

Note.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.number.isRequired,
    note_name: PropTypes.string.isRequired,
    date_modified: PropTypes.string.isRequired,
    folder_id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired
  })
}

export default Note;