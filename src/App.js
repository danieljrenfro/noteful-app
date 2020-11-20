import React from 'react';

import store from './store';
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

const { folders, notes } = store;

class App extends React.Component {
  state = {
    folders: [],
    notes: []
  };

  componentDidMount() {
    this.setState({
      folders: folders,
      notes: notes
    } 
    )
  }

  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
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
