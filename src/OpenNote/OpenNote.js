import React from 'react';
import Note from '../Note/Note';
import NotefulContext from '../NotefulContext';
import PropTypes from 'prop-types';
import './OpenNote.css';

class OpenNote extends React.Component {

  static contextType = NotefulContext;

  render() {
    const note = this.context.notes.find(note => note.id === this.props.match.params.noteId);
    
    return (
      <>
        <Note key={note.id} note={note}/>
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
      noteId: PropTypes.number.isRequired
    })
  })
};

export default OpenNote;