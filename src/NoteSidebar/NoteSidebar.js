import React, { Component, Fragment} from 'react';
import './NoteSidebar.css'
import NotefulContext from '../NotefulContext'

class NoteSidebar extends Component {
    static contextType = NotefulContext;

    handleBack = () => {
        this.props.history.goBack()
    }
    
    
    render() {
        const folders = this.context.folders.map((folder) => {
            if (this.context.folder__id === folder.id) {
                return (
                    <div key={folder.id}>  
                        <h2>{folder.name}</h2>
                    </div>
                )
            }
            return <Fragment key={folder.id}></Fragment>
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
