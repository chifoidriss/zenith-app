import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoaderService } from '../../shared/services/loader.service';
import { APP_API_URL } from '../../../env';
import { DetailInvoiceComponent } from '../pages/invoice/detail-invoice/detail-invoice.component';
import { AlertService } from '../../shared/services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient, private loader: LoaderService, private alert: AlertService) { }

  statistics(callback: any, param: any) {
    const params = new HttpParams({
      fromObject: param
    });

    this.loader.start();
    this.http.get(APP_API_URL + `invoicing/statistics`, {params: params}).subscribe((response) => {
      this.loader.stop();
      callback(response);
    });
  }

  index(callback: any, invoice_type: string, type: string, param: any) {
    const params = new HttpParams({
      fromObject: param
    });

    this.loader.start();
    this.http.get(APP_API_URL + `invoicing/${invoice_type}/${type}`, {params: params}).subscribe((response) => {
      this.loader.stop();
      callback(response);
    });
  }

  show(id: number|string, callback: any, invoice_type: string, type: string) {
    this.loader.start();

    this.http.get(APP_API_URL + `invoicing/${invoice_type}/${type}/${id}`).subscribe((response) => {
      this.loader.stop();
      callback(response);
    });
  }

  store(data: any, callback: any, invoice_type: string, type: string, errorCallback?: any) {
    this.http.post(APP_API_URL + `invoicing/${invoice_type}/${type}`, data).subscribe({
      next: (response) => {
        callback(response);
      }, error: (error) => {
        errorCallback(error);
      }});
  }

  destroy(id: number, callback: any, invoice_type: string, type: string) {
    this.http.delete(APP_API_URL + `invoicing/${invoice_type}/${type}/${id}`).subscribe((response) => {
      callback(response);
    });
  }

  storeItem(data: any, callback: any, invoice_type: string, type: string) {
    this.http.post(APP_API_URL + `invoicing/${invoice_type}/${type}/store-item`, data).subscribe((response) => {
      callback(response);
    });
  }

  removeItem(id: number, callback: any, invoice_type: string, type: string) {
    this.http.delete(APP_API_URL + `invoicing/${invoice_type}/${type}/remove-item/${id}`).subscribe((response) => {
      callback(response);
    });
  }

  confirm(id: number|string, data: any, callback: any, invoice_type: string, type: string, errorCallback?: any) {
    this.http.post(APP_API_URL + `invoicing/${invoice_type}/${type}/confirm/${id}`, data).subscribe({
      next: (response) => {
        callback(response);
      }, error: (error) => {
        errorCallback(error);
      }});
  }

  duplicate(id: number|string, data: any, callback: any, invoice_type: string, type: string, errorCallback?: any) {
    this.http.post(APP_API_URL + `invoicing/${invoice_type}/${type}/duplicate/${id}`, data).subscribe({
      next: (response) => {
        callback(response);
      }, error: (error) => {
        errorCallback(error);
      }});
  }

  followup(callback: any, type: string, param: any) {
    const params = new HttpParams({
      fromObject: param
    });

    this.loader.start();
    this.http.get(APP_API_URL + `invoicing/followup/${type}`, {params: params}).subscribe((response) => {
      this.loader.stop();
      callback(response);
    });
  }

  detail(id, callback?) {
    this.alert.openModal(DetailInvoiceComponent, (response) => {
      if (response) {
        // this.data.data[index] = callback(response);
        callback(response);
      }
    }, {invoice_type: 'all', type: 'all', id: id}, 'full');
  }
}
