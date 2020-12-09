import React from 'react'
import Note from '../Note/Note';
import AddNote from '../AddNote/AddNote';
import NotefulContext from '../NotefulContext';
import PropTypes from 'prop-types';
import NoteError from '../ErrorBoundaries/NoteError';
import './NoteList.css'

 class NoteList extends React.Component {
   static contextType = NotefulContext;
  
   render() {
    const notes = this.context.notes.map((note) => {
      return <NoteError><Note key={note.id} note={note}/></NoteError>
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

NoteList.propTypes = {
  context: PropTypes.shape({
    notes: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      modified: PropTypes.string,
      folderId: PropTypes.string,
      content: PropTypes.string
    }))
  })
}

export default NoteList;