import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoaderService } from '../../shared/services/loader.service';
import { APP_API_URL } from '../../../env';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  constructor(private http: HttpClient, private loader: LoaderService) { }

  index(callback: any) {
    this.loader.start();
    this.http.get(APP_API_URL + 'paying/leaves').subscribe((response) => {
      this.loader.stop();
      callback(response);
    });
  }

  show(id: number, callback: any) {
    this.http.get(APP_API_URL + 'paying/leaves/'+ id).subscribe((response) => {
      callback(response);
    });
  }

  store(data: any, callback: any, errorCallback?: any) {
    this.http.post(APP_API_URL + 'paying/leaves', data).subscribe({
      next: (response) => {
        callback(response);
      }, error: (error) => {
        errorCallback(error);
      }
    });
  }

  destroy(id: number, callback: any) {
    this.http.delete(APP_API_URL + 'paying/leaves/'+ id).subscribe((response) => {
      callback(response);
    });
  }
}
