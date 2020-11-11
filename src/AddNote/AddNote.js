import React, {Component} from 'react'
import './AddNote.css'
import {Link} from 'react-router-dom'
import NotefulContext from '../NotefulContext'
import ValidateNameEntry from '../ValidateNameEntry/ValidateNameEntry'
import PropTypes from 'prop-types'
import API_ENDPOINT from '../config.js'




class AddNote extends Component {
    static contextType = NotefulContext

    state = {
        name: '',
        touched: false,
    }

    changeNameState = (event) => {
        this.setState({
            name: event.target.value,
            touched: true
        })
    }

    validateNameEntry() {
        const nameEntry = this.state.name.trim()
        if (nameEntry.length === 0 && this.state.touched) {
            return  'Name is required'
        }
    }

    handleSubmit(event, callback) {
        event.preventDefault();
        const newnote__name = event.target.newnote__name.value
        const folderid = event.target.folderselect.value
        const content = event.target.content.value
        this.postNewNote(newnote__name, folderid, content, callback)
        this.setState({
            name: '',
            touched: false,
        })
        Array.from(document.querySelectorAll(["input", "textarea"])).forEach(
            input => (input.value = ""))
        this.props.history.goBack()
    }

    postNewNote(name, folderid, content, callback) {
        fetch(`${API_ENDPOINT}api/notes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'name': name,
                'folderid': folderid,
                'content': content
            })
        })
        .then(response => {
            if(!response.ok) {
                throw new Error(response.status + ' ' + response.statusText)
            }
            return response.json()
        })
        .then(function(data) {
            console.log('New note added')
            const id = data.id
            callback(name, folderid, content, id)
        })
        .catch(err => console.log('Something went wrong! ' + err.message))
    }

    handleContextUpdate(callback) {
        setTimeout(function(){
            callback('re-rendered');      
        }, 200)   
    }

    render() {
        const folderOptions = this.context.folders.map((folder) => {
            return (
            <option value={folder.id} key={folder.id}>{folder.name}</option>
            )
        })
        return(
            <NotefulContext.Consumer>
                {({updateNotes}) => (
                    <form className='AddNote' onSubmit={e => this.handleSubmit(e, updateNotes)}>
                        <h2>Create New Note</h2>
                        <div className='form__inputs'>
                            <label htmlFor='newnote__name'>Enter note name:</label>
                            <input type='text' name='newnote__name' id='newnote__name' aria-required="true" aria-label="New Note Name" onChange={e => this.changeNameState(e)} required/>
                            <ValidateNameEntry message={this.validateNameEntry()}/>
                            <label htmlFor='folderselect'>Select folder:</label>
                            <select name='folderselect' id='folderselect' aria-required="true" aria-label="Select Folder">
                                {folderOptions}
                            </select>
                            <label htmlFor='content'>Content:</label>
                            <textarea name='content' id='content' rows='6' aria-required="true" aria-label="New Note Content"></textarea>
                        </div>
                        <div className='form__buttons'>
                            <Link to={'/'}>
                                <button type='reset' id='cancel'>
                                    Cancel
                                </button>
                            </Link>
                            <button type='submit' id='submit'>
                                Submit
                            </button>
                        </div>
                    </form>
                 )}
            </NotefulContext.Consumer>
        )
    }
}

Link.propTypes = {
    to: PropTypes.string.isRequired,
    onClick: PropTypes.func,
  }

export default AddNote;