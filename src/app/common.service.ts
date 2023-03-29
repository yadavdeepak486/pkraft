import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CommonService {
    constructor(private http: HttpClient) {}

    public ApiGET(endpoint, params) {
        return this.http.get(endpoint);
    }

    public ApiPOST(endpoint, data) {
        return this.http.post(endpoint, data);
    }

    public User() {
        let token = localStorage.getItem('token');
        return this.http.get(`http://localhost:3000/api/userbytoken`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    public GetEmployees() {
        let token = localStorage.getItem('token');
        return this.http.get(`http://localhost:3000/api/clientemployees`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    public AddEmployee(files, form): Observable<HttpEvent<any>> {
        const formData: FormData = new FormData();

        formData.append('email', form.basic.email);
        formData.append('mobile', form.basic.mobile);
        formData.append('alt_mobile', form.basic.alt_mobile);
        formData.append('name', form.personal_detail.name);
        formData.append('father_name', form.personal_detail.father_name);
        formData.append('gender', form.personal_detail.gender);
        formData.append('birth_date', form.personal_detail.birth_date);
        formData.append(
            'permanent_address',
            form.personal_detail.permanent_address
        );
        formData.append(
            'current_address',
            form.personal_detail.current_address
        );
        formData.append(
            'stay_period_permanent_address',
            form.personal_detail.stay_period_permanent_address
        );
        formData.append(
            'stay_period_type',
            form.personal_detail.stay_period_type
        );
        if (files.aadharFront) {
            formData.append('aadharFront', files.aadharFront.file);
        }
        if (files.aadharBack) {
            formData.append('aadharBack', files.aadharBack.file);
        }
        if (files.panCard) {
            formData.append('panCard', files.panCard.file);
        }
        if (files.voterId) {
            formData.append('voterId', files.voterId.file);
        }
        if (files.drivingLicense) {
            formData.append('drivingLicense', files.drivingLicense.file);
        }
        if (files.qualificationCert) {
            formData.append('qualificationCert', files.qualificationCert.file);
        }
        if (files.expLetterOne) {
            formData.append('expLetterOne', files.expLetterOne.file);
        }
        formData.append(
            'previous_company_name_one',
            form.experience.previous_company_name_one
        );
        if (files.expLetterTwo) {
            formData.append('expLetterTwo', files.expLetterTwo.file);
        }
        formData.append(
            'previous_company_name_two',
            form.experience.previous_company_name_two
        );
        if (files.expLetterThree) {
            formData.append('expLetterThree', files.expLetterThree.file);
        }
        formData.append(
            'previous_company_name_three',
            form.experience.previous_company_name_three
        );
        formData.append('uan_no', form.uan_no.uan_num);

        const req = new HttpRequest(
            'POST',
            'http://localhost:3000/api/clientaddemployees',
            formData,
            {
                reportProgress: true,
                responseType: 'json',
            }
        );

        return this.http.request(req);
    }
}
