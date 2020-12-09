import React from 'react';
import Note from '../Note/Note';
import AddNote from '../AddNote/AddNote';
import NotefulContext from '../NotefulContext';
import PropTypes from 'prop-types';
import NoteError from '../ErrorBoundaries/NoteError';
import '../NoteList/NoteList.css'

class FilteredNoteList extends React.Component {

  static contextType = NotefulContext;

  render() {

    const filterId = this.props.match.params.folderId;
    const notes = this.context.notes
      .filter(note => note.folderId === filterId)
      .map(note => <NoteError><Note key={note.id} note={note}/></NoteError>);
    
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

FilteredNoteList.propTypes = {
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

export default FilteredNoteList;