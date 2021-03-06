import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LanguageService, Language } from './language.service';
import { pluck } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { AppState } from './store/store.model';
import {
  getAllNotesAction,
  getNoteAction,
  createNoteAction,
  updateNoteAction,
} from './store/note.actions';
import { $tableNotes, $note } from './store/note.selectors';
import { Observable } from 'rxjs';
import { NoteModel } from '../api/api.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'notes-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly selectedLanguage$ = this.languageService
    .languageChanged()
    .pipe(pluck('lang'));
  readonly notesTableData$ = this.store.pipe(select($tableNotes));

  editing: number | null = null;

  noteForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: '',
  });

  editNoteForm: FormGroup = this.fb.group({
    id: [null, Validators.required],
    title: ['', Validators.required],
    description: '',
  });
  constructor(
    private readonly store: Store<AppState>,
    private readonly languageService: LanguageService,
    private readonly fb: FormBuilder,
  ) {
    this.store.dispatch(getAllNotesAction());
  }

  changeLanguage(lang: Language): void {
    this.languageService.setLanguage(lang);
  }

  getDetail(id: number): void {
    this.store.dispatch(getNoteAction({ id }));
  }

  noteDetail(id: number): Observable<NoteModel | null> {
    return this.store.pipe(select($note(id)));
  }

  addNote(): void {
    if (this.noteForm.invalid) {
      return;
    }
    const note: NoteModel = {
      id: 3,
      title: this.noteForm.get('title')?.value,
      description: this.noteForm.get('description')?.value,
    };
    this.store.dispatch(createNoteAction({ note }));
    this.noteForm.reset();
  }

  clearEdit(): void {
    this.editNoteForm.reset();
    this.editing = null;
  }

  changeEdit(note: NoteModel): void {
    this.editing = note.id;
    this.editNoteForm.setValue({
      title: note.title,
      description: note.description,
      id: note.id,
    });
  }

  editNote(): void {
    if (this.editNoteForm.invalid) {
      return;
    }
    this.store.dispatch(
      updateNoteAction({ note: this.editNoteForm.getRawValue() }),
    );
  }
}
