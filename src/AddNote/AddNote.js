import React, { Component } from 'react';
import ValidationError from '../ValidationError/ValidationError';
import NotefulContext from '../NotefulContext';

import './AddNote.css';

function postNote(note, cb) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'content-type':'application/json'
    },
    body: JSON.stringify(note)
  };

  fetch('http://localhost:8000/api/notes/', requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Received status ${response.status} and message: "${response.statusText}"`)
      }  
        return response.json()
    })
    .then(note => {
      cb(note)
    })
    .catch(error => console.log(error));
}

class AddNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddingNote: false,
      noteTitle: {
        value: '', 
        touched: false
      },
      noteContent: {
        value: ''
      },
      noteFolderId: {
        value: '',
        touched: false
      }
    }
  }

  static contextType = NotefulContext;

  toggleIsAddingNote = () => {
    this.setState({
      isAddingNote: true
    })
  }

  updateNoteTitle = (event) => {
    this.setState({
      noteTitle: { value: event.target.value, touched: true }
    })
  }

  updateNoteContent = (event) => {
    this.setState({
      noteContent: { value: event.target.value, touched: true }
    })
  }

  updateNoteFolderId = (event) => {
    this.setState({
      noteFolderId: { value: event.target.value, touched: true }
    })
  }

  validateNoteTitle() {
    const title = this.state.noteTitle.value.trim();

    if (title === '') {
      return 'Note Title is required and must have at least one character.'
    }
  }

  validateNoteFolder() {
    const folder = this.state.noteFolderId.value.trim();

    if (folder === '') {
      return 'Folder is required, please select a folder for note.'
    }
  }

  resetForm = () => {
    this.setState({
      isAddingNote: false,
      noteTitle: {
        value: '', 
        touched: false
      },
      noteContent: {
        value: ''
      },
      noteFolderId: {
        value: '',
        touched: false
      }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const note = {
      note_name: this.state.noteTitle.value,
      content: this.state.noteContent.value,
      folder_id: parseInt(this.state.noteFolderId.value)
    }

    console.log('note', note);

    postNote(note, this.context.createNote)

    this.resetForm();
  }

  createFolderOptions() {
    const folderOptions = this.context.folders
      .map(folder => {
      return (<option key={folder.id} value={folder.id}>{folder.folder_name}</option>);
      });

    return folderOptions;
  }

  render() {
    return (
      <>
        {this.state.isAddingNote && 
        (
          <form className="add-note-form" onSubmit={this.handleSubmit}>
            <label htmlFor="title">Note Title *</label>
            <input name="title" id="title" onChange={this.updateNoteTitle} placeholder="Note Title"/>
            {this.state.noteTitle.touched && (<ValidationError message={this.validateNoteTitle()} />)}

            <label htmlFor="note-content">Content</label>
            <textarea placeholder="Note Content" name="note-content" id="note-content" onChange={this.updateNoteContent}/>

            <label htmlFor="note-folder-id">Folder *</label>
            <select name="note-folder-id" id="note-folder-id" onChange={this.updateNoteFolderId}>
              <option value=''>Select Folder</option>
              {this.createFolderOptions()}  
            </select>
            {this.state.noteFolderId.touched && (<ValidationError message={this.validateNoteFolder()}/>)}

            <button type="button" onClick={this.resetForm}>Cancel</button>
            <button 
              disabled={
                this.validateNoteTitle() ||
                this.validateNoteFolder()  
              }
              type="submit"
            >
              Add Note
            </button>
          </form>
        )}

        {!this.state.isAddingNote && 
        (
          <button type="button" onClick={this.toggleIsAddingNote}>
            Add Note
          </button>
        )}
      </>
    )
  }
}

export default AddNote;