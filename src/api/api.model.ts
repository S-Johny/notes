export interface TableNoteModel {
  id: number;
  title: string;
}

export interface NoteModel extends TableNoteModel {
  description: string;
}

export interface ErrorModel {
  // tslint:disable-next-line:no-any
  errors: any;
}
