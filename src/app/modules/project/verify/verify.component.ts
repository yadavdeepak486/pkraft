import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import PhotoViewer from 'photoviewer';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, Observable, Observer, Subject } from 'rxjs';
import { debounceTime, map, switchMap, takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { CommonService } from 'app/common.service';

@Component({
    selector: 'app-verify',
    templateUrl: './verify.component.html',
    styleUrls: ['./verify.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations,
})
export class VerifyComponent implements OnInit {
    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;

    isLoading: boolean = true;
    searchInputControl: FormControl = new FormControl();
    employeeList: any = [];
    selectedEmployeeId: string;
    flashMessage: 'success' | 'error' | null = null;
    base64Image;
    //   pagination = {
    //     length: 23,
    //     size: 10,
    //     page: 0,
    //     lastPage: 3,
    //     startIndex: 0,
    //     endIndex: 9
    // }
    pagination = {
        length: 2,
        size: 10,
        page: 0,
        lastPage: 2,
        startIndex: 0,
        endIndex: 0,
    };

    

    photoOptions: PhotoViewer.Options = {
        footerToolbar: [
            'zoomIn',
            'zoomOut',
            'rotateLeft',
            'rotateRight',
            'fullscreen',
            'actualSize',
            'downloadBtn',
        ],
        customButtons: {
            downloadBtn: {
                text: '<svg viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M960 928H64a32 32 0 0 0 0 64h896a32 32 0 0 0 0-64zM512 96a32 32 0 0 0 32-32 33.6 33.6 0 0 0-9.28-22.72 37.12 37.12 0 0 0-10.56-6.72 32 32 0 0 0-34.88 6.72A32 32 0 0 0 480 64a32 32 0 0 0 32 32zM512 320a32 32 0 0 0 32-32V192a32 32 0 0 0-64 0v96a32 32 0 0 0 32 32zM489.28 758.72a32 32 0 0 0 45.44 0l224-224a32 32 0 0 0-45.12-45.12L544 658.88V416a32 32 0 0 0-64 0v242.88l-169.28-169.6A32 32 0 0 0 265.6 534.4z" fill="#231815"></path></g></svg>',
                title: 'Download',
                click: function (context, e) {
                    console.log('click function');
                },
            },
        },
    };

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private commonService: CommonService
    ) {}

    ngOnInit(): void {
        this.getClients();
    }

    getClients() {
        this.commonService
            .ApiGET('http://localhost:3000/api/employeelist', {})
            .subscribe((res: any) => {
                console.log(res);
                if (res.status) {
                    this.employeeList = res.data;
                    console.log(this.pagination);
                    this.showFlashMessage('success');
                    this.isLoading = false;
                } else {
                    console.log(res.msg);
                }
            });
    }

    preview(src) {
        let items = [
            {
                src: src,
            },
        ];
        const viewer = new PhotoViewer(items, this.photoOptions);
    }

    showFlashMessage(type: 'success' | 'error'): void {
        // Show the message
        this.flashMessage = type;

        // Mark for check
        this._changeDetectorRef.markForCheck();

        // Hide it after 3 seconds
        setTimeout(() => {
            this.flashMessage = null;

            // Mark for check
            this._changeDetectorRef.markForCheck();
        }, 3000);
    }

    createProduct() {
        console.log('Create Client');
    }

    toggleDetails(clientId: string): void {
        console.log('toggleDetails');
        this.selectedEmployeeId = clientId;
        console.log(this.selectedEmployeeId);
    }

    downloadImage() {
        let imageUrl = 
            'http://southparkstudios.mtvnimages.com/shared/characters/celebrities/mr-hankey.png?height=165';

        this.getBase64ImageFromURL(imageUrl).subscribe((base64data) => {
            console.log(base64data);
            this.base64Image = 'data:image/jpg;base64,' + base64data;
            // save image to disk
            var link = document.createElement('a');

            document.body.appendChild(link); // for Firefox

            link.setAttribute('href', this.base64Image);
            link.setAttribute('download', 'mrHankey.jpg');
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
}
