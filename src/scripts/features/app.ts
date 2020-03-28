import { fromEvent, Observable, merge } from 'rxjs';
import { map, pluck, debounceTime, tap, filter } from 'rxjs/operators';

import { History } from './history';
import { Clipboard } from './clipboard';
import { File } from './file';

import {
  serialize,
  deserialize,
  getElementID,
  setTextAreaValue
} from '../utils';

import { CurrentType } from '../models/model';

export class App {
  public hist = new History();
  public clipboard = new Clipboard();
  public file = new File();

  public currentType = CurrentType.TEXT;

  public current$ = this.hist.current$;
  public currentFile$ = this.file.file$;

  constructor() {
    this.listenTextArea();
    this.listenCurrent();
    getElementID(CurrentType.TEXT).focus();
  }

  private listenCurrent() {
    merge(this.current$, this.currentFile$)
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
    this.textAreaEvent$(CurrentType.TEXT).subscribe(item => {
      this.currentType = CurrentType.TEXT;
      this.hist.historyNew(item);
    });

    this.textAreaEvent$(CurrentType.BASE64).subscribe(item => {
      this.currentType = CurrentType.BASE64;
      this.hist.historyNew(deserialize(item));
    });
  }

  private textAreaEvent$(id: string): Observable<string> {
    return fromEvent(getElementID(id), 'input').pipe(
      debounceTime(400),
      pluck('target', 'value'),
      map((val: string) => val)
    );
  }
}
