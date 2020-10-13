import React from 'react'
import PropTypes from 'prop-types'

export default function ValidateNameEntry(props) {
    if (props.message) {
        return <div style={{color: 'red'}} className='error'>{props.message}</div>
    }
    return <></>
}

ValidateNameEntry.propTypes = {
    message: PropTypes.string
}