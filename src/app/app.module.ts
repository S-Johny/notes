import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiService } from '../api/api.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LanguageService } from './language.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AppState } from './store/store.model';
import { noteReducer } from './store/note.reducers';
import { NoteEffects } from './store/note.effects';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, 'assets/translation/', '.json');
}

const reducers: ActionReducerMap<AppState> = {
  notes: noteReducer,
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    MatExpansionModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([NoteEffects]),
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [ApiService, LanguageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
