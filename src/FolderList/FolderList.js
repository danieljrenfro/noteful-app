import React from 'react';

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
      return <FolderError key={folder.id}><Folder key={folder.id} id={folder.id} folder_name={folder.folder_name}/></FolderError>
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

export default FolderList;