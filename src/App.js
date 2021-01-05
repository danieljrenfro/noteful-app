import React from 'react';
import NotefulContext from './NotefulContext';

import Header from './Header/Header';
import Main from './Main/Main';
import NoteList from './NoteList/NoteList';
import FilteredNoteList from './FilteredNoteList/FilteredNoteList';
import OpenNote from './OpenNote/OpenNote';
import SideBar from './SideBar/SideBar';
import FolderList from './FolderList/FolderList';
import NoteSideBar from './NoteSideBar/NoteSideBar';
import SidebarError from './ErrorBoundaries/SidebarError';
import MainError from './ErrorBoundaries/MainError';

import { Route, Switch }  from 'react-router-dom';

import './App.css';

class App extends React.Component {
  state = {
    folders: [],
    notes: [],
    error: null,
  };

  setFolders = (folders) => {
    this.setState({
      folders,
      error: null,
    })
  }

  getFolders = ()  => {
    fetch('http://localhost:8000/api/folders')
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(folders => this.setFolders(folders))
      .catch(error => this.setState({ error }))
  }

  setNotes = (notes) => {
    this.setState({
      notes,
      error: null,
    })
  }

  getNotes = () => {
    fetch('http://localhost:8000/api/notes')
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json();
      })
      .then(notes => this.setNotes(notes))
      .catch(error => this.setState({ error }))
  }

  deleteNote = (noteId) => {
    const newNotes = this.state.notes.filter(note => note.id !== noteId);
    this.setState({
      notes: newNotes,
    })
  }

  createFolder = (folder) => {
    this.setState({
      folders: [...this.state.folders, folder]
    })
  }

  createNote = (note) => {
    this.setState({
      notes: [...this.state.notes, note]
    })
  }

  componentDidMount() {
    this.getFolders();
    this.getNotes();
  }

  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.deleteNote,
      createFolder: this.createFolder,
      createNote: this.createNote
    }
    return (
      <NotefulContext.Provider value={contextValue}>
        {/* Header Route */}
        <Route path='/' component={Header}/>
        <main>
          {/* SideBar Routes */}
          <SidebarError>
            <SideBar>
              <Switch>
                <Route
                  exact
                  path='/note/:noteId'
                  component={NoteSideBar}
                /> 
                <Route 
                  path='/'
                  component={FolderList}
                /> 
              </Switch>
            </SideBar>
          </SidebarError>  
          {/* Main Section Routes */}
          <MainError>
            <Main>
              <Switch>
                <Route
                  exact
                  path='/folder/:folderId'
                  component={FilteredNoteList}
                />
                <Route
                  exact
                  path='/note/:noteId'
                  component={OpenNote}
                />
                <Route 
                  path='/'
                  component={NoteList}
                />
              </Switch>
            </Main>
          </MainError>  
        </main>
      </NotefulContext.Provider> 
    )
  }
}

export default App;
