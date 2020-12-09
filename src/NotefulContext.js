import React from 'react';

const NotefulContext = React.createContext({
  folders: [],
  notes: [],
  deleteNote: () => {},
  createFolder: () => {},
  createNote: () => {}
});

export default NotefulContext;