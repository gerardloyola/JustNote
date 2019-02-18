import React from 'react';
import { withRouter } from 'react-router-dom';
import Modal from 'react-modal';
import ReactQuill from 'react-quill';
import TagForm from '../tags/tag_form';
import { Link } from 'react-router-dom';

class NoteForm extends React.Component{
  constructor(props){
    super(props);
    const prevState = { deleteModal: false, modalIsOpen: false };
    this.state = Object.assign(prevState, this.props.note, this.props.notebookId);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.toggleDelete = this.toggleDelete.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.autoSave = this.autoSave.bind(this);
    this.closePopup = this.closePopup.bind(this);
  }

  componentDidMount() {
    this.props.clearNoteErrors();
    if(this.props.formType === 'Edit'){
      this.props.fetchNote(this.props.id).then(({ note, notebook }) => {
        this.setState({ id: note.id, title: note.title, content: note.content});
        this.setState({ notebook: notebook });
      });
    }
    this.props.fetchNotebooks().then( ({ notebooks }) => {
      this.setState({ notebooks: notebooks });
    });
  }

  componentDidUpdate(prevProps){
    if (Boolean(prevProps.note.id) && (prevProps.note.id != this.props.id)) {
      this.props.clearNoteErrors();
      this.props.fetchNote(this.props.id).then(({ note }) => {
        this.setState({ id: note.id, title: note.title, content: note.content, plain_text: note.plain_text });
      });
    }
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.action(this.state).then(this.props.clearNoteErrors());
  }

  autoSave(){
    this.props.action(this.state);
  }

  handleTitleChange(e){
    this.setState({ title: e.currentTarget.value });
    setTimeout(() => this.autoSave(), 1000);
  }

  handleEditorChange(content, delta, source, editor) {
    this.setState({
      content: content,
      plain_text: editor.getText().trim()
    });
    setTimeout(() => this.autoSave(), 1000);
  }

  update(field){
    return e => this.setState({[field]: e.target.value});
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  closePopup() {
    this.setState({ deleteModal: false });
  }

  handleDelete(e){
    e.preventDefault();
    const that = this;
    this.props.deleteNote(this.props.id).then(() => {
      let newPath = that.props.history.location.pathname.match(/\/notebooks\/[0-9]*/) || 
        that.props.history.location.pathname.match(/\/tags\/[0-9]*/) ||
        that.props.history.location.pathname.match(/\/search\//) ||
        "/notes";
      if (newPath !== "/notes"){
        newPath = newPath[0];
      }
      that.props.history.push(newPath);
    }).then(that.closeModal);
  }

  toggleDelete(){
    this.setState({ deleteModal: !this.state.deleteModal });
  }

  renderDelete(){
    const deleteModal = this.state.deleteModal ? "show" : "hide";
    if(this.state.notebooks){
      const notebooks = Object.values(this.state.notebooks);
    }
    if (this.props.formType === 'Edit'){
      return (
        <div className="above-form">
          <Link to={`/notebooks/${this.props.notebook.id}`}><div className="notebook-name">
            <i className="fa fa-book"></i>
            <div className="notebook-title">{this.props.notebook.title}</div>
          </div></Link>
          <div className="three-dots" >
            <div onClick={this.toggleDelete} onBlur={this.closePopup} tabIndex="0">
              <div className="dots" >...</div>
              <div className={`delete-note ${deleteModal}`}>
                <div onClick={this.openModal} className="delete-note-item">Delete note</div>
                <div onClick={() => this.props.createNote(this.state)} className="delete-note-item">Duplicate note</div>
              </div>
            </div>
            <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              contentLabel="Modal"
              className="delete-modal"
              overlayClassName="modal-overlay"
              ariaHideApp={false}
            >
              <div className="top-row">
                <button onClick={this.closeModal} className="x-btn">&times;</button>
                <h2>Delete Note</h2>
              </div>
              <div className="modal-text">{this.state.title} will be deleted.</div>
              <div className="modal-btns">
                <button onClick={this.closeModal} className="cancel-btn">Cancel</button>
                <button onClick={this.handleDelete} className="continue-btn">Continue</button>
              </div>
            </Modal>

          </div> 
        </div>
      )
    } else {
      return (
        <div className="above-form">
          <div className="notebook-name">
          </div>
          <div className="three-dots" >
          </div>
        </div>
      )
    }
  }

  renderErrors() {
    return (
      <ul className="note-form-errors errors">
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }


  renderTagForm(){
    if (this.props.formType === 'Edit') {
      return(
        <TagForm createTag={this.props.createTag} errors={this.props.tagErrors} 
        clearTagErrors={this.props.clearTagErrors} noteId={this.props.id} 
        tags={this.props.tags} removeTagging={this.props.removeTagging} />
      )
    }
  }

  render(){
    const toolbar = [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'font': [] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],

      [{ 'size': ['small', false, 'large', 'huge'] }],
      
      [{ 'align': [] }],

      ['blockquote', 'code-block'],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      ['link', 'image', 'video'],
      ['clean']
    ];
    return (
      <div className="note-panel">
        {this.renderDelete()}
        <div className="note-form">
          <form>
            <div className="input-fields">
              <input className="title-input" type="title" value={this.state.title} onChange={this.handleTitleChange} placeholder="Title"/>
              <ReactQuill
                theme="snow"
                modules={{ toolbar }}
                value={this.state.content}
                ref={editor => { this.editor = editor; }}
                placeholder={"Start writing here..."}
                onChange={this.handleEditorChange}
              >
              </ReactQuill>
            </div>
          </form>
        </div>
        <div className="tag-footer">
          {this.renderTagForm()}
        </div>
      </div>
    )
  }

}

export default withRouter(NoteForm);