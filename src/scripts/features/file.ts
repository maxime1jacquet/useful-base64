import { BehaviorSubject } from 'rxjs';

import {
  getElementID,
  addClassToElement,
  removeClassToElement
} from '../utils';

export class File {
  public file$ = new BehaviorSubject('');
  public droparea: HTMLElement = getElementID('droparea');
  private maxFilesAllowed = 1;

  constructor() {
    this.init();
  }

  init() {
    this.AddEventListeners();
  }

  public AddEventListeners() {
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
  }

  public DragEnter(e: Event) {
    e.stopPropagation();
    e.preventDefault();
    addClassToElement('droparea', 'dragging-over');
  }

  public DragOver(e: any) {
    e.stopPropagation();
    e.preventDefault();
  }

  public DragLeave(e: any) {
    e.stopPropagation();
    e.preventDefault();
    removeClassToElement('droparea', 'dragging-over');
  }

  public Drop(e: any) {
    e.stopPropagation();
    e.preventDefault();
    removeClassToElement('droparea', 'dragging-over');
    this.HandleAllDroppedFiles(e);
  }

  public HandleAllDroppedFiles(e: any) {
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

  public HandleTooManyFilesDropped() {
    // console.log('Sorry, you dropped more files than allowed.');
  }

  public HandleDroppedFile(file: any) {
    const reader = new FileReader();

    reader.onloadend = () => {
      const fileContents: string = String(reader.result);
      this.file$.next(fileContents);
    };

    reader.readAsDataURL(file);
  }
}
