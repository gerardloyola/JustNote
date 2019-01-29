import { RECEIVE_NOTE, RECEIVE_NOTES, REMOVE_NOTE, CLEAR_NOTES } from "../actions/note_actions";
import { RECEIVE_NOTEBOOK } from '../actions/notebook_actions';
import { merge } from 'lodash';

const notesReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_NOTES:
      return merge({}, action.notes);
    case RECEIVE_NOTE:
      newState = merge({}, state);
      newState[action.note.id] = action.note;
      return newState;
    case REMOVE_NOTE:
      newState = merge({}, state);
      delete newState[action.noteId];
      return newState;
    case RECEIVE_NOTEBOOK:
      return merge({}, action.notes);
    case CLEAR_NOTES:
      return {};
    default:
      return state;
  }
};

export default notesReducer;