import {
    Component,
    OnInit,
    ViewEncapsulation,
    ViewChild,
    ElementRef,
    Renderer2,
    OnChanges,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../clientemployee.service';

@Component({
    selector: 'employee-settings-account',
    templateUrl: './account.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeSettingsAccountComponent implements OnInit, OnChanges {
    @ViewChild('avatarFileInput') private _avatarFileInput: ElementRef;
    @ViewChild('profileFileInput') private _profileFileInput: ElementRef;
    accountForm: FormGroup;
    contact: any;
    clientId;
    editmode: Boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder,
        private _renderer2: Renderer2,
        private _changeDetectorRef: ChangeDetectorRef,
        private _employeeService: EmployeeService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.clientId = this.route.snapshot.paramMap.get('id');

        if (this.clientId) {
            this.editmode = true;
            this.getClientDetail(this.clientId);
        }

        this.accountForm = this._formBuilder.group({
            contact_person_name: [''],
            company_name: [''],
            company_size: [],
            email: ['', Validators.email],
            mobile: [''],
            contact_persons_designation: [''],
            password: ['123456'],
            confirm_password: ['123456'],
        });

        this.contact = {
            name: 'Dew',
            avatar: '',
            profile: '',
        };
    }

    ngOnChanges() {
        console.log('Changes');
        // changes.prop contains the old and the new value...
    }

    toggleEditMode(state: Boolean) {
        console.log('Toggle edit mode', state);
    }

    uploadAvatar(fileList: FileList): void {
        console.log(fileList);
        // Return if canceled
        if (!fileList.length) {
            return;
        }

        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        const file = fileList[0];

        // Return if the file is not allowed
        if (!allowedTypes.includes(file.type)) {
            return;
        }

        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (_event) => {
            this.contact = {
                name: 'Deep',
                avatar: reader.result,
                profile: this.contact.profile,
            };
            this._changeDetectorRef.markForCheck();
        };
    }

    uploadProfile(fileList: FileList): void {
        if (!fileList.length) {
            return;
        }

        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        const file = fileList[0];

        // Return if the file is not allowed
        if (!allowedTypes.includes(file.type)) {
            return;
        }

        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (_event) => {
            this.contact = {
                name: 'Deep',
                avatar: this.contact.avatar,
                profile: reader.result,
            };
            console.log(this.contact);
            this._changeDetectorRef.markForCheck();
        };
    }

    /**
     * Remove the avatar
     */
    removeAvatar(): void {
        this._avatarFileInput.nativeElement.value = null;
        this.contact.avatar = null;
    }

    removeProfile(): void {
        this._profileFileInput.nativeElement.value = null;
        this.contact.profile = null;
    }

    submit() {
        if (!this.editmode) {
            console.log(this.accountForm.value);
            this._employeeService
                .ApiPOST(
                    'http://localhost:3000/api/addclient',
                    this.accountForm.value
                )
                .subscribe((res: any) => {
                    console.log(res);
                    if (res.status) {
                        this.router.navigate(['/client']);
                    } else {
                        console.log(res);
                    }
                });
        } else {
            console.log(this.accountForm.value);
            this._employeeService
                .ApiPOST(
                    `http://localhost:3000/api/editclient/${this.clientId}`,
                    this.accountForm.value
                )
                .subscribe((res: any) => {
                    console.log(res);
                });
        }
    }

    cancelForm() {
        this.router.navigate(['/client']);
    }

    getClientDetail(id) {
        this._employeeService
            .ApiGET(`http://localhost:3000/api/detail/${id}`, {})
            .subscribe((res: any) => {
                console.log(res);
                if (res.status) {
                    this.accountForm.setValue({
                        contact_person_name: res.data?.company_detail
                            ?.contact_person_name
                            ? res.data?.company_detail?.contact_person_name
                            : '',
                        company_name: res.data?.company_detail?.company_name
                            ? res.data?.company_detail?.company_name
                            : '',
                        company_size: res.data?.company_detail?.company_size
                            ? res.data?.company_detail?.company_size
                            : '',
                        email: res.data?.email ? res.data?.email : '',
                        mobile: res.data?.mobile ? res.data?.mobile : '',
                        contact_persons_designation: res.data?.company_detail
                            ?.contact_persons_designation
                            ? res.data?.company_detail
                                  ?.contact_persons_designation
                            : '',
                        password: res.data?.password ? res.data?.password : '',
                        confirm_password: res.data?.password
                            ? res.data?.password
                            : '',
                    });
                }
            });
    }
}
