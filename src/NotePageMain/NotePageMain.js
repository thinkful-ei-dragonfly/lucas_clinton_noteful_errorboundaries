import React from 'react'
import Note from '../Note/Note'
import './NotePageMain.css'
import PropTypes from 'prop-types'

export default function NotePageMain(props) {
  return (
    <section className='NotePageMain'>
      <Note
        id={props.note.id}
        name={props.note.name}
        modified={props.note.modified}
      />
      <div className='NotePageMain__content'>
        {props.note.content.split(/\n \r|\n/).map((para, i) =>
          <p key={i}>{para}</p>
        )}
      </div>
    </section>
  )
}
NotePageMain.propTypes = {
  note: PropTypes.object.isRequired,
  match: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object
}
NotePageMain.defaultProps = {
  note: {
    content: '',
  }
}
