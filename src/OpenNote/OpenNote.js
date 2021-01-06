import React from 'react';
import Note from '../Note/Note';
import NotefulContext from '../NotefulContext';
import PropTypes from 'prop-types';
import './OpenNote.css';

class OpenNote extends React.Component {

  static contextType = NotefulContext;

  render() {
    const noteId = parseInt(this.props.match.params.noteId);

    const note = this.context.notes.find(note => note.id === noteId);
    
    return (
      <>
        <Note key={note.id} isOpen={true} note={note}/>
        <div>
          {note.content}
        </div>
      </>
    )
  }
}

OpenNote.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      noteId: PropTypes.string.isRequired
    })
  })
};

export default OpenNote;