import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import './NoteMain.css'
import NotefulContext from '../NotefulContext'
import dateFormat from 'dateformat'
import PropTypes from 'prop-types'



class NoteMain extends Component {
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
        const notes = this.context.notes.map((note, index) => {
            if (this.context.note__id  === note.id){
                return (
                    <div className='NoteMain__container'>
                        <ul className='noteList'>
                            <NotefulContext.Consumer>
                                {({deleteNote, updateFolderId}) => (
                                <li key={note.id} id={note.id} folder__id={note.folderId} note__id={note.id}>
                                    <div className="noteDetails">
                                        <h2>{note.name}</h2>
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
                        </ul>
                        <p>{note.content}</p>
                    </div>
                )
            }
            return <></>
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