import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoaderService } from '../../shared/services/loader.service';
import { APP_API_URL } from '../../../env';

@Injectable({
  providedIn: 'root'
})
export class OperationService {
  constructor(private http: HttpClient, private loader: LoaderService) { }

  index(callback: any) {
    this.loader.start();
    this.http.get(APP_API_URL + 'stocking/operations').subscribe((response) => {
      this.loader.stop();
      callback(response);
    });
  }

  show(id: number, callback: any) {
    this.http.get(APP_API_URL + 'stocking/operations/'+ id).subscribe((response) => {
      callback(response);
    });
  }

  store(data: any, callback: any) {
    this.http.post(APP_API_URL + 'stocking/operations', data).subscribe((response) => {
      callback(response);
    });
  }

  destroy(id: number, callback: any) {
    this.http.delete(APP_API_URL + 'stocking/operations/'+ id).subscribe((response) => {
      callback(response);
    });
  }
}
