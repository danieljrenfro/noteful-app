import React from 'react';
import Note from '../Note/Note';
import NotefulContext from '../NotefulContext';
import '../NoteList/NoteList.css'

class FilteredNoteList extends React.Component {

  static contextType = NotefulContext;

  render() {

    const filterId = this.props.match.params.folderId;
    const notes = this.context.notes
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
}

export default FilteredNoteList;