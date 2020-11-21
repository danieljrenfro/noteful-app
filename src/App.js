import React from 'react';

import Header from './Header/Header';
import NoteList from './NoteList/NoteList';
import FolderList from './FolderList/FolderList';
import SideBar from './SideBar/SideBar';
import Main from './Main/Main';
import FilteredNoteList from './FilteredNoteList/FilteredNoteList';
import NoteSideBar from './NoteSideBar/NoteSideBar';
import OpenNote from './OpenNote/OpenNote';
import NotefulContext from './NotefulContext';

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
    fetch('http://localhost:9090/folders')
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(this.setFolders)
      .catch(error => this.setState({ error }))
  }

  setNotes = (notes) => {
    this.setState({
      notes,
      error: null,
    })
  }

  getNotes = () => {
    fetch('http://localhost:9090/notes')
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json();
      })
      .then(this.setNotes)
      .catch(error => this.setState({ error }))
  }

  deleteNote = (noteId) => {
    const newNotes = this.state.notes.filter(note => note.id !== noteId);
    this.setState({
      notes: newNotes,
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
    }
    return (
      <NotefulContext.Provider value={contextValue}>
        {/* Header Route */}
        <Route path='/' component={Header}/>
        <main>
          {/* SideBar Routes */}
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
          {/* Main Section Routes */}
          <Main>
            <Route 
              exact
              path='/'
              component={NoteList}
            />
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
          </Main>
        </main>
      </NotefulContext.Provider> 
    )
  }
}

export default App;
