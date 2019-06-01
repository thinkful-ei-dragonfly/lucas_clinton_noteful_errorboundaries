import React from 'react'
import './CircleButton.css'
import PropTypes from 'prop-types'

export default class NavCircleButton extends React.Component {
  render(){
    const { tag, className, childrenm, ...otherProps } = this.props

    return React.createElement(
      this.props.tag,
      {
        className: ['NavCircleButton', this.props.className].join(' '),
        ...otherProps
      },
      this.props.children
    )
  }

}
NavCircleButton.propTypes = {
  tag: PropTypes.func,
  role: PropTypes.string,
  onClick: PropTypes.func,
  to: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.array

}
NavCircleButton.defaultProps ={
  tag: () => {},
  to: '',
  type: '',
  className: '',
  children: []
}
