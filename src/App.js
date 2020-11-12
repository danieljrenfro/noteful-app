import React from 'react';

import store from './store';
import Header from './Header';
import NoteList from './NoteList';
import FolderList from './FolderList';
import SideBar from './SideBar';
import Main from './Main';
import FilteredNoteList from './FilteredNoteList';
import NoteSideBar from './NoteSideBar';
import OpenNote from './OpenNote';

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
    return (
      <>
        {/* Header Route */}
        <Route path='/' component={Header} />
        <main>
          {/* SideBar Routes */}
          <SideBar>
            <Switch>
              <Route
                exact
                path='/note/:noteId'
                render={({match, history}) => 
                <NoteSideBar 
                  match={match} 
                  notes={this.state.notes} 
                  folders={this.state.folders}
                  onClickGoBack={() => history.goBack()}
                />}
              /> 
              <Route 
                path='/'
                render={() => 
                <FolderList 
                  folders={this.state.folders} />}
              /> 
            </Switch>
          </SideBar>
          {/* Main Section Routes */}
          <Main>
            <Route 
              exact
              path='/'
              render={() => 
              <NoteList notes={this.state.notes} />}
            />
            <Route
              exact
              path='/folder/:folderId'
              render={(routerProps) => 
              <FilteredNoteList {...routerProps} notes={this.state.notes}/>}
            />
            <Route
              exact
              path='/note/:noteId'
              render={(routerProps) => 
              <OpenNote {...routerProps} notes={this.state.notes}/>}
            />
          </Main>
        </main>
      </> 
    )
  }
}

export default App;
