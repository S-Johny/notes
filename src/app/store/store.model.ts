import { ErrorModel, TableNoteModel, NoteModel } from '../../api/api.model';

export interface NotesStateModel {
  errors: ErrorModel[];
  tableContent: TableNoteModel[] | null;
  entities: { [id: number]: NoteModel };
  loading: boolean;
}

export interface AppState {
  notes: NotesStateModel;
}
