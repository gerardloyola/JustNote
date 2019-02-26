import React from 'react';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';

class NotebookIndexNoteItem extends React.Component {
  render() {
    const title = this.props.note.title === "" ? "Untitled" : this.props.note.title;
    const limitedTitle = (title) => {
      if (title.split('').length < 30) {
        return title;
      }
      return title.substring(0, 30) + "...";
    };
    return (
      <div className="notebook-index-item">
        <div className="each-note">
          <div className="each-note-title">
            <Link to={`/notebooks/${this.props.notebookId}/notes/${this.props.note.id}/edit`}><i className="fa fa-sticky-note"></i>{limitedTitle(title)}</Link>
          </div>
          <div className="each-note-updated"> {format(this.props.note.updated_at)}</div>
          <div className="each-note-actions"></div>
        </div>
      </div>
    )
  }

}

export default NotebookIndexNoteItem;