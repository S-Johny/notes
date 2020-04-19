import { registerLocaleData } from '@angular/common';
import { Injectable } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { ReplaySubject, Observable } from 'rxjs';
import cs from '@angular/common/locales/cs';

export type Language = 'cs' | 'en';
export const LANGUAGE_SELECTOR = 'defaultLanguage';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private defaultLanguage: Language =
    localStorage.getItem(LANGUAGE_SELECTOR) === 'cs' ? 'cs' : 'en';
  private readonly languageLoaded$ = new ReplaySubject<boolean>();

  constructor(private readonly translateService: TranslateService) {
    this.translateService.use(this.defaultLanguage).subscribe((): void => {
      this.languageLoaded$.next(true);
    });

    localStorage.setItem(LANGUAGE_SELECTOR, this.defaultLanguage);
    registerLocaleData(cs);
  }

  setLanguage(language: Language): void {
    localStorage.setItem(LANGUAGE_SELECTOR, language);
    this.defaultLanguage = language;
    this.translateService.use(language);
    // location.reload();
  }

  languageChanged(): Observable<LangChangeEvent> {
    return this.translateService.onLangChange.asObservable();
  }

  translate(key: string, params?: {}): string {
    return this.translateService.instant(key, params);
  }

  isLoaded(): Observable<boolean> {
    return this.languageLoaded$.asObservable();
  }

  getSelectedLanguage(): Language {
    return this.translateService.currentLang === 'cs' ? 'cs' : 'en';
  }
}
