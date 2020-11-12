import Folder from './Folder';
import './FolderList.css';

function FolderList(props) {
  const folders = props.folders.map((folder) => {
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

export default FolderList;