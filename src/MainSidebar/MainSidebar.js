import React, { Component} from 'react';
import {Link} from 'react-router-dom'
import './MainSidebar.css'
import NotefulContext from '../NotefulContext'
import PropTypes from 'prop-types'

class MainSidebar extends Component {
    static contextType = NotefulContext

    
    render() {
        const folders = this.context.folders.map((folder, index) => {
            return (
                <NotefulContext.Consumer key={folder.id}>
                    {({updateFolderId}) => (
                        <Link 
                            to={`/folder/${folder.id}`} 
                            folder__id={folder.id} 
                            key={folder.id} 
                            onClick={(e) => updateFolderId(folder.id)}>
                            <li key={folder.id} id={folder.id} className={this.context.folder__id === folder.id ? 'selected': 'not_selected'}>
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
                <Link to={'/addfolder'}>
                    <button type='button' className='addFolderBtn'>
                        Add Folder
                    </button>
                </Link>
            </div>
        )
    }
}

Link.propTypes = {
    to: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    key: PropTypes.string,
    folder__id: PropTypes.string
  }

export default MainSidebar;
