import { encode, decode } from './utils';
import { fromEvent, BehaviorSubject, Observable, merge } from 'rxjs';
import { map, pluck, debounceTime, tap } from 'rxjs/operators';

export class Base64 {
  constructor() {
    this.init();
  }

  init() {
    // const base$ = new BehaviorSubject("");

    const text$ = this.getObsValue('text');
    const base$ = this.getObsValue('base64');

    merge(text$, base$).subscribe(item => console.log('toto =>', item));
  }

  private getEl(id: string): HTMLElement {
    return document.getElementById(id);
  }

  private getObsValue(id: string): Observable<string> {
    return fromEvent(this.getEl(id), 'input').pipe(
      debounceTime(300),
      pluck('target', 'value'),
      map((val: string) => val)
    );
  }
}
