import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { AppState } from './store.model';
import {
  getAllNotesAction,
  getAllNotesSuccessAction,
  getAllNotesFailureAction,
  getNoteAction,
  getNoteSuccessAction,
  getNoteFailureAction,
  updateNoteAction,
  updateNoteSuccessAction,
  updateNoteFailureAction,
  createNoteAction,
  createNoteSuccessAction,
  createNoteFailureAction,
  deleteNoteAction,
  deleteNoteSuccessAction,
  deleteNoteFailureAction,
} from './note.actions';
import { switchMap, map, catchError, filter, take } from 'rxjs/operators';
import { ApiService } from '../../api/api.service';
import { of } from 'rxjs';
import { $note } from './note.selectors';

@Injectable()
export class NoteEffects {
  getAllNotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllNotesAction),
      switchMap(() =>
        this.apiService.getAllNotes().pipe(
          map(notes => getAllNotesSuccessAction({ notes })),
          catchError(errors => of(getAllNotesFailureAction(errors))),
        ),
      ),
    ),
  );

  getNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getNoteAction),
      switchMap(({ id }) =>
        this.store.pipe(
          select($note(id)),
          map(requested => ({ requested: !!requested, id })),
          take(1),
        ),
      ),
      filter(({ requested }) => !requested),
      switchMap(({ id }) =>
        this.apiService.getNote(id).pipe(
          map(note => getNoteSuccessAction({ note })),
          catchError(errors => of(getNoteFailureAction(errors))),
        ),
      ),
    ),
  );

  updateNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateNoteAction),
      switchMap(({ note }) =>
        this.apiService.updateNote(note).pipe(
          map(updatedNote => updateNoteSuccessAction({ note: updatedNote })),
          catchError(errors => of(updateNoteFailureAction(errors))),
        ),
      ),
    ),
  );

  createNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createNoteAction),
      switchMap(({ note }) =>
        this.apiService.createNote(note).pipe(
          map(createdNote => createNoteSuccessAction({ note: createdNote })),
          catchError(errors => of(createNoteFailureAction(errors))),
        ),
      ),
    ),
  );

  deleteNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteNoteAction),
      switchMap(({ id }) =>
        this.apiService.deleteNote(id).pipe(
          map(() => deleteNoteSuccessAction({ id })),
          catchError(errors => of(deleteNoteFailureAction(errors))),
        ),
      ),
    ),
  );

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store<AppState>,
    private readonly apiService: ApiService,
  ) {}
}
