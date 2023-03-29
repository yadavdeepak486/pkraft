import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ClientService {
    private serverurl = environment.serverurl;

    constructor(private http: HttpClient) {}

    public ApiGET(endpoint, params) {
        return this.http.get(endpoint);
    }

    public ApiPOST(endpoint, data) {
        return this.http.post(endpoint, data);
    }

    public pagination(array) {
        let pagination;
        pagination.length = array?.length;
        pagination.size = 10;
        pagination.page = 0;
        if (array?.length > 10) {
            pagination.lastPage = array?.length % 10;
            pagination.endIndex = Number(array?.length / 10);
        } else {
            pagination.lastPage = array?.length;
            pagination.endIndex = 0;
        }
        pagination.startIndex = 0;
        return pagination;
    }
}
