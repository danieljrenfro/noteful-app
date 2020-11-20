import React from 'react'
import Note from './Note';
import NotefulContext from './NotefulContext';
import './NoteList.css'

 class NoteList extends React.Component {
   static contextType = NotefulContext;
  
   render() {
    const notes = this.context.notes.map((note) => {
      return <Note key={note.id} note={note}/>
    })

    return (
      <div>
        <ul className='notes-list'>
          {notes}
        </ul>
        <button>Add Note</button>
      </div>  
    )
  }
}

export default NoteList;