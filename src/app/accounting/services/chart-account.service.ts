
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoaderService } from '../../shared/services/loader.service';
import { APP_API_URL } from '../../../env';

@Injectable({
  providedIn: 'root'
})
export class ChartAccountService {

  constructor(private http: HttpClient, private loader: LoaderService) { }

  index(callback: any, code?: number) {
    this.loader.start();
    this.http.get(APP_API_URL + 'accounting/chart-account?code='+code).subscribe((response) => {
      this.loader.stop();
      callback(response);
    });
  }

  filter(callback: any, code: number) {
    this.http.get(APP_API_URL + 'accounting/chart-account/filter/' + code).subscribe((response) => {
      callback(response);
    });
  }

  indexTypeAccount(callback: any) {
    this.http.get(APP_API_URL + 'accounting/chart-account/type-account').subscribe((response) => {
      callback(response);
    });
  }

  show(id: number, callback: any) {
    this.http.get(APP_API_URL + 'accounting/chart-account/'+ id).subscribe((response) => {
      callback(response);
    });
  }

  store(data: any, callback: any) {
    this.http.post(APP_API_URL + 'accounting/chart-account', data).subscribe((response) => {
      callback(response);
    });
  }

  deprecated_and_allow(id: number, data: any, callback: any) {
    this.http.post(APP_API_URL + 'accounting/chart-account/depreciate/'+ id, data).subscribe((response) => {
      callback(response);
    });
  }

  destroy(id: number, callback: any) {
    this.http.delete(APP_API_URL + 'accounting/chart-account/'+id).subscribe((response) => {
      callback(response);
    });
  }
}
