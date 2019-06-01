import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import { Link } from 'react-router-dom'
import './NotePageNav.css'
import PropTypes from 'prop-types'

export default function NotePageNav(props) {
  return (
    <div className='NotePageNav'>
      <CircleButton
        tag={Link}
        role='link'
        onClick={() => props.history.goBack()}
        className='NotePageNav__back-button'
      >
        <FontAwesomeIcon icon='chevron-left' />
        <br />
        Back
      </CircleButton>
      {props.folder && (
        <h3 className='NotePageNav__folder-name'>
          {props.folder.name}
        </h3>
      )}
    </div>
  )
}
NotePageNav.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
  folder: PropTypes.object
}
NotePageNav.defaultProps = {
  folder: {},
  history: {
    goBack: () => {}
  }
}
