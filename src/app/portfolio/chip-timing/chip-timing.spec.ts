import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { signal } from '@angular/core';
import { provideTransloco } from '@jsverse/transloco';
import { ChipTiming } from './chip-timing';
import { RaceService } from './race.service';

describe('ChipTiming', () => {
  let component: ChipTiming;
  let fixture: ComponentFixture<ChipTiming>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ChipTiming,
      ],
      providers: [
        provideTransloco({
          config: {
            availableLangs: [
              'en',
            ],
            defaultLang: 'en',
          },
        }),
        {
          provide: RaceService,
          useValue: {
            races: signal([
              {
                id: '1',
                name: 'A',
                date: new Date(2026, 4, 1),
                location: 'X',
                type: 'run',
                enevezesId: '1',
              },
              {
                id: '2',
                name: 'B',
                date: new Date(2025, 4, 1),
                location: 'Y',
                type: 'run',
                enevezesId: '2',
              },
            ]),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChipTiming);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
