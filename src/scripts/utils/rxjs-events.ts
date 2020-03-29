import { Observable, fromEvent, EMPTY } from 'rxjs';
import { pluck, map, debounceTime } from 'rxjs/operators';
import { getElementID } from './dom';

export const textAreaEvent$ = (id: string): Observable<string> => {
  const el = getElementID(id);
  return el
    ? fromEvent(el, 'input').pipe(
        debounceTime(400),
        pluck('target', 'value'),
        map((val: string) => val)
      )
    : EMPTY;
};

export const inputFileEvent$ = (id: string): Observable<any> => {
  const el = getElementID(id);
  return el
    ? fromEvent(el, 'input').pipe(
        pluck('srcElement', 'files'),
        map((files: any) => files[0])
      )
    : EMPTY;
};

export const clickEvent$ = (id: string): Observable<any> => {
  const el = getElementID(id);
  return el ? fromEvent(el, 'click').pipe(map((item: any) => item)) : EMPTY;
};
