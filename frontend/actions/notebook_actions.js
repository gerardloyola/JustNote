import * as NotebookAPIUtil from '../util/notebook_api_util';
export const RECEIVE_NOTEBOOKS = 'RECEIVE_NOTEBOOKS';
export const RECEIVE_NOTEBOOK = 'RECEIVE_NOTEBOOK';
export const REMOVE_NOTEBOOK = 'REMOVE_NOTEBOOK';
export const RECEIVE_NOTEBOOK_ERRORS = 'RECEIVE_NOTEBOOK_ERRORS';
export const CLEAR_NOTEBOOK_ERRORS = 'CLEAR_NOTEBOOK_ERRORS';
import { receiveNotes } from '../actions/note_actions';


const receiveNotebooks = (notebooks) => {
  return {
    type: RECEIVE_NOTEBOOKS,
    notebooks
  };
};

const receiveNotebook = (notebookWithNotes) => {
  return {
    type: RECEIVE_NOTEBOOK,
    notebook: notebookWithNotes.notebook,
    notes: notebookWithNotes.notes
  };
};

const removeNotebook = (notebook) => {
  return {
    type: REMOVE_NOTEBOOK,
    notebookId: notebook.id
  };
};

const receiveErrors = (errors) => {
  return {
    type: RECEIVE_NOTEBOOK_ERRORS,
    errors
  };
};

export const clearNotebookErrors = () => {
  return {
    type: CLEAR_NOTEBOOK_ERRORS
  };
};

export const fetchNotebooks = () => dispatch => {
  return NotebookAPIUtil.fetchNotebooks().then(
    notebooks => dispatch(receiveNotebooks(notebooks))
  );
};

export const fetchNotebook = (id) => dispatch => {
  return NotebookAPIUtil.fetchNotebook(id).then(
    notebookWithNotes => {
      return dispatch(receiveNotebook(notebookWithNotes));
    }
  );
};

export const createNotebook = (notebook) => dispatch => {
  return NotebookAPIUtil.createNotebook(notebook).then(
    notebook => dispatch(receiveNotebook(notebook)), 
    err => dispatch(receiveErrors(err.responseJSON))
  );
};

export const updateNotebook = (notebook) => dispatch => {
  return NotebookAPIUtil.updateNotebook(notebook).then(
    notebook => dispatch(receiveNotebook(notebook)),
    err => dispatch(receiveErrors(err.responseJSON))
  );
};

export const deleteNotebook = (id) => dispatch => {
  return NotebookAPIUtil.deleteNotebook(id).then(
    notebookWithNotes => {
      return dispatch(removeNotebook(notebookWithNotes.notebook));
    },
    err => dispatch(receiveErrors(err.responseJSON))
  );
};
