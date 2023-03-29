import { Directionality } from '@angular/cdk/bidi';
import { Component, ContentChild, ElementRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'lodash';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  _uploadState$: any;

  // @ContentChild(FileUploadInputDirective, { read: ElementRef })
  // _fileInputRef?: ElementRef<HTMLInputElement>;

  // @ContentChild(FileUploadItemActionDirective, { read: TemplateRef })
  // _customUploadItemActionTemplate?: TemplateRef<unknown>;

  @ViewChild('defaultUploadItemActionTemplate', { static: true })
  _defaultUploadItemActionTemplate?: TemplateRef<unknown>;

  /**
   * Source to upload selected files to.
   */
  @Input()
  uploadSource?: any;

  @Input()
  statusBar = false;

  constructor(
    private _dialogService: MatDialog,
    private _directionality: Directionality,
  ) {
    // this._uploadState$ = this._fileUploadService.uploadState$;
  }

  ngAfterContentInit() {
    // if (!this._fileInputRef) {
    //   throw new Error('File input with a FileInputDirective is required');
    // }
  }

  /**
   * Reset file upload
   */
  reset() {
    // this._fileUploadService.reset();
    // if (this._fileInputRef) {
    //   this._fileInputRef.nativeElement.files = null;
    //   this._fileInputRef.nativeElement.value = null;
    // }
  }

  _onFileChange(files: FileList) {
    // Only add files if an uploadSource has been provided.
    // If no upload source is provided, it is assumed the consumer will handle the upload state.
    // if (this.uploadSource) {
    //   if (!this._fileInputRef.nativeElement.multiple) {
    //     this._fileUploadService.reset();
    //   }

    //   this._fileUploadService.addFiles(files, this.uploadSource);
    // }
  }

  // _onView() {
  //   const uploadData: FileUploadDialogData = {
  //     uploadItems$: this._uploadState$.pipe(
  //       map((status) => status?.uploadItems ?? []),
  //       shareReplay()
  //     ),
  //     uploadItemActionTemplate:
  //       this._customUploadItemActionTemplate ??
  //       this._defaultUploadItemActionTemplate,
  //   };

  //   this._dialogService.open(FileUploadDialogComponent, {
  //     data: uploadData,
  //     minWidth: 350,
  //     direction: this._directionality.value,
  //   });
  // }

  ngOnInit(): void {
  }

}
