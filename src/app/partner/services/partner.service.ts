import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoaderService } from '../../../app/shared/services/loader.service';
import { APP_API_URL } from '../../../env';
import { DetailPartnerComponent } from '../pages/index-partner/detail-partner/detail-partner.component';
import { AlertService } from '../../../app/shared/services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {
  constructor(private http: HttpClient, private loader: LoaderService, private alert: AlertService) { }

  index(callback: any, type: string) {
    this.loader.start();
    this.http.get(APP_API_URL + `partners/${type}`).subscribe((response) => {
      this.loader.stop();
      callback(response);
    });
  }

  show(id: number|string, callback: any, type: string) {
    this.http.get(APP_API_URL + `partners/${type}/${id}`).subscribe((response) => {
      callback(response);
    });
  }

  store(data: any, callback: any, type: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    });
    this.http.post(APP_API_URL + `partners/${type}`, data, {headers: headers}).subscribe((response) => {
      callback(response);
    });
  }

  destroy(id: number, callback: any, type: string) {
    this.http.delete(APP_API_URL + `partners/${type}/${id}`).subscribe((response) => {
      callback(response);
    });
  }

  detail(id) {
    this.alert.openModal(DetailPartnerComponent, (response) => {
    }, {type: 'all', id: id}, 'full');
  }

  filter(callback: any, term: string, type?: string) {
    const params = new HttpParams({
      fromObject: {q: term}
    });
    this.http.get(APP_API_URL + `partners/${type}/filter`, {params: params}).subscribe((response) => {
      callback(response);
    });
  }
}
