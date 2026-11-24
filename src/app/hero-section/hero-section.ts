import {
  Component,
  ElementRef,
  effect,
  inject,
  viewChild,
} from '@angular/core';
import { TranslocoPipe, translateSignal } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import Typed from 'typed.js';
import { Briefcase } from '@primeicons/angular/briefcase';
import { Envelope } from '@primeicons/angular/envelope';
import { ScrollService } from '../shared/scroll.service';

@Component({
  selector: 'app-hero-section',
  imports: [
    TranslocoPipe,
    ButtonModule,
    Briefcase,
    Envelope,
  ],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css',
})
export class HeroSection {
  protected readonly scroll = inject(ScrollService);
  private readonly typedElement =
    viewChild.required<ElementRef<HTMLElement>>('typedElement');
  private readonly roles = translateSignal('hero.roles');

  constructor() {
    effect((onCleanup) => {
      const typed = new Typed(this.typedElement().nativeElement, {
        strings: [
          this.roles(),
        ],
        typeSpeed: 70,
      });
      onCleanup(() => typed.destroy());
    });
  }
}
