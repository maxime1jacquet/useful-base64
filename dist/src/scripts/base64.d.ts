import { History } from './history';
import { Clipboard } from './clipboard';
import { CurrentType } from './model';
export declare class Base64 {
    hist: History;
    clipboard: Clipboard;
    currentType: CurrentType;
    current$: import("rxjs").BehaviorSubject<string>;
    constructor();
    private listenCurrent;
    private listenTextArea;
    private textAreaEvent$;
}
