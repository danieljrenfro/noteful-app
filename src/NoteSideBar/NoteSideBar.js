import React from 'react';
import { Link } from 'react-router-dom';
import history from '../history';

import PropTypes from 'prop-types';
import NotefulContext from '../NotefulContext';
import './NoteSideBar.css';

class NoteSideBar extends React.Component {
  
  static contextType = NotefulContext;
  
  render() {
    const noteId = parseInt(this.props.match.params.noteId);
    const note = this.context.notes.find(note => note.id === noteId);
    const folder = this.context.folders.find(folder => folder.id === note.folder_id); 

    return (
      <>
        <button onClick={history.goBack}>Go Back</button>
        <h2><Link to={`/folder/${folder.id}`}>{folder.folder_name}</Link></h2>
      </>
    )
  }
}

NoteSideBar.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      noteId: PropTypes.string.isRequired
    })
  })
}

export default NoteSideBar;