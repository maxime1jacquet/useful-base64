export declare class Clipboard {
    autoCopyResult: boolean;
    constructor();
    private listenHistory;
    private listenBtn;
    copyResult(item: string, type: string): void;
    private copyTextClipboard;
    private alert;
    private btnEvent$;
}
