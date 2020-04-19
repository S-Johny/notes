import { NotesStateModel, AppState } from './store.model';
import { createSelector } from '@ngrx/store';

export const $noteState = (state: AppState): NotesStateModel => state.notes;

export const $tableNotes = createSelector(
  $noteState,
  ({ tableContent }) => tableContent || [],
);

export const $note = (id: number) =>
  createSelector($noteState, ({ entities }) =>
    entities != null && id != null && entities[id] != null
      ? entities[id]
      : null,
  );
