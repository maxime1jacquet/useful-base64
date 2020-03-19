import { fromEvent, BehaviorSubject, Observable, merge } from 'rxjs';
import { map, pluck, debounceTime, tap } from 'rxjs/operators';

import { History } from './history';
import {
  serialize,
  deserialize,
  getElementID,
  setTextAreaValue,
  getTextAreaValue
} from './utils';

export class Base64 {
  public hist = new History();
  public current$ = this.hist.current$;

  constructor() {
    this.listenTextArea();
    this.listenHistory();
  }

  private listenHistory() {
    this.current$.subscribe(item => {
      setTextAreaValue('text', item);
      setTextAreaValue('base64', serialize(item));

      // this.copyTextToClipboard(item);
    });
  }

  private listenTextArea() {
    this.textAreaEvent$('text')
      .pipe(debounceTime(200))
      .subscribe(item => {
        this.hist.historyNew(item);
      });

    this.textAreaEvent$('base64')
      .pipe(debounceTime(200))
      .subscribe(item => {
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

  // private copyTextToClipboard(text: string): void {
  //   navigator.clipboard.writeText(text).then(
  //     function() {
  //       console.log('Async: Copying to clipboard was successful!', text);
  //     },
  //     function(err) {
  //       console.error('Async: Could not copy text: ', err);
  //     }
  //   );
  // }
}
