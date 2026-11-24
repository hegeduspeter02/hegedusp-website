import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  private readonly document = inject(DOCUMENT);

  scrollTo(id: string, behavior: ScrollBehavior = 'smooth'): void {
    this.document.getElementById(id)?.scrollIntoView({
      behavior,
    });
  }
}
