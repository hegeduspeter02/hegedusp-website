import { inject } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { lastValueFrom } from 'rxjs';
import { Language } from '../utils/enums';

function toSupportedLang(tag: string | null | undefined): Language | undefined {
  const baseLang = tag?.split('-')[0];

  return Object.values(Language).find((lang) => lang === baseLang);
}

export async function initTransloco() {
  const transloco = inject(TranslocoService);
  const lang =
    toSupportedLang(localStorage.getItem('lang')) ??
    toSupportedLang(navigator.language) ??
    Language.Hungarian;

  transloco.setActiveLang(lang);
  await lastValueFrom(transloco.load(lang));
}
