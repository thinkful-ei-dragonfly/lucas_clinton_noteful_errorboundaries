import React from 'react'
import ValidationError from '../ValidationError/ValidationError'
import NotefulContext from '../NotefulContext/NotefulContext'


export default class AddNote extends React.Component {
  static contextType = NotefulContext || {};
  constructor(props){
    super(props)
    this.state = {
      name: '',
      content:'',
      // folder: '',
      nameValid: false,
      // folderValid: false,
      contentValid: false,
      formValid: false,
      hasError: false,
      validationMessages: {
        name: '',
        // folder: '',
        content: ''
      }
    }
  }
  // setFolder(folder) {
  //   this.setState({folder}, () => this.validateFolder(folder));
  // }
  setName(name) {
    this.setState({name}, () => this.validateName(name));
  }
  setContent(content){
    this.setState({content}, () => this.validateContent(content))
  }
  // validateFolder(folder) {
  //      const fieldErrors = {...this.state.validationMessages};
  //      let folderValid = true;
  //      let hasError = false

  //      folder = folder.replace(/[\s-]/g, ''); // Remove whitespace and dashes
  //      if (folder.length < 3 || folder.length === 0) { // Check if it's 9 characters long
  //          fieldErrors.folder = 'Folder name must be at least three characters long';
  //          folderValid = false;
  //          hasError = true
  //      } else {
  //        fieldErrors.folder = '';
  //        folderValid = true
  //        hasError = false
  //      }
  //      this.setState({validationMessages: fieldErrors, folderValid: !hasError}, this.formValid);
  // }
  validateName(name) {
    const fieldErrors = {...this.state.validationMessages};
    let nameValid = true;
    let hasError = false

    if (name.length === 0 || name.length < 5) {
      fieldErrors.name = "Name needs to be at least 5 characters long"
      nameValid = false
      hasError = true
    } else {
      fieldErrors.name = ''
      nameValid = true
      hasError = false
    }
    this.setState({validationMessages: fieldErrors, nameValid: !hasError}, this.formValid)
  }
  validateContent(content){
    const fieldErrors = {...this.state.validationMessages}
    let contentValid = true;
    let hasError = false

    if (content.length === 0 || content.length < 10) {
      fieldErrors.content = 'Note content should be at least 10 characters long';
      contentValid = false;
      hasError = true;
    }
    else {
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
    const noteBody = {folderId: folder, name: name, content: content}
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
        console.log('Your new note is', data)
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
