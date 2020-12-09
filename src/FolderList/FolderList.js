import React from 'react';
import PropTypes from 'prop-types';

import NotefulContext from '../NotefulContext';
import AddFolder from '../AddFolder/AddFolder';
import Folder from '../Folder/Folder';
import FolderError from '../ErrorBoundaries/FolderError';

import './FolderList.css';

class FolderList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddingFolder: false
    }
  }
  
  static contextType = NotefulContext;
  
  render() {
    const folders = this.context.folders.map((folder) => {
      return <FolderError><Folder key={folder.id} id={folder.id} name={folder.name}/></FolderError>
    });

    return (
      <section>
        <AddFolder />
        <nav>
          <ul className='folder-list'>
            {folders}
          </ul>
        </nav>
      </section>
    )
  }
}

FolderList.propTypes = {
  context: PropTypes.shape({
    folders: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string
    }))
  })
}

export default FolderList;