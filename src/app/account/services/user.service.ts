import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoaderService } from '../../shared/services/loader.service';
import { APP_API_URL } from '../../../env';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, private loader: LoaderService) { }

  index(callback: any) {
    this.loader.start();
    this.http.get(APP_API_URL + 'account/users').subscribe((response) => {
      this.loader.stop();
      callback(response);
    });
  }

  show(id: number, callback: any) {
    this.http.get(APP_API_URL + 'account/users/'+ id).subscribe((response) => {
      callback(response);
    });
  }

  store(data: any, callback: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    });
    this.http.post(APP_API_URL + 'account/users', data, {headers: headers}).subscribe((response) => {
      callback(response);
    });
  }

  destroy(id: number, callback: any) {
    this.http.delete(APP_API_URL + 'account/users/'+ id).subscribe((response) => {
      callback(response);
    });
  }
}
