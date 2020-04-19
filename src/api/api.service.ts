import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NoteModel, TableNoteModel } from './api.model';

const API_URL = 'https://private-2d26f-notes233.apiary-mock.com/notes';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  getAllNotes(): Observable<TableNoteModel[]> {
    return this.httpClient.get<TableNoteModel[]>(`${API_URL}`);
  }

  getNote(id: number): Observable<NoteModel> {
    return this.httpClient.get<NoteModel>(`${API_URL}/${id}`);
  }

  updateNote(note: NoteModel): Observable<NoteModel> {
    return this.httpClient.put<NoteModel>(`${API_URL}/${note.id}`, note);
  }

  deleteNote(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${API_URL}/${id}`);
  }

  createNote(note: NoteModel): Observable<NoteModel> {
    return this.httpClient.post<NoteModel>(`${API_URL}`, note);
  }

  constructor(private readonly httpClient: HttpClient) {}
}
