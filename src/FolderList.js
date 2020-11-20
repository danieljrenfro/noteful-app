import React from 'react';
import Folder from './Folder';
import NotefulContext from './NotefulContext';
import './FolderList.css';

class FolderList extends React.Component {
  static contextType = NotefulContext;
  
  render() {
    const folders = this.context.folders.map((folder) => {
      return <Folder key={folder.id} id={folder.id} name={folder.name} ></Folder>
    });

    return (
      <section>
        <nav>
          <ul className='folder-list'>
            {folders}
          </ul>
        </nav>
        <button className='add-folder-button'>Add Folder</button>
      </section>
    )
  }
}

export default FolderList;