import { NotesStateModel } from './store.model';
import { createReducer, on, Action } from '@ngrx/store';
import {
  getAllNotesSuccessAction,
  getNoteSuccessAction,
  updateNoteSuccessAction,
  createNoteSuccessAction,
  getAllNotesFailureAction,
  getNoteFailureAction,
  updateNoteFailureAction,
  createNoteFailureAction,
  deleteNoteFailureAction,
  getNoteAction,
  deleteNoteSuccessAction,
} from './note.actions';

const initialState: NotesStateModel = {
  tableContent: null,
  entities: {},
  errors: [],
  loading: false,
};

const reducer = createReducer(
  initialState,
  on(getAllNotesSuccessAction, (state, { notes }) => ({
    ...state,
    tableContent: notes,
  })),
  on(
    getNoteSuccessAction,
    updateNoteSuccessAction,
    createNoteSuccessAction,
    (state, { note }) => ({
      ...state,
      entities: {
        ...state.entities,
        [note.id]: note,
      },
      loading: false,
    }),
  ),
  on(
    getAllNotesFailureAction,
    getNoteFailureAction,
    updateNoteFailureAction,
    createNoteFailureAction,
    deleteNoteFailureAction,
    (state, { errors }) => ({
      ...state,
      loading: false,
      errors,
    }),
  ),
  on(getNoteAction, state => ({ ...state, loading: true })),
  on(deleteNoteSuccessAction, (state, { id }) => {
    const { [id]: removed, ...entities } = state.entities;
    return {
      ...state,
      entities,
    };
  }),
);

export function noteReducer(
  state: NotesStateModel,
  action: Action,
): NotesStateModel {
  return reducer(state, action);
}
