import { BehaviorSubject } from 'rxjs';
export declare class History {
    current$: BehaviorSubject<string>;
    constructor();
    init(): void;
    historyNew(item: string): void;
    private updateCurrent;
    private generateHistory;
}
