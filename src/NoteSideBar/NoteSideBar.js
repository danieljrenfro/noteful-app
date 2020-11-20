import React from 'react';
import { Link } from 'react-router-dom';
import NotefulContext from '../NotefulContext';
import history from '../history';
import './NoteSideBar.css';

class NoteSideBar extends React.Component {
  
  static contextType = NotefulContext;
  
  render() {
    const note = this.context.notes.find(note => note.id === this.props.match.params.noteId);
    const folder = this.context.folders.find(folder => folder.id === note.folderId); 

    return (
      <>
        <button onClick={history.goBack}>Go Back</button>
        <h2><Link to={`/folder/${folder.id}`}>{folder.name}</Link></h2>
      </>
    )
  }
}

export default NoteSideBar;