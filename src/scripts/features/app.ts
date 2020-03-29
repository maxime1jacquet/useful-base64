import { tap, filter } from 'rxjs/operators';

import { History } from './history';
import { Clipboard } from './clipboard';
import { File } from './file';

import {
  serialize,
  deserialize,
  getElementID,
  setTextAreaValue,
  textAreaEvent$
} from '../utils';

import { CurrentType } from '../models/model';

export class App {
  public hist = History.getInstance();
  public clipboard = Clipboard.getInstance();
  public file = new File();
  public currentType = CurrentType.TEXT;

  public current$ = this.hist.current$;

  constructor() {
    this.listenTextArea();
    this.listenCurrent();
    getElementID(CurrentType.TEXT).focus();
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
    textAreaEvent$(CurrentType.TEXT).subscribe(item => {
      this.currentType = CurrentType.TEXT;
      this.hist.historyNew(item);
    });

    textAreaEvent$(CurrentType.BASE64).subscribe(item => {
      this.currentType = CurrentType.BASE64;
      this.hist.historyNew(deserialize(item));
    });
  }
}
