import React from 'react';
import GreetingContainer from '../components/greeting/greeting_container';
import Side from './Side';
import NoteIndexContainer from '../components/notes/note_index_container';
import FilteredNoteIndexContainer from '../components/notes/filtered_note_index_container';
import LoginFormContainer from '../components/session_form/login_form_container';
import SignupFormContainer from '../components/session_form/signup_form_container';
import CreateNoteContainer from '../components/notes/create_note_container';
import EditNoteContainer from '../components/notes/edit_note_container';
import TagIndexContainer from '../components/tags/tag_index_container';
import TagFilteredNotesIndexContainer from '../components/notes/tag_filtered_notes_index_container';
import SearchFilteredNotesIndexContainer from '../components/notes/search_filtered_notes_index_container';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import NotebookIndexContainer from './notebooks/notebook_index_container';
import Modal from '../components/modal/modal';

const App = () => (
  <div>
    <Switch>
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
    </Switch>
    
    <div className="all-content">
      <div className="main-content">
        <div className="columns">
          <Modal />
          <ProtectedRoute path="/" component={GreetingContainer} />
          <ProtectedRoute path="/notes" component={NoteIndexContainer} />
          <ProtectedRoute exact path="/notes/:noteId/edit" component={EditNoteContainer} />
          <ProtectedRoute exact path="/new_note/:noteId/edit" component={EditNoteContainer} />
          <ProtectedRoute exact path="/notebooks" component={NotebookIndexContainer} />
          <ProtectedRoute path="/notebooks/:notebookId" component={FilteredNoteIndexContainer} />
          <ProtectedRoute exact path="/notebooks/:notebookId/notes/:noteId/edit" component={EditNoteContainer} />
          <ProtectedRoute exact path="/tags" component={TagIndexContainer} />
          <ProtectedRoute path="/tags/:tagId" component={TagFilteredNotesIndexContainer} />
          <ProtectedRoute exact path="/tags/:tagId/notes/:noteId/edit" component={EditNoteContainer} />
          <ProtectedRoute path="/search/all_notes" component={SearchFilteredNotesIndexContainer} />
          <ProtectedRoute exact path="/search/all_notes/:noteId/edit" component={EditNoteContainer} />
          <ProtectedRoute path="/search/notebooks/:notebookId" component={SearchFilteredNotesIndexContainer} />
          <ProtectedRoute exact path="/search/notebooks/:notebookId/notes/:noteId/edit" component={EditNoteContainer} />
          <ProtectedRoute path="/search/tags/:tagId" component={SearchFilteredNotesIndexContainer} />
          <ProtectedRoute exact path="/search/tags/:tagId/notes/:noteId/edit" component={EditNoteContainer} />
          <Switch>

          </Switch>
        </div>
      </div>
    </div>
    <AuthRoute exact path="/" component={GreetingContainer} />
    

  </div>
);

export default App;