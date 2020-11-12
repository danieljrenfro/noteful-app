import React from 'react';
import { Link } from 'react-router-dom';
import './NoteSideBar.css';

export default function NoteSideBar(props) {
  console.log('props', props);
  const note = props.notes.find(note => note.id === props.match.params.noteId);
  const folder = props.folders.find(folder => folder.id === note.folderId);

  return(
    <>
      <button onClick={props.onClickGoBack}>Go Back</button>
      <h2><Link to={`/folder/${folder.id}`}>{folder.name}</Link></h2>
    </>
  )
}