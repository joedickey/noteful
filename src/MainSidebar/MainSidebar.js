import React, { Component} from 'react';
import {Link} from 'react-router-dom'
import './MainSidebar.css'
import NotefulContext from '../NotefulContext'

class MainSidebar extends Component {
    static contextType = NotefulContext

    
    render() {
        const folders = this.context.folders.map((folder, index) => {
            return (
                <NotefulContext.Consumer>
                    {({updateFolderId}) => (
                        <Link 
                            to={`/folder/${folder.id}`} 
                            folder__id={folder.id} 
                            key={folder.id} 
                            onClick={(e) => updateFolderId(folder.id)}>
                            <li key={index} id={folder.id} className={this.context.folder__id === folder.id ? 'selected': 'not_selected'}>
                                {folder.name}
                            </li>
                        </Link>
                    )}
                </NotefulContext.Consumer>
            )
        })
        return (
            <div className='MainSidebar'>
                <ul className='folderList'>
                    {folders}
                </ul>
                <button type='button' className='addFolderBtn'>
                    Add Folder
                </button>
            </div>
        )
    }
}

export default MainSidebar;
