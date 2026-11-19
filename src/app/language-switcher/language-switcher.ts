import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { TranslocoService } from '@jsverse/transloco';
import { SelectModule } from 'primeng/select';
import { Language } from '../utils/enums';

interface LanguageOption {
  name: string;
  code: Language;
  flag: string;
}

@Component({
  selector: 'app-language-switcher',
  imports: [
    SelectModule,
    FormsModule,
  ],
  templateUrl: './language-switcher.html',
})
export class LanguageSwitcher {
  private readonly transloco = inject(TranslocoService);

  protected readonly langs: LanguageOption[] = [
    {
      name: 'HUN',
      code: Language.Hungarian,
      flag: 'hu',
    },
    {
      name: 'ENG',
      code: Language.English,
      flag: 'gb',
    },
  ];

  protected readonly selectedLang = toSignal(this.transloco.langChanges$, {
    initialValue: this.transloco.getActiveLang(),
  });

  protected changeLang(lang: string) {
    this.transloco.setActiveLang(lang);
    localStorage.setItem('lang', lang);
  }
}
