import { TestBed } from '@angular/core/testing';
import { NoteEffects } from './note.effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ApiService } from '../../api/api.service';
import {
  getAllNotesAction,
  getAllNotesSuccessAction,
  getNoteAction,
  getNoteSuccessAction,
} from './note.actions';
import { cold, hot } from 'jest-marbles';
import { $note } from './note.selectors';
import { AppState } from './store.model';

export const MOCK_TABLE_NOTES = [
  {
    id: 1,
    title: 'Jogging in park',
  },
  {
    id: 2,
    title: 'Pick-up posters from post-office',
  },
];

export const MOCK_ONE_NOTE = {
  id: 0,
  title: 'Pick-up posters from post-office',
  description: 'Just did that',
};

describe('Note Effect', () => {
  let effects: NoteEffects;
  let actions$: Observable<Action>;
  let store: MockStore<AppState>;

  const mockApi = {
    getAllNotes: jest.fn(() => of(MOCK_TABLE_NOTES)),
    getNote: jest.fn(() => of(MOCK_ONE_NOTE)),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NoteEffects,
        provideMockActions(() => actions$),
        provideMockStore({
          initialState: {
            note: {
              tableContent: null,
              entities: {},
              errors: [],
              loading: false,
            },
          },
        }),
        { provide: ApiService, useValue: mockApi },
      ],
    });
    effects = TestBed.inject(NoteEffects);
    store = TestBed.inject(Store) as MockStore<AppState>;
  });

  test('get all table results', () => {
    actions$ = hot('-r', {
      r: getAllNotesAction(),
    });
    const expected = cold('-s', {
      s: getAllNotesSuccessAction({ notes: MOCK_TABLE_NOTES }),
    });
    expect(effects.getAllNotes$).toBeObservable(expected);
  });

  test.skip('get one note', () => {
    store.overrideSelector($note(0), null);
    actions$ = hot('-r', {
      r: getNoteAction({ id: 0 }),
    });
    const expected = cold('-s', {
      s: getNoteSuccessAction({ note: MOCK_ONE_NOTE }),
    });
    expect(effects.getNote$).toBeObservable(expected);
  });
});
