import React, { Component} from 'react';
import './NoteSidebar.css'
import STORE from '../dummy-store'

class NoteSidebar extends Component {
    handleBack = () => {
        this.props.history.goBack()
    }
    
    
    render() {
        const folders = STORE.folders.map((folder, index) => {
            if (this.props.folder__id === folder.id) {
                return (
                    
                    <h2>{folder.name}</h2>
                   
                )
            }
        })
        return (
            <div className='NoteSidebar'>
                    {folders}
                <button type='button' className='addFolderBtn' onClick={this.handleBack}>
                    Back
                </button>
            </div>
        )
    }
}

export default NoteSidebar;
