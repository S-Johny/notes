import { createAction, props } from '@ngrx/store';
import { TableNoteModel, ErrorModel, NoteModel } from '../../api/api.model';

export const getAllNotesAction = createAction('GetAllNotesAction');
export const getAllNotesSuccessAction = createAction(
  'GetAllNotesSuccessAction',
  props<{ notes: TableNoteModel[] }>(),
);
export const getAllNotesFailureAction = createAction(
  'GetAllNotesFailureAction',
  props<{ errors: ErrorModel[] }>(),
);

export const getNoteAction = createAction(
  'GetNoteAction',
  props<{ id: number }>(),
);
export const getNoteSuccessAction = createAction(
  'GetNoteSuccessAction',
  props<{ note: NoteModel }>(),
);
export const getNoteFailureAction = createAction(
  'GetNoteFailureAction',
  props<{ errors: ErrorModel[] }>(),
);

export const updateNoteAction = createAction(
  'UpdateNoteAction',
  props<{ note: NoteModel }>(),
);
export const updateNoteSuccessAction = createAction(
  'UpdateNoteSuccessAction',
  props<{ note: NoteModel }>(),
);
export const updateNoteFailureAction = createAction(
  'UpdateNoteFailureAction',
  props<{ errors: ErrorModel[] }>(),
);

export const createNoteAction = createAction(
  'CreateNoteAction',
  props<{ note: NoteModel }>(),
);
export const createNoteSuccessAction = createAction(
  'CreateNoteSuccessAction',
  props<{ note: NoteModel }>(),
);
export const createNoteFailureAction = createAction(
  'CreateNoteFailureAction',
  props<{ errors: ErrorModel[] }>(),
);

export const deleteNoteAction = createAction(
  'DeleteNoteAction',
  props<{ id: number }>(),
);
export const deleteNoteSuccessAction = createAction(
  'DeleteNoteSuccessAction',
  props<{ id: number }>(),
);
export const deleteNoteFailureAction = createAction(
  'DeleteNoteFailureAction',
  props<{ errors: ErrorModel[] }>(),
);
