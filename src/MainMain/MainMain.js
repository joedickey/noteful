import React, { Component} from 'react';
import {Link} from 'react-router-dom'
import './MainMain.css'
import dateFormat from 'dateformat'
import NotefulContext from '../NotefulContext'
import PropTypes from 'prop-types'


class MainMain extends Component {
    static contextType = NotefulContext

    handleDeleteNote(noteId, callback) {
        fetch(`http://localhost:9090/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if(!response.ok) {
                throw new Error(response.status + ' ' + response.statusText)
            }
            return response.json()
        })
        .then (responseJson => {
            callback(noteId)
        })
        .catch(err => console.log('Something went wrong! ' + err.message))      
    }
    
    
    render() {
        const notes = this.context.notes.map((note) => {
            if (this.context.folder__id  === note.folderId || this.context.folder__id === ''){
                return (
                    <NotefulContext.Consumer>
                        {({updateNoteId, updateFolderId, deleteNote}) => (
                            <li key={note.id} id={note.id} folder__id={note.folderId} note__id={note.id}>
                                <div className="noteDetails">
                                    <Link 
                                        to={`../note/${note.id}/${note.folderId}`} 
                                            note__id={note.id} 
                                            folder__id={note.folderId}
                                            onClick={function(e) {
                                                updateNoteId(note.id);
                                                updateFolderId(note.folderId)}}>
                                        <h2>{note.name}</h2>
                                    </Link>
                                    <p>Modified on date: {dateFormat(note.modified, 'ddd, mmm dS, yyyy')}</p>
                                </div>
                                <Link 
                                    to={'/'}
                                    onClick={(e) => updateFolderId('')}>
                                    <button 
                                    type='button'
                                    onClick={(e) => this.handleDeleteNote(note.id, deleteNote)}>
                                        Delete Note
                                    </button>
                                </Link>
                            </li>
                        )}
                    </NotefulContext.Consumer>
                )
            }
            return <></>
        })
        return (
            <div className='MainMain'>
                <div className='MainMain__container'>
                    <ul className='noteList'>
                        {notes}
                    </ul>
                    <Link to={'/addnote'}>
                        <button type='button' className='addNoteBtn'>
                            Add Note
                        </button>
                    </Link>
                </div>
            </div>
        )
    }
}

Link.propTypes = {
    to: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    note__id: PropTypes.string,
    folder__id: PropTypes.string
  }

export default MainMain;