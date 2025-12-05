import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoaderService } from '../../shared/services/loader.service';
import { APP_API_URL } from '../../../env';
import { DetailTransferComponent } from '../pages/transfer/detail-transfer/detail-transfer.component';
import { AlertService } from '../../shared/services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  constructor(private http: HttpClient, private loader: LoaderService, private alert: AlertService) { }

  index(callback: any, param) {
    const params = new HttpParams({
      fromObject: param
    });

    this.loader.start();
    this.http.get(APP_API_URL + 'stocking/transfers', {params: params}).subscribe((response) => {
      this.loader.stop();
      callback(response);
    });
  }

  show(id: any, callback: any) {
    this.loader.start();
    this.http.get(APP_API_URL + 'stocking/transfers/'+ id).subscribe((response) => {
      this.loader.stop();
      callback(response);
    });
  }

  store(data: any, callback: any, errorCallback?: any) {
    this.http.post(APP_API_URL + 'stocking/transfers', data).subscribe({
      next: (response) => {
        callback(response);
      }, error: (error) => {
        errorCallback(error);
      }});
  }

  destroy(id: number, callback: any) {
    this.http.delete(APP_API_URL + 'stocking/transfers/'+ id).subscribe((response) => {
      callback(response);
    });
  }

  storeItem(data: any, callback: any) {
    this.http.post(APP_API_URL + `stocking/transfers/store-item`, data).subscribe((response) => {
      callback(response);
    });
  }

  removeItem(id: number, callback: any) {
    this.http.delete(APP_API_URL + `stocking/transfers/remove-item/${id}`).subscribe((response) => {
      callback(response);
    });
  }

  confirm(id: number|string, data: any, callback: any, errorCallback?: any) {
    this.http.post(APP_API_URL + `stocking/transfers/confirm/${id}`, data).subscribe({
      next: (response) => {
        callback(response);
      }, error: (error) => {
        errorCallback(error);
      }});
  }

  duplicate(id: number|string, data: any, callback: any, errorCallback?: any) {
    this.http.post(APP_API_URL + `stocking/transfers/duplicate/${id}`, data).subscribe({
      next: (response) => {
        callback(response);
      }, error: (error) => {
        errorCallback(error);
      }});
  }

  detail(id, callback?) {
    this.alert.openModal(DetailTransferComponent, (response) => {
      if (response) {
        callback(response);
      }
    }, {id: id}, 'full');
  }
}
