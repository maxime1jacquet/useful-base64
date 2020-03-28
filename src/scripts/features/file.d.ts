import { BehaviorSubject } from 'rxjs';
export declare class File {
    file$: BehaviorSubject<string>;
    droparea: HTMLElement;
    private maxFilesAllowed;
    constructor();
    init(): void;
    AddEventListeners(): void;
    DragEnter(e: Event): void;
    DragOver(e: any): void;
    DragLeave(e: any): void;
    Drop(e: any): void;
    HandleAllDroppedFiles(e: any): void;
    HandleTooManyFilesDropped(): void;
    HandleDroppedFile(file: any): void;
}
