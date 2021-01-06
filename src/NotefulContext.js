import React from 'react';

const NotefulContext = React.createContext({
  folders: [],
  notes: [],
  deleteNote: () => {},
  deleteNoteBack: () => {},
  createFolder: () => {},
  createNote: () => {}
});

export default NotefulContext;