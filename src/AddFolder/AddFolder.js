import React, {Component} from 'react'
import './AddFolder.css'
import {Link} from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import PropTypes from 'prop-types'
import ValidateNameEntry from '../ValidateNameEntry/ValidateNameEntry'
import NotefulContext from '../NotefulContext'



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

    handleSubmit(event) {
        event.preventDefault();
        const newfolder__name = event.target.newfolder__name.value
        const id = uuidv4()
        this.postNewFolder(newfolder__name, id)
        this.setState({
            name: '',
            touched: false,
        })
        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = ""))
    }

    postNewFolder(name, id) {
        fetch(`http://localhost:9090/folders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'id': id,
                'name': name
            })
        })
        .then(response => {
            if(!response.ok) {
                throw new Error(response.status + ' ' + response.statusText)
            }
          
            console.log('New folder added');
        })
        .catch(err => console.log('Something went wrong! ' + err.message))
    }

    handleContextUpdate(callback) {
        setTimeout(function(){
            callback('re-rendered');      
        }, 200)   
    }

    render() {
        return(
            <form className='AddFolder' onSubmit={e => this.handleSubmit(e)}>
                <h2>Create New Folder</h2>
                <div className='form__inputs'>
                    <label htmlFor='newfolder__name'>Enter folder name:</label>
                    <input type='text' name='newfolder__name' id='newfolder__name' onChange={e => this.changeNameState(e)} required/>
                    <ValidateNameEntry message={this.validateNameEntry()}/>
                </div>
                <div className='form__buttons'>
                    <Link to={'/'}>
                        <button type='reset' id='cancel'>
                            Cancel
                        </button>
                    </Link>
                    <NotefulContext.Consumer>
                        {({updateRender}) => (
                            <button type='submit' id='submit' onClick={() => this.handleContextUpdate(updateRender)}>
                                Submit
                            </button>
                        )}
                    </NotefulContext.Consumer>
                </div>
            </form>
        )
    }
}

Link.propTypes = {
    to: PropTypes.string.isRequired,
    onClick: PropTypes.func,
  }

export default AddFolder;