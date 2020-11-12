import React from 'react';
import Note from './Note';
import './OpenNote.css';

export default function OpenNote(props) {
  const note = props.notes.find(note => note.id === props.match.params.noteId);

  return (
    <>
      <Note key={note.id} note={note}/>
      <div>
        {note.content}
      </div>
    </>
  )
}