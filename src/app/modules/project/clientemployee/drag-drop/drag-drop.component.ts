import { Directionality } from '@angular/cdk/bidi';
import {
    Component,
    ContentChild,
    ElementRef,
    Input,
    OnInit,
    Output,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'lodash';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import PhotoViewer from 'photoviewer';


@Component({
    selector: 'app-drag-drop',
    templateUrl: './drag-drop.component.html',
    styleUrls: ['./drag-drop.component.scss'],
})
export class DragDropComponent implements OnInit {
  @Input() fieldname: string
  @Input() support: string

    imagefiles: any = {};
    supportedTypes = '';

    photoOptions: PhotoViewer.Options = {
        footerToolbar: [
            'zoomIn',
            'zoomOut',
            'rotateLeft',
            'rotateRight',
            'fullscreen',
            'actualSize',
        ],
    };

    constructor() {
      if(this.support == "pdf"){
        this.supportedTypes = "PDF"
      }else{
        this.supportedTypes = "JPG, JPEG, PNG"
      }
    }

    ngOnInit(): void {}

    fileBrowseandDropHandler(file, filetype) {
        console.log(filetype);
        var reader = new FileReader();
        console.log(file[0]);
        if (file[0]) {
            let imageType = file[0].type;
            let fileObj = file[0];
            reader.readAsDataURL(file[0]);
            reader.onload = (_event) => {
                let base64 = reader.result;
                let filedetail = {
                    imageType: imageType,
                    file: fileObj,
                    base64: base64,
                };
                this.imagefiles[filetype] = filedetail;
            };
            console.log(this.imagefiles);
        }
    }

    viewImage(filetype) {
        let items = [
            {
                src: this.imagefiles[filetype].base64,
                title: filetype,
            },
        ];
        console.log(items);
        const viewer = new PhotoViewer(items, this.photoOptions);
    }

    removeImage(filetype) {
        delete this.imagefiles[filetype];
    }

    toSentenceCase = camelCase => {
      if (camelCase) {
          const result = camelCase.replace(/([A-Z])/g, ' $1');
          return result[0].toUpperCase() + result.substring(1).toLowerCase();
      }
      return '';
   };
}
