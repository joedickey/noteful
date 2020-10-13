import React from 'react'

const NotefulContext = React.createContext({
    folders: [],
    notes: [],
    folder__id: '',
    note__id: '',
    updateFolderId: () => {},
    updateNoteId: () => {},
    deleteNote: () => {},
    updateRender: () => {},
})

export default NotefulContext;