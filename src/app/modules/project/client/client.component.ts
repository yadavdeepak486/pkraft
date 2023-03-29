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
import { merge, Observable, Subject } from 'rxjs';
import { debounceTime, map, switchMap, takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { CommonService } from 'app/common.service';

@Component({
    selector: 'app-client',
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations,
})
export class ClientComponent implements OnInit {
    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;

    isLoading: boolean = true;
    searchInputControl: FormControl = new FormControl();
    clientList: any = [];
    selectedClientId: string;
    flashMessage: 'success' | 'error' | null = null;
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
        ],
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
            .ApiGET('http://localhost:3000/api/clientlist', {})
            .subscribe((res: any) => {
                console.log(res);
                if (res.status) {
                    this.clientList = res.data;
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
        this.selectedClientId = clientId;
        console.log(this.selectedClientId);
    }
}
