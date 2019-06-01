import React from 'react'
import './NotefulForm.css'
import PropTypes from 'prop-types'

export default class NotefulForm extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    const { className, ...otherProps } = this.props
    return (
      <form
        className={['Noteful-form', className].join(' ')}
        action='#'
        {...otherProps}
      />
    )
  }

}
NotefulForm.defaultProps = {
  className: ''
}
NotefulForm.propTypes = {
  className: PropTypes.string.isRequired
}
