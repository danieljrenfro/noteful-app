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
  note: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    modified: PropTypes.string,
    folderId: PropTypes.string,
    content: PropTypes.string
  }),
  context: PropTypes.shape({
    notes: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      modified: PropTypes.string,
      folderId: PropTypes.string,
      content: PropTypes.string
    }))
  })
};

export default OpenNote;