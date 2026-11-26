import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  collection,
  collectionData,
  Firestore,
  orderBy,
  query,
  type Timestamp,
} from '@angular/fire/firestore';
import { map } from 'rxjs';
import type { Race } from './race';

type RaceDocument = Omit<Race, 'date'> & {
  date: Timestamp;
};

@Injectable({
  providedIn: 'root',
})
export class RaceService {
  private readonly firestore = inject(Firestore);

  readonly races = toSignal(
    collectionData(
      query(collection(this.firestore, 'races'), orderBy('date', 'desc')),
      {
        idField: 'id',
      },
    ).pipe(
      map((docs) =>
        (docs as RaceDocument[]).map(
          (doc): Race => ({
            ...doc,
            date: doc.date.toDate(),
          }),
        ),
      ),
    ),
    {
      initialValue: [] as Race[],
    },
  );
}
