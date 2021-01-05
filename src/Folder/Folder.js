import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Folder.css';

function Folder(props) {
  return (
    <h2 className='folder-item'>
      <NavLink to={`/folder/${props.id}`}>{props.folder_name}</NavLink>
    </h2>
  )
}

Folder.propTypes = {
  id: PropTypes.number.isRequired,
  folder_name: PropTypes.string.isRequired
}

export default Folder;