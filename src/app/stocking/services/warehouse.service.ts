import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoaderService } from '../../shared/services/loader.service';
import { APP_API_URL } from '../../../env';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {
  constructor(private http: HttpClient, private loader: LoaderService) { }

  index(callback: any) {
    this.loader.start();
    this.http.get(APP_API_URL + 'stocking/warehouses').subscribe((response) => {
      this.loader.stop();
      callback(response);
    });
  }

  show(id: number, callback: any) {
    this.http.get(APP_API_URL + 'stocking/warehouses/'+ id).subscribe((response) => {
      callback(response);
    });
  }

  store(data: any, callback: any) {
    this.http.post(APP_API_URL + 'stocking/warehouses', data).subscribe((response) => {
      callback(response);
    });
  }

  destroy(id: number, callback: any) {
    this.http.delete(APP_API_URL + 'stocking/warehouses/'+ id).subscribe((response) => {
      callback(response);
    });
  }
}
