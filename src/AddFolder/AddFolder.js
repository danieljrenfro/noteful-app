import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import NotefulContext from '../NotefulContext';
import ValidationError from '../ValidationError/ValidationError';

import './AddFolder.css';

function postFolder(folder_name, cb) {
  const id = uuidv4();
  const requestOptions = {
    method: 'POST',
    headers: {'content-type':'application/json'},
    body: JSON.stringify({
      id: id,
      folder_name: folder_name
    })
  }

  fetch('http://localhost:8000/api/folders', requestOptions)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Received status ${response.status} and message: ${response.statusText}`)
    }
    return response.json();
  })
  .then(folder => {
    cb(folder);
  })
  .catch(error => console.log(error));
}

class AddFolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: {
        value: '',
        touched: false
      },
      isAddingFolder: false
    }
  }

  static contextType = NotefulContext;

  toggleIsAddingFolder = () => {
    this.setState({
      isAddingFolder: !this.state.isAddingFolder
    });
  }

  updateTitle = (event) => {
    this.setState({ title: { value: event.target.value, touched: true }})
  }

  validateTitle() {
    if (this.state.title.value.trim() === '') {
      return 'Title cannot be empty and must contain at least one character.'
    };
  }

  resetForm = () => {
    this.setState({
      title: { value: '', touched: false },
    });
    this.toggleIsAddingFolder();
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const title = this.state.title.value;

    postFolder(title, this.context.createFolder);
    this.resetForm();
  }

  render() {
    const title = this.state.title.value;

    return (
      <>
        {this.state.isAddingFolder && 
        (<form className="add-folder-form" onSubmit={(e) => this.handleSubmit(e)}>
          <label htmlFor="title">Title</label>
          <input 
            onChange={(e) => this.updateTitle(e)} 
            value={title}
            name="title" 
            id="title" 
            placeholder="Folder Title" 
            required/>
          {this.state.title.touched && (<ValidationError message={this.validateTitle()}/>)}

          <button onClick={() => this.resetForm()} type="button">Cancel</button>
          <button 
            type="submit"
            disabled={this.validateTitle()}
          >
            Add Folder
          </button>
        </form>)}

        {!this.state.isAddingFolder &&
        (<button onClick={() => this.toggleIsAddingFolder()} className='add-folder-button'>Add Folder</button>)}
      </>
    );
  }
}

export default AddFolder;