import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom'
import './NoteMain.css'
import NotefulContext from '../NotefulContext'
import dateFormat from 'dateformat'
import PropTypes from 'prop-types'
import API_ENDPOINT from '../config.js'



class NoteMain extends Component {
    static contextType = NotefulContext

    handleDeleteNote(noteId, callback) {
        fetch(`${API_ENDPOINT}api/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if(!response.ok) {
                throw new Error(response.status + ' ' + response.statusText)
            }
        })
        .then (
            callback(noteId)
        )
        .catch(err => console.log('Something went wrong! ' + err.message))      
    }
    
    
    render() {
        const notes = this.context.notes.map((note, index) => {
            if (this.context.note__id  === note.id){
                return (
                    <div className='NoteMain__container' key={note.id}>
                        <ul className='noteList'>
                            <NotefulContext.Consumer>
                                {({deleteNote, updateFolderId}) => (
                                <li key={note.id} id={note.id} folder__id={note.folderid} note__id={note.id}>
                                    <div className="noteDetails">
                                        <h2>{note.name}</h2>
                                        <p>Modified on date: {dateFormat(note.modified)}</p>
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
                        </ul>
                        <p>{note.content}</p>
                    </div>
                )
            }
            return <Fragment key={note.id}></Fragment>
        })
        return (
            <div className='NoteMain'>
                {notes}
            </div>
        )
    }
}

Link.propTypes = {
    to: PropTypes.string.isRequired,
    onClick: PropTypes.func
  }

export default NoteMain;