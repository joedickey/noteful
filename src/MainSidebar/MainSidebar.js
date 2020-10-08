import React, { Component} from 'react';
import {Link} from 'react-router-dom'
import './MainSidebar.css'
import STORE from '../dummy-store'

class MainSidebar extends Component {

    
    
    render() {
        const folders = STORE.folders.map((folder, index) => {
            return (
                <Link to={`/folder/${folder.id}`} folder__id={folder.id} key={folder.id}>
                    <li key={index} id={folder.id} className={this.props.folder__id === folder.id ? 'selected': 'not_selected'}>
                        {folder.name}
                    </li>
                </Link>
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
