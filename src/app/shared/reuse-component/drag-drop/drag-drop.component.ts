import { Directionality } from '@angular/cdk/bidi';
import {
    Component,
    ContentChild,
    ElementRef,
    Input,
    OnInit,
    Output,
    TemplateRef,
    ViewChild, EventEmitter
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'lodash';
import { shareReplay } from 'rxjs/operators';
import PhotoViewer from 'photoviewer';
import { merge, Observable, Observer, Subject } from 'rxjs';

@Component({
    selector: 'app-drag-drop',
    templateUrl: './drag-drop.component.html',
    styleUrls: ['./drag-drop.component.scss'],
})
export class DragDropComponent implements OnInit {
    @Input() fieldname: string;
    @Input() support: string;
    @Input() vkCheckId: string;
    @Input() vkName: string;
    @Input() imagefiles: any = [];
    @Output() myOutput: EventEmitter<string> = new EventEmitter();
    outputMessage = 'I am from child';

    // imagefiles: any = {};
    supportedTypes = '';
    base64Image;

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
        if (this.support == 'pdf') {
            this.supportedTypes = 'PDF';
        } else {
            this.supportedTypes = 'JPG, JPEG, PNG';
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
            // console.log(this.imagefiles);
        this.myOutput.emit(this.imagefiles)

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

    toSentenceCase = (camelCase) => {
        if (camelCase) {
            const result = camelCase.replace(/([A-Z])/g, ' $1');
            return result[0].toUpperCase() + result.substring(1).toLowerCase();
        }
        return '';
    };

    downloadImage(fieldname) {
        let imageUrl = this.imagefiles[fieldname].base64;
        // console.log(imageUrl)
        this.getBase64ImageFromURL(imageUrl).subscribe((base64data) => {
            // console.log(base64data);
            this.base64Image = 'data:image/jpg;base64,' + base64data;
            // save image to disk
            var link = document.createElement('a');

            document.body.appendChild(link); // for Firefox

            link.setAttribute('href', this.base64Image);
            link.setAttribute(
                'download',
                `${this.vkCheckId}_${this.vkName}_${fieldname}.jpg`
            );
            link.click();
        });
    }

    getBase64ImageFromURL(url: string) {
        return Observable.create((observer: Observer<string>) => {
            const img: HTMLImageElement = new Image();
            img.crossOrigin = 'Anonymous';
            img.src = url;
            if (!img.complete) {
                img.onload = () => {
                    observer.next(this.getBase64Image(img));
                    observer.complete();
                };
                img.onerror = (err) => {
                    observer.error(err);
                };
            } else {
                observer.next(this.getBase64Image(img));
                observer.complete();
            }
        });
    }

    getBase64Image(img: HTMLImageElement) {
        const canvas: HTMLCanvasElement = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const dataURL: string = canvas.toDataURL('image/png');

        return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
    }

    sendValues(){
        this.myOutput.emit(this.imagefiles)
    }
}
