import { BehaviorSubject } from 'rxjs';

import { getItems, setItems, generateList, serialize } from './utils';

export class History {
  public current$ = new BehaviorSubject('');

  constructor() {
    this.generateHistory(getItems());
  }

  init() {}

  public historyNew(item: string): void {
    const local: string[] = getItems();
    this.updateCurrent(item);
    this.generateHistory(local);
    setItems([item, ...local]);
  }

  private updateCurrent(item: string): void {
    this.current$.next(item);
  }

  private generateHistory(history: string[]): void {
    let o = history.map(
      item => `<li class="item-history">${serialize(item)}</li>`
    );
    if (o && o.length > 0) {
      generateList('history', `<h2>History : </h2><ul>${o.join('')}</ul>`);
    }
  }
}
