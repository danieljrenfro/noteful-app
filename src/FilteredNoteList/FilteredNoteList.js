import React from 'react';
import Note from '../Note/Note';
import AddNote from '../AddNote/AddNote';
import NotefulContext from '../NotefulContext';
import NoteError from '../ErrorBoundaries/NoteError';
import PropTypes from 'prop-types';

import '../NoteList/NoteList.css'

class FilteredNoteList extends React.Component {

  static contextType = NotefulContext;

  render() {

    const filterId = this.props.match.params.folderId;
    const notes = this.context.notes
      .filter(note => note.folder_id === parseInt(filterId))
      .map(note => <NoteError key={note.id}><Note key={note.id} note={note}/></NoteError>);
    
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
  match: PropTypes.shape({
    params: PropTypes.shape({
      folderId: PropTypes.string.isRequired
    })
  })
}

export default FilteredNoteList;