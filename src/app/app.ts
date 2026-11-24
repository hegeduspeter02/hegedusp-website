import { DOCUMENT } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { TranslocoService, translateSignal } from '@jsverse/transloco';
import { BackToTop } from './back-to-top/back-to-top';
import { HeroSection } from './hero-section/hero-section';
import { LanguageSwitcher } from './language-switcher/language-switcher';
import { ChipTiming } from './portfolio/chip-timing/chip-timing';
import { Sidebar } from './sidebar/sidebar';

@Component({
  selector: 'app-root',
  imports: [
    LanguageSwitcher,
    Sidebar,
    HeroSection,
    ChipTiming,
    BackToTop,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly title = inject(Title);
  private readonly document = inject(DOCUMENT);
  private readonly activeLang = toSignal(inject(TranslocoService).langChanges$);
  private readonly websiteLabel = translateSignal('personal.website');

  constructor() {
    effect(() => {
      this.title.setTitle(`Hegedűs Péter | ${this.websiteLabel()}`);
    });
    effect(() => {
      this.document.documentElement.lang = this.activeLang() ?? '';
    });
  }
}
