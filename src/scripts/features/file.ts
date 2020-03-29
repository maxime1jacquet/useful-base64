import {
  getElementID,
  addClassToElement,
  removeClassToElement,
  inputFileEvent$,
  clickEvent$,
  deserialize
} from '../utils';

import { CurrentType } from '../models/model';
import { History } from './history';
import { withLatestFrom } from 'rxjs/operators';

export class File {
  public hist = History.getInstance();

  private droparea: HTMLElement = getElementID('droparea');
  private maxFilesAllowed = 1;

  constructor() {
    this.init();
  }

  init() {
    this.AddEventListeners();
  }

  private AddEventListeners() {
    this.droparea.addEventListener('dragenter', e => {
      this.DragEnter(e);
    });

    this.droparea.addEventListener('dragover', e => {
      this.DragOver(e);
    });

    this.droparea.addEventListener('dragleave', e => {
      this.DragLeave(e);
    });

    this.droparea.addEventListener('drop', e => {
      this.Drop(e);
    });

    inputFileEvent$(CurrentType.FILE).subscribe(file => {
      this.HandleDroppedFile(file);
    });

    clickEvent$('download')
      .pipe(withLatestFrom(this.hist.current$))
      .subscribe(item => {
        this.download(item[1]);
      });
  }

  private DragEnter(e: Event) {
    e.stopPropagation();
    e.preventDefault();
    addClassToElement('droparea', 'dragging-over');
  }

  private DragOver(e: any) {
    e.stopPropagation();
    e.preventDefault();
  }

  private DragLeave(e: any) {
    e.stopPropagation();
    e.preventDefault();
    removeClassToElement('droparea', 'dragging-over');
  }

  private Drop(e: any) {
    e.stopPropagation();
    e.preventDefault();
    removeClassToElement('droparea', 'dragging-over');
    this.HandleAllDroppedFiles(e);
  }

  private HandleAllDroppedFiles(e: any) {
    const dt = e.dataTransfer;
    const files = dt.files;
    if (files.length < 1) {
      return;
    }
    if (Number.isInteger(this.maxFilesAllowed)) {
      if (files.length > this.maxFilesAllowed) {
        this.HandleTooManyFilesDropped();
        return;
      }
    }
    for (let i = 0; i < files.length; i++) {
      this.HandleDroppedFile(files[i]);
    }
  }

  private HandleTooManyFilesDropped() {
    // console.log('Sorry, you dropped more files than allowed.');
  }

  private HandleDroppedFile(file: any) {
    const reader = new FileReader();

    reader.onloadend = () => {
      const fileContents: string = String(reader.result);
      this.hist.historyNew(fileContents);
    };

    reader.readAsDataURL(file);
  }

  private download(doc: any) {
    const docArray = doc.split(',');
    if (docArray[0]) {
      const a = document.createElement('a');
      // const blob = this.b64toBlob(docArray[0], `application/${ext}`);
      const blob = this.b64toBlob(docArray[1], `application/png`);

      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob, 'test.png');
      } else {
        a.href = URL.createObjectURL(blob);
        a.download = 'test.png';
        a.click();
        URL.revokeObjectURL(a.href);
      }
    }
  }

  private b64toBlob(b64Data: any, contentType = '', sliceSize = 512) {
    let byteCharacters = b64Data;
    // We use Base64.js to decode the string (https://www.npmjs.com/package/js-base64)
    // The objective is to fix a bug in IE11
    // where some characters cannot be decoded properly
    try {
      // byteCharacters = atob(b64Data);
      byteCharacters = deserialize(b64Data);
    } catch (e) {}
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
}
