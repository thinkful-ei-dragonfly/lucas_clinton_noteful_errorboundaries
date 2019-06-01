import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import './NoteListMain.css'
import PropTypes from 'prop-types'
import NotefulContext from '../NotefulContext/NotefulContext'

export default class NoteListMain extends React.Component {
  static contextType = NotefulContext || {};

  render(){
    return (
      <section className='NoteListMain'>
        <ul>
          {this.props.notes.map(note =>
            <li key={note.id}>
              <Note
                id={note.id}
                name={note.name}
                modified={note.modified}
              />
            </li>
          )}
        </ul>
        <div className='NoteListMain__button-container'>
          <CircleButton
            tag={Link}
            to='/add-note'
            type='button'
            className='NoteListMain__add-note-button'
          >
            <FontAwesomeIcon icon='plus' />
            <br />
            Note
          </CircleButton>
        </div>
      </section>
    )
  }

}
NoteListMain.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  notes: PropTypes.array.isRequired
}
NoteListMain.defaultProps = {
  notes: [],
}
