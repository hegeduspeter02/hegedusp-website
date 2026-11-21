import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-chip-timing',
  imports: [
    TranslocoPipe,
  ],
  templateUrl: './chip-timing.html',
  styleUrl: './chip-timing.css',
})
export class ChipTiming {}
