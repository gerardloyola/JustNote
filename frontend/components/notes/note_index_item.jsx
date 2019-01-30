import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';


class NoteIndexItem extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    // this.props.fetchNotebook(this.props.note.notebook_id);
  }

  render(){
    const limitedContent = (content) => {
      if (content.split('').length < 80) {
        return content;
      }
      return content.substring(0, 80) + "...";
    };
    if (this.props.title === 'All Notes'){
      return (
        <Link to={`/notes/${this.props.note.id}/edit`}><div className="single-note">
          <div className="top">
            <p className="note-title">{this.props.note.title}</p>
            <p className="note-content">{limitedContent(this.props.note.plain_text)}</p>
          </div>
          <div className="timestamp">
            <p className="note-updated">{format(this.props.note.updated_at)}</p>
          </div>
        </div></Link>
      )
    } else {
      return (
        <Link to={`/notebooks/${this.props.notebook.id}/notes/${this.props.note.id}/edit`}><div className="single-note">
          <div className="top">
            <p className="note-title">{this.props.note.title}</p>
            <p className="note-content">{limitedContent(this.props.note.plain_text)}</p>
          </div>
          <div className="timestamp">
            <p className="note-updated">{format(this.props.note.updated_at)}</p>
          </div>
        </div></Link>
      )
    }
    
  }
}

export default NoteIndexItem;