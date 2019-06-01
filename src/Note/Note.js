import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Note.css'
import PropTypes from 'prop-types'
import NotefulContext from '../NotefulContext/NotefulContext'

export default class Note extends React.Component {
  static contextType = NotefulContext;
  render(){
    return (
      <div className='Note'>
        <h2 className='Note__title'>
          <Link to={`/note/${this.props.id}`}>
            {this.props.name}
          </Link>
        </h2>
        <button className='Note__delete' type='button'>
          <FontAwesomeIcon icon='trash-alt' />
          {' '}
          remove
        </button>
        <div className='Note__dates'>
          <div className='Note__dates-modified'>
            Modified
            {' '}
            <span className='Date'>
              {format(this.props.modified, 'Do MMM YYYY')}
            </span>
          </div>
        </div>
      </div>
    )
  }

}

Note.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  modified: PropTypes.string
}
Note.defaultProps = {
  id: '1',
  name: '',
  modified: ''
}
