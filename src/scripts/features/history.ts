import { BehaviorSubject } from 'rxjs';

import { getItems, setItems, innerHTMLElement, serialize } from '../utils';

export class History {
  private static instance: History;
  public current$ = new BehaviorSubject('');

  constructor() {
    this.generateHistory(getItems());
  }

  public static getInstance(): History {
    if (!History.instance) {
      History.instance = new History();
    }
    return History.instance;
  }

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
      innerHTMLElement('history', `<h2>History : </h2><ul>${o.join('')}</ul>`);
    }
  }
}
