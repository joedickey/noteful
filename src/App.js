import React, { Component} from 'react';
import {Route, Link} from 'react-router-dom'
import './App.css';
import NotefulContext from './NotefulContext'
import MainSidebar from './MainSidebar/MainSidebar'
import MainMain from './MainMain/MainMain'
import NoteSidebar from './NoteSidebar/NoteSidebar'
import NoteMain from './NoteMain/NoteMain'
import AddFolder from './AddFolder/AddFolder'
import AddNote from './AddNote/AddNote'
import PropTypes from 'prop-types'
import ErrorBoundary from './ErrorBoundary/ErrorBoundary'


class App extends Component {
  static contextType = NotefulContext

  state = {
    folders: [],
    notes: [],
    folder__id: '',
    note__id: '',
  }

  componentDidMount() {
    fetch('http://localhost:9090/folders')
      .then(response => {
        if (!response.ok) {
          throw new Error('Something went wrong')
        }
        return response.json()
      })
      .then(responseJson => {
        this.setState({
          folders: responseJson
        })
      })
      .catch(err => console.log(err.message))

      fetch('http://localhost:9090/notes')
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status + ' ' + response.statusText)
        }
        return response.json()
      })
      .then(responseJson => {
        this.setState({
          notes: responseJson
        })
      })
      .catch(err => console.log('Something went wrong: ' + err.message))
  }
  
    updateFolderId = (folderId) => {
      this.setState({
        folder__id: folderId
      })
    }

    updateNoteId = (noteId) => {
      this.setState({
        note__id: noteId
      })
    }

    resetState = () => {
      this.setState({
        folder__id: '',
        note__id: ''
      })
    }
    
    deleteNote = (noteId) => {
      const newNotes = this.state.notes.filter(note =>
        note.id !== noteId
      )
      this.setState({
        notes: newNotes
      })
    }

    updateFolders = (id, name) => {
      const newFolderObject = {"id": id, "name": name}
      this.state.folders.push(newFolderObject)
      this.setState({
        folders: this.state.folders
      })
    }

    updateNotes = (id, name, date, folderId, content) => {
      const newNoteObject = {
        "id": id, 
        "name": name, 
        "modified": date,
        "folderId": folderId,
        "content": content 
      }
      this.state.notes.push(newNoteObject)
      this.setState({
        notes: this.state.notes
      })
    }

  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      folder__id: this.state.folder__id,
      note__id: this.state.note__id,
      updateFolderId: this.updateFolderId,
      updateNoteId: this.updateNoteId,
      deleteNote: this.deleteNote,
      updateFolders: this.updateFolders,
      updateNotes: this.updateNotes
    }

    return (
      <div className="App">
        <header className='Header__app'>
          <Link to={'/'}
            onClick={() => this.resetState()}>
            <h1>Noteful</h1>
          </Link>
        </header>
        <NotefulContext.Provider value={contextValue}>
          <div className='container__app'>
            <ErrorBoundary>
              <div className='sidebar__app'>
                <Route 
                  exact
                  path={['/', '/addfolder', '/addnote']}
                  component={MainSidebar}/>
                <Route
                path='/folder/:folder__id'
                component={MainSidebar}/>
                <Route 
                path='/note/:note__id/:folder__id'
                component={NoteSidebar}/>
              </div>
            </ErrorBoundary>
            <ErrorBoundary>
              <div className='main__app'>
                <Route
                  exact
                  path='/'
                  component={MainMain}/>
                <Route
                path='/folder/:folder__id'
                component={MainMain}/>
                <Route 
                path='/note/:note__id'
                component={NoteMain}/>
                <Route 
                  path='/addfolder'
                  component={AddFolder}/>
                  <Route 
                  path='/addnote'
                  component={AddNote}/>
              </div>
            </ErrorBoundary>
          </div>
        </NotefulContext.Provider>
      </div>
    );
  }

}

Route.propTypes = {
  path: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.arrayOf(PropTypes.string)]),
  component: PropTypes.oneOfType([PropTypes.object.isRequired, PropTypes.func.isRequired])

}

NotefulContext.Provider.propTypes = {
  value: PropTypes.object
}

Link.propTypes = {
  to: PropTypes.string.isRequired,
  onClick: PropTypes.func
}

export default App;
