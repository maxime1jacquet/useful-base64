import { BehaviorSubject } from 'rxjs';

import { getElementID } from './utils';

export class File {
  public file$ = new BehaviorSubject('');
  public droparea: HTMLElement = getElementID('droparea');

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
    this.droparea.classList.add('dragging-over');
  }

  public DragOver(e: any) {
    e.stopPropagation();
    e.preventDefault();
  }

  public DragLeave(e: any) {
    e.stopPropagation();
    e.preventDefault();
    this.droparea.classList.remove('dragging-over');
  }

  public Drop(e: any) {
    e.stopPropagation();
    e.preventDefault();
    this.droparea.classList.remove('dragging-over');
    this.HandleAllDroppedFiles(e);
  }

  public HandleAllDroppedFiles(e: any) {
    const dt = e.dataTransfer;
    const files = dt.files;
    if (files.length < 1) {
      return;
    }
    const maxFilesAllowed = parseInt(e.target.dataset.max_files_allowed, 10);
    if (Number.isInteger(maxFilesAllowed)) {
      if (files.length > parseInt(e.target.dataset.max_files_allowed, 10)) {
        this.HandleTooManyFilesDropped();
        return;
      }
    }
    for (let i = 0; i < files.length; i++) {
      this.HandleDroppedFile(files[i]);
    }
  }

  public HandleTooManyFilesDropped() {
    console.log('Sorry, you dropped more files than allowed.');
  }

  public HandleDroppedFile(file: any) {
    const reader = new FileReader();

    reader.onloadend = () => {
      const fileContents: string = String(reader.result);
      this.file$.next(fileContents);
      // console.log(file);
      // console.log('File Name: ' + file.name);
      // console.log('File Type: ' + file.type);
      // console.log('File Size (characters): ' + file.size);
      // console.log('File Last Modified (timestamp): ' + file.lastModified);
      // console.log('File Last Modified Date: ' + file.lastModifiedDate);
      // console.log('File Contents:');
      // console.log(fileContents);
    };

    // reader.readAsText(file);
    reader.readAsDataURL(file);
  }
}
