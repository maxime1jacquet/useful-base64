import { fromEvent, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import {
  serialize,
  getElementID,
  getTextAreaValue,
  addClassToElement,
  removeClassToElement
} from '../utils';
import { CurrentType, BtnType } from '../models/model';

export class Clipboard {
  public autoCopyResult = false;

  constructor() {
    this.listenBtn();
    this.listenHistory();
  }

  private listenHistory() {
    this.btnEvent$('history').subscribe(e => {
      const value = e.target.innerHTML ? e.target.innerHTML : '';
      if (value) {
        this.copyTextClipboard(value);
        this.alert();
      }
    });
  }

  private listenBtn() {
    this.btnEvent$(BtnType.TEXT).subscribe(() => {
      const value = getTextAreaValue(CurrentType.TEXT);
      if (value) {
        this.copyTextClipboard(value);
        this.alert();
      }
    });

    this.btnEvent$(BtnType.BASE64).subscribe(() => {
      const value = getTextAreaValue(CurrentType.BASE64);
      if (value) {
        this.copyTextClipboard(value);
        this.alert();
      }
    });
  }

  public copyResult(item: string, type: string) {
    if (this.autoCopyResult) {
      let toCopy;

      if (type === CurrentType.TEXT) {
        toCopy = serialize(item);
      }

      if (type === CurrentType.BASE64) {
        toCopy = item;
      }

      this.copyTextClipboard(toCopy).then(() => {
        this.alert();
      });
    }
  }

  private copyTextClipboard(text: string): Promise<boolean> {
    return navigator.clipboard.writeText(text).then(
      () => true,
      err => false
    );
  }

  private alert() {
    addClassToElement('alert', 'active');
    setTimeout(() => {
      removeClassToElement('alert', 'active');
    }, 2000);
  }

  private btnEvent$(id: string): Observable<any> {
    return fromEvent(getElementID(id), 'click').pipe(debounceTime(300));
  }
}
