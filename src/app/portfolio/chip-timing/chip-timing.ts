import { DatePipe } from '@angular/common';
import { Component, computed, inject, linkedSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { CardModule } from 'primeng/card';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { RaceService } from './race.service';

@Component({
  selector: 'app-chip-timing',
  imports: [
    TranslocoPipe,
    DatePipe,
    FormsModule,
    CardModule,
    SelectButtonModule,
    TableModule,
  ],
  templateUrl: './chip-timing.html',
})
export class ChipTiming {
  private readonly raceService = inject(RaceService);
  private readonly transloco = inject(TranslocoService);

  protected readonly selectedLang = toSignal(this.transloco.langChanges$, {
    initialValue: this.transloco.getActiveLang(),
  });

  protected readonly years = computed(() => [
    ...new Set(this.raceService.races().map((race) => race.date.getFullYear())),
  ]);

  protected readonly yearOptions = computed(() =>
    this.years().map((year) => ({
      label: String(year),
      value: year,
    })),
  );

  protected readonly selectedYear = linkedSignal<number[], number | undefined>({
    source: this.years,
    computation: (years, previous) =>
      previous?.value !== undefined && years.includes(previous.value)
        ? previous.value
        : years[0],
  });

  protected readonly filteredRaces = computed(() =>
    this.raceService
      .races()
      .filter((race) => race.date.getFullYear() === this.selectedYear()),
  );
}
