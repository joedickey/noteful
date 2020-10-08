import React, { Component} from 'react';
import {Link} from 'react-router-dom'
import './MainMain.css'
import STORE from '../dummy-store'
import dateFormat from 'dateformat'


class MainMain extends Component {
    
    
    render() {
        const notes = STORE.notes.map((note, index) => {
            if (this.props.folder__id  === note.folderId || this.props.folder__id === undefined){
                return (
                        <li key={index} id={note.id} folder__id={note.folderId} note__id={note.id}>
                            <div className="noteDetails">
                                <Link to={`../note/${note.id}/${note.folderId}`} note__id={note.id} folder__id={note.folderId}>
                                    <h2>{note.name}</h2>
                                </Link>
                                <p>Modified on date: {dateFormat(note.modified, 'ddd, mmm dS, yyyy')}</p>
                            </div>
                            <button type='button'>
                                Delete Note
                            </button>
                        </li>
                )
            }
        })
        return (
            <div className='MainMain'>
                <div className='MainMain__container'>
                    <ul className='noteList'>
                        {notes}
                    </ul>
                    <button type='button' className='addNoteBtn'>
                        Add Note
                    </button>
                </div>
            </div>
        )
    }
}

export default MainMain;