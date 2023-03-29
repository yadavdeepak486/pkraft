import { Component, OnInit } from '@angular/core';
import PhotoViewer from 'photoviewer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'app/common.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { merge, Observable, Observer, Subject } from 'rxjs';
import * as moment from 'moment';



@Component({
    selector: 'app-verify-employee',
    templateUrl: './verify-employee.component.html',
    styleUrls: ['./verify-employee.component.scss'],
})
export class VerifyEmployeeComponent implements OnInit {
    verticalStepperForm: FormGroup;
    employeeStepperForm: FormGroup;
    imagefiles: any = {};
    vkCheckId;
    vkName;
    savingStatus = false;
    saved = false;
    delay = 10;
    base64Image;

    progress = 5;
    employeeId;
    editmode;


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
        private _formBuilder: FormBuilder,
        public commonService: CommonService,
        private router: Router,
        private route: ActivatedRoute,

    ) {}

    ngOnInit(): void {
        this.employeeId = this.route.snapshot.paramMap.get('id');
        if(this.employeeId){
            this.setEmployeeDetails(this.employeeId)
            this.editmode = true
        }




        this.employeeStepperForm = this._formBuilder.group({
            basic: this._formBuilder.group({
                email: ['', [Validators.email, Validators.required]],
                mobile: ['', [Validators.required,Validators.minLength(10), Validators.maxLength(10)]],
                alt_mobile: ['',[Validators.minLength(10), Validators.maxLength(10)]],
            }),
            personal_detail: this._formBuilder.group({
                name: [''],
                father_name: [''],
                gender: ['Male'],
                // birthdate: [''],
                birth_date: [''],
                permanent_address: [''],
                current_address: [''],
                stay_period_permanent_address: [''],
            }),
            // identity_proof: this._formBuilder.group({}),
            // qualification: this._formBuilder.group({}),
            experience: this._formBuilder.group({
                previous_company_name_one: [''],
                previous_company_name_two: [''],
                previous_company_name_three: [''],
            }),
            uan_no: this._formBuilder.group({
                uan_num: [''],
            }),
        });
    }

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

    removeImage(filetype) {
        delete this.imagefiles[filetype];
    }

    decrement() {
        this.delay = this.delay - 1;
        if (this.delay == 0) {
            this.router.navigate(['/employee']);
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

    save() {
        this.employeeStepperForm.patchValue({
            personal_detail: {
                birth_date:
                    this.employeeStepperForm.value.personal_detail.birth_date.format(
                        'DD/MM/YYYY'
                    ),
            },
        });
        this.savingStatus = true;
        this.commonService
            .AddEmployee(this.imagefiles, this.employeeStepperForm.value)
            .subscribe((event: any) => {
                if (event.type === HttpEventType.UploadProgress) {
                    this.progress = Math.round(
                        (100 * event.loaded) / event.total
                    );
                    console.log(this.progress);
                } else if (event instanceof HttpResponse) {
                    this.saved = true;
                    setInterval(() => {
                        this.decrement();
                    }, 1000);
                    console.log(event);
                }
            });
    }

    setEmployeeDetails(id){
        this.commonService.ApiGET(`http://localhost:3000/api/employee/${id}`,{}).subscribe((res:any) =>{
            // console.log(res)
            if(res.status){
                let data = res.data
                console.log(data)
                this.vkCheckId = data.employee_detail.checkId;
                this.vkName = data.personal_info.name.replace(/ /g,"_");
                this.employeeStepperForm.setValue({
                    basic: {
                        email: data.email ? data.email : '',
                        mobile: data.mobile ? data.mobile : '',
                        alt_mobile: data.personal_info?.alt_mobile ? data.personal_info?.alt_mobile : '',
                    },
                    personal_detail: {
                        name : data?.personal_info?.name ? data?.personal_info?.name : '',
                        father_name : data?.employee_detail?.father_name ? data?.employee_detail?.father_name : '',
                        gender : data?.personal_info?.gender ? data?.personal_info?.gender : '',
                        birth_date: data?.personal_info?.birth_date ? 
                       moment(data?.personal_info?.birth_date,'DD/MM/YYYY').format('LL') : '',
                        permanent_address:  data?.employee_detail?.permanent_address ? data?.employee_detail?.permanent_address : '',
                        current_address:  data?.employee_detail?.current_address ? data?.employee_detail?.current_address : '',
                        stay_period_permanent_address  : data?.employee_detail?.stay_period_permanent_address ? data?.employee_detail?.stay_period_permanent_address : ''
                    },
                    experience : {
                        previous_company_name_one : data?.employee_detail?.previous_company_name_one ? data?.employee_detail?.previous_company_name_one : '',
                        previous_company_name_two : data?.employee_detail?.previous_company_name_two ? data?.employee_detail?.previous_company_name_two : '',
                        previous_company_name_three : data?.employee_detail?.previous_company_name_three ? data?.employee_detail?.previous_company_name_three : '',
                    },
                    uan_no: {
                        uan_num: data?.employee_detail?.uan_no ? data?.employee_detail?.uan_no : ''
                    }
                })

                this.imagefiles = {
                    aadharFront : {
                        base64: data.employee_detail.aadharFront ? data.employee_detail.aadharFront : '',
                    },
                    aadharBack : {
                        base64: data.employee_detail.aadharBack ? data.employee_detail.aadharBack : '',
                    },
                    panCard : {
                        base64: data.employee_detail.panCard ? data.employee_detail.panCard : '',
                    },
                    drivingLicense : {
                        base64: data.employee_detail.drivingLicense ? data.employee_detail.drivingLicense : '',
                    },
                    voterId : {
                        base64: data.employee_detail.voterId ? data.employee_detail.voterId : '',
                    },
                    expLetterOne : {
                        base64: data.employee_detail.expLetterOne ? data.employee_detail.expLetterOne : '',
                    },
                    expLetterTwo : {
                        base64: data.employee_detail.expLetterTwo ? data.employee_detail.expLetterTwo : '',
                    },
                    expLetterThree : {
                        base64: data.employee_detail.expLetterThree ? data.employee_detail.expLetterThree : '',
                    },
                    qualificationCert : {
                        base64: data.employee_detail.qualificationCert ? data.employee_detail.qualificationCert : '',
                    },
                    
                }
            }
        })

    }

    async getBase64ImageFromUrl(imageUrl) {
        var res = await fetch(imageUrl);
        var blob = await res.blob();
      
        return new Promise((resolve, reject) => {
          var reader  = new FileReader();
          reader.addEventListener("load", function () {
              resolve(reader.result);
          }, false);
      
          reader.onerror = () => {
            return reject(this);
          };
          reader.readAsDataURL(blob);
        })
      }

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
            link.setAttribute('download', `${this.vkCheckId}_${this.vkName}_${fieldname}.jpg`);
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

    getChildData(data){
        this.imagefiles.push(...data)
        console.log(data)
        console.log(this.imagefiles)

    }
}
