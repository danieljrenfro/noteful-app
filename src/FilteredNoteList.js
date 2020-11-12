import React from 'react';
import Note from './Note';
import './NoteList.css'

export default function FilteredNoteList(props) {
  const filterId = props.match.params.folderId;
  const notes = props.notes
    .filter(note => note.folderId === filterId)
    .map(note => <Note key={note.id} note={note}/>);
  
  return (
    <div>
      <ul className='notes-list'>
        {notes}
      </ul>
      <button>Add Note</button>
    </div>
    
  )
}