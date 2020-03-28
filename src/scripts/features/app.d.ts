import { History } from './history';
import { Clipboard } from './clipboard';
import { File } from './file';
import { CurrentType } from '../models/model';
export declare class App {
    hist: History;
    clipboard: Clipboard;
    file: File;
    currentType: CurrentType;
    current$: import("rxjs").BehaviorSubject<string>;
    currentFile$: import("rxjs").BehaviorSubject<string>;
    constructor();
    private listenCurrent;
    private listenTextArea;
    private textAreaEvent$;
}
