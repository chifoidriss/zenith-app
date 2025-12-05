import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from '../../shared/services/alert.service';
import { LoaderService } from '../../shared/services/loader.service';
import { APP_API_URL } from '../../../env';
import { DetailPaymentComponent } from '../pages/index-payment/detail-payment/detail-payment.component';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(private http: HttpClient, private loader: LoaderService, private alert: AlertService) { }

  index(callback: any, type: string, param?: any) {
    const params = new HttpParams({
      fromObject: param
    });

    this.loader.start();
    this.http.get(APP_API_URL + 'invoicing/payments/'+type, {params: params}).subscribe((response) => {
      this.loader.stop();
      callback(response);
    });
  }

  show(id: number, callback: any, type: string) {
    this.loader.start();
    this.http.get(APP_API_URL + 'invoicing/payments/'+type+'/'+ id).subscribe((response) => {
      this.loader.stop();
      callback(response);
    });
  }

  store(data: any, callback: any, type: string, errorCallback?: any) {
    this.http.post(APP_API_URL + 'invoicing/payments/'+type, data).subscribe({
      next: (response) => {
        callback(response);
      }, error: (error) => {
        errorCallback(error);
      }});
  }

  destroy(id: number, callback: any, type: string) {
    this.http.delete(APP_API_URL + 'invoicing/payments/'+type+'/'+ id).subscribe((response) => {
      callback(response);
    });
  }

  cancel(id: number, callback: any, type: string) {
    this.http.post(APP_API_URL + 'invoicing/payments/'+type+'/'+ id+'/cancel', {}).subscribe((response) => {
      callback(response);
    });
  }

  detail(id, callback?) {
    this.alert.openModal(DetailPaymentComponent, (response) => {
      if (response) {
        callback(response);
      }
    }, {id: id});
  }

  print(id: number|string, type: string) {
    this.http.get<Blob>(APP_API_URL + `invoicing/payments/${type}/print/${id}`).subscribe((response) => {
      const downloadURL = window.URL.createObjectURL(response);
      const link = document.createElement('a');
      link.href = downloadURL;
      link.click();
    });
  }
}
