import { fromEvent, BehaviorSubject, Observable, merge, of } from 'rxjs';
import { map, pluck, debounceTime, tap } from 'rxjs/operators';

import { getItems, setItems } from './utils';

export class History {
  public current$ = new BehaviorSubject('');

  constructor() {
    this.init();
  }

  init() {}

  public historyNew(item: string): void {
    const local: string[] = getItems();
    this.updateCurrent(item);
    setItems([item, ...local]);
  }

  updateCurrent(item: string) {
    this.current$.next(item);
  }
}
