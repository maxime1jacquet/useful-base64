import { fromEvent, Observable } from 'rxjs';
import { map, pluck, debounceTime, tap, filter } from 'rxjs/operators';

import { History } from './history';
import { Clipboard } from './clipboard';
import {
  serialize,
  deserialize,
  getElementID,
  setTextAreaValue
} from './utils';

import { CurrentType } from './model';

export class Base64 {
  public hist = new History();
  public clipboard = new Clipboard();

  public currentType = CurrentType.TEXT;
  public current$ = this.hist.current$;

  constructor() {
    this.listenTextArea();
    this.listenCurrent();
  }

  private listenCurrent() {
    this.current$
      .pipe(
        filter(item => item && item !== ''),
        tap(item => {
          setTextAreaValue(CurrentType.TEXT, item);
          setTextAreaValue(CurrentType.BASE64, serialize(item));
          this.clipboard.copyResult(item, this.currentType);
        })
      )
      .subscribe();
  }

  private listenTextArea() {
    this.textAreaEvent$(CurrentType.TEXT)
      .pipe(debounceTime(200))
      .subscribe(item => {
        this.currentType = CurrentType.TEXT;
        this.hist.historyNew(item);
      });

    this.textAreaEvent$(CurrentType.BASE64)
      .pipe(debounceTime(200))
      .subscribe(item => {
        this.currentType = CurrentType.BASE64;
        this.hist.historyNew(deserialize(item));
      });
  }

  private textAreaEvent$(id: string): Observable<string> {
    return fromEvent(getElementID(id), 'input').pipe(
      debounceTime(300),
      pluck('target', 'value'),
      map((val: string) => val)
    );
  }
}
