import React from 'react'

const NotefulContext = React.createContext({
    folders: [],
    notes: [],
    folder__id: '',
    note__id: '',
    updateFolderId: () => {},
    updateNoteId: () => {},
    deleteNote: () => {},
    updateFolders: () => {},
    updateNotes: () => {}
})

export default NotefulContext;