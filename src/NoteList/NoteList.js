import React from 'react'
import Note from '../Note/Note';
import AddNote from '../AddNote/AddNote';
import NotefulContext from '../NotefulContext';
import NoteError from '../ErrorBoundaries/NoteError';
import './NoteList.css'

 class NoteList extends React.Component {
   static contextType = NotefulContext;
  
   render() {
    const notes = this.context.notes.map((note) => {
      return <NoteError key={note.id}>
          <Note key={note.id} isOpen={false}  note={note}/>
        </NoteError>
    })

    return (
      <div>
        <AddNote/>
        <ul className='notes-list'>
          {notes}
        </ul>
      </div>  
    )
  }
}

export default NoteList;