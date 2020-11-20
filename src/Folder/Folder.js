import React from 'react';
import { NavLink } from 'react-router-dom';
import './Folder.css';

function Folder(props) {
  return (
    <h2 className='folder-item'>
      <NavLink to={`/folder/${props.id}`}>{props.name}</NavLink>
    </h2>
  )
}

export default Folder;