import React from 'react'
import ValidationError from '../ValidationError/ValidationError'
import NotefulContext from '../NotefulContext/NotefulContext'
import PropTypes from 'prop-types'


export default class AddNote extends React.Component {
  static contextType = NotefulContext || {};
  constructor(props){
    super(props)
    this.state = {
      name: '',
      content:'',
      nameValid: false,
      contentValid: false,
      formValid: false,
      hasError: false,
      validationMessages: {
        name: '',
        content: ''
      }
    }
  }

  setName(name) {
    this.setState({name}, () => this.validateName(name));
  }
  setContent(content){
    this.setState({content}, () => this.validateContent(content))
  }
  validateName(name) {
    const fieldErrors = {...this.state.validationMessages};
    this.nameValid = true;
    let hasError = false

    if (name.length === 0 || name.length < 5) {
      fieldErrors.name = "Name needs to be at least 5 characters long"
      this.nameValid = false
      hasError = true
    } else {
      fieldErrors.name = ''
      this.nameValid = true
      hasError = false
    }
    this.setState({validationMessages: fieldErrors, nameValid: !hasError}, this.formValid)
  }
  validateContent(content){
    const fieldErrors = {...this.state.validationMessages}
    let contentValid = true;
    let hasError = false

    if (content.length === 0) {
      fieldErrors.content = 'Note content cannot be emptry';
      contentValid = false;
      hasError = true;
    }
    else {
      if (content.length < 10) {
        fieldErrors.content = "Note must be at least 10 characters long";
        contentValid = false;
        hasError = true;
      }
      fieldErrors.content = ''
      contentValid = true;
      hasError = false;
    }
    this.setState({validationMessages: fieldErrors, contentValid: !hasError}, this.formValid)
  }
  formValid() {
    this.setState({
      formValid: this.state.nameValid
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const {name, content} = this.state;
    const folder = e.target.folder.value;
    const now = new Date();
    // We weren't previously providing a modified date, now we are
    const noteBody = {
      folderId: folder,
      name: name,
      content: content,
      modified: now}
    const POSTbody = JSON.stringify(noteBody)
    let error = false;
    fetch('http://localhost:9090/notes', {
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
      .then(data => {
        alert(`Your new note was created! You typed "${data.content}"`)
        console.log('Your new note is', data)
        window.location.href = '/'
        })
    .catch(error => console.log(error))
  }
  render(){
    const {name, folderId, content, folderValid, contentValid, nameValid, validationMessages} = this.state
    const {folders} = this.context
    const folderArray = folders.map(folder => {
      return (
        <option value={folder.id} key={folder.id}>
          {folder.name}
        </option>
      )
    })
    return (
      <form className="newFolderForm" onSubmit={e => this.handleSubmit(e)}>
        <label htmlFor="folder">Folder Name
        {!folderValid && (
          <p className="error">{validationMessages.folder}</p>
        )}</label>
        <select id="folder" type="text" name="folder">{folderArray}</select>
          <ValidationError hasError={!this.state.nameValid} message={this.state.validationMessages.name}/>
        <label htmlFor="name">Note name
        {!nameValid && (
          <p className="error">{validationMessages.name}</p>
        )}</label>
        <input id='name' type='text' name='name' onChange={e => this.setName(e.target.value)} placeholder="Note Name"></input>
          <ValidationError hasError={!this.state.nameValid} message={this.state.validationMessages.name}/>
        <label htmlFor='content'>Note Content
        {!contentValid && (
          <p className='error'>{validationMessages.content}</p>
        )}</label>
        <input id='content' type='text' name='content' onChange={e => this.setContent(e.target.value)} ></input>
        <button type="submit" disabled={!this.state.formValid}>Submit</button>
      </form>
    )
  }
}
AddNote.propTypes = {
  name: PropTypes.string.isRequired,
  folder: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
}

AddNote.defaultProps = {
  name: 'Note Name',
  folder: '12345',
  content: 'lorem ipsum lorem ipsum'
}
