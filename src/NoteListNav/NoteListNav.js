import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import { countNotesForFolder } from '../notes-helpers'
import './NoteListNav.css'
import NotefulContext from '../NotefulContext/NotefulContext'
import PropTypes from 'prop-types'

export default class NoteListNav extends React.Component {
  static contextType = NotefulContext || {};
  

  render(){
    return (
    <div className='NoteListNav'>
      <ul className='NoteListNav__list'>
        {this.context.folders.map(folder =>
          <li key={folder.id}>
            <NavLink
              className='NoteListNav__folder-link'
              to={`/folder/${folder.id}`}
            >
              <span className='NoteListNav__num-notes'>
                {countNotesForFolder(this.context.notes, folder.id)}
              </span>
              {folder.name}
            </NavLink>
          </li>
        )}
      </ul>
      <div className='NoteListNav__button-wrapper'>
        <CircleButton
          tag={Link}
          to='/add-folder'
          type='button'
          className='NoteListNav__add-folder-button'
        >
          <FontAwesomeIcon icon='plus' />
          <br />
          Folder
        </CircleButton>
      </div>
    </div>
  )}
}
NoteListNav.propTypes = {
  folders: PropTypes.array.isRequired,
  notes: PropTypes.array.isRequired,
  match: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object
}
NoteListNav.defaultProps = {
  folders: []
}
