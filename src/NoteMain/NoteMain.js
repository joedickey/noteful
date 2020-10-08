import React, {Component} from 'react';
import './NoteMain.css'
import STORE from '../dummy-store'
import dateFormat from 'dateformat'


class NoteMain extends Component {
    
    
    render() {
        const notes = STORE.notes.map((note, index) => {
            if (this.props.note__id  === note.id){
                return (
                    <div className='NoteMain__container'>
                        <ul className='noteList'>
                            <li key={index} id={note.id} folder__id={note.folderId} note__id={note.id}>
                                <div className="noteDetails">
                                    <h2>{note.name}</h2>
                                    <p>Modified on date: {dateFormat(note.modified, 'ddd, mmm dS, yyyy')}</p>
                                </div>
                                <button type='button'>
                                    Delete Note
                                </button>
                            </li>
                        </ul>
                        <p>{note.content}</p>
                    </div>
                )
            }
        })
        return (
            <div className='NoteMain'>
                {notes}
            </div>
        )
    }
}

export default NoteMain;