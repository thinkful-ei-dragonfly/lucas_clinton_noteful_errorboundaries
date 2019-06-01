import React from 'react'
import ValidationError from '../ValidationError/ValidationError'
import PropTypes from 'prop-types'

export default class AddFolder extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      nameValid: false,
      formValid: false,
      hasError: false,
      validationMessages: {
        name: '',
      }
    }
  }
  setName(name) {
    this.setState({name}, () => this.validateName(name));
  }
  validateName(folder) {
       const fieldErrors = {...this.state.validationMessages};
       let nameValid = true;
       let hasError = false

       folder = folder.replace(/[\s-]/g, ''); // Remove whitespace and dashes
       if (folder.length < 3 || folder.length === 0) { // Check if it's 9 characters long
           fieldErrors.name = 'Folder name must be at least three characters long';
           nameValid = false;
           hasError = true
       } else {
         fieldErrors.name = '';
         nameValid = true
         hasError = false
       }
       this.setState({validationMessages: fieldErrors, nameValid: !hasError}, this.formValid);
  }
  formValid() {
    this.setState({
      formValid: this.state.nameValid
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const {name} = this.state;
    const nameObj = { name: name}
    const POSTbody = JSON.stringify(nameObj)
    let error = false;
    fetch('http://localhost:9090/folders', {
      method: 'POST',
      headers: {'content-type':'application/json'},
      body: POSTbody
      })
    .then(res => {
      if (!res.ok) {
        error = {code: res.statusText}
      }
      return res.json();
      })
    .catch(error => console.log(error))
  }
  render(){
    const {nameValid, validationMessages} = this.state
    return (
      <form className="newFolderForm" onSubmit={e => this.handleSubmit(e)}>
        <label htmlFor="folder">Folder Name
        {!nameValid && (
          <p className="error">{validationMessages.name}</p>
        )}</label>
        <input id="folder" type="text" name="folder" onChange={e => this.setName(e.target.value)} placeholder="new folder name"></input>
          <ValidationError hasError={!this.state.nameValid} message={this.state.validationMessages.name}/>
        <button type="submit" disabled={!this.state.formValid}>Submit</button>
      </form>
    )
  }
}

AddFolder.propTypes = {
  value: PropTypes.string.isRequired
}
AddFolder.defaultProps = {
  value: 'Folder'
}
