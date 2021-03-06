import React, {Component} from 'react'
import './AddFolder.css'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import ValidateNameEntry from '../ValidateNameEntry/ValidateNameEntry'
import NotefulContext from '../NotefulContext'
import API_ENDPOINT from '../config.js'



class AddFolder extends Component {
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
        const newfolder__name = event.target.newfolder__name.value
        this.postNewFolder(newfolder__name, callback)
        this.setState({
            name: '',
            touched: false,
        })
        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = ""))
        this.props.history.push('/')
    }

    postNewFolder(name, callback) {
        fetch(`${API_ENDPOINT}api/folders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'name': name
            })
        })
        .then(response => {
            if(!response.ok) {
                throw new Error(response.status + ' ' + response.statusText)
            }

            return response.json()
        })
        .then(function(data) {
            console.log('New folder added')
            const id = data.id
            callback(name, id)
        } )
        .catch(err => console.log('Something went wrong! ' + err.message))
    }


    render() {
        return(
            <NotefulContext.Consumer>
                {({updateFolders}) => (
                    <form className='AddFolder' onSubmit={e => this.handleSubmit(e, updateFolders)}>
                        <h2>Create New Folder</h2>
                        <div className='form__inputs'>
                            <label htmlFor='newfolder__name'>Enter folder name:</label>
                            <input type='text' name='newfolder__name' id='newfolder__name' aria-required="true" aria-label="New Folder Name" onChange={e => this.changeNameState(e)} required/>
                            <ValidateNameEntry message={this.validateNameEntry()}/>
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

export default AddFolder;