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
import { Clipboard } from './clipboard';
import { withLatestFrom } from 'rxjs/operators';

export class File {
  public hist = History.getInstance();
  public clipboard = Clipboard.getInstance();

  private droparea: HTMLElement = getElementID('droparea');
  private maxFilesAllowed = 1;
  private nameDownloadFile = 'convertWithUsefulBase64';

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

  private HandleAllDroppedFiles(e: any): void {
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

  private HandleTooManyFilesDropped(): void {
    this.clipboard.alert('You dropped more files than allowed');
  }

  private HandleDroppedFile(file: any) {
    this.clipboard.alert('Work in progress');
    const reader = new FileReader();

    reader.onloadend = () => {
      const fileContents: string = String(reader.result);
      this.hist.historyNew(fileContents);
    };

    reader.readAsDataURL(file);
  }

  private download(doc: any): void {
    const docArray = doc.split(',');
    const arrayName = docArray[0]
      .split(':')
      .join('--')
      .split('/')
      .join('--')
      .split('+')
      .join('--')
      .split(';')
      .join('--')
      .split('--');

    if (docArray.length > 1) {
      if (docArray[0]) {
        const ext = this.getFileExtension(arrayName);
        console.log(ext);
        const a = document.createElement('a');
        const blob = this.b64toBlob(docArray[1], `application/${ext}`);

        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(
            blob,
            `${this.nameDownloadFile}.${ext}`
          );
        } else {
          a.href = URL.createObjectURL(blob);
          a.download = `${this.nameDownloadFile}.${ext}`;
          a.click();
          URL.revokeObjectURL(a.href);
        }
      }
    } else {
      this.clipboard.alert('It is not a valid file');
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

  private getFileExtension(arrayName: string[]): string {
    const allowExts = `txt,pdf,svg,jpg,png,jpeg,zip,mp3,rar,tar,xml,bmp,mpeg,tgz,html,htm,css,sass,scss,js',ts',php,vue,odt,gif,tif,tiff,doc`.split(
      ','
    );

    const ext: string[] = arrayName.filter(
      (item: string) => allowExts.indexOf(item) !== -1
    );
    // console.log(ext[0]);

    return ext.length > 0 ? ext[0] : 'txt';
  }
}
