import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoaderService } from '../../shared/services/loader.service';
import { APP_API_URL } from '../../../env';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor(private http: HttpClient, private loader: LoaderService) { }

  permissions(callback: any) {
    this.loader.start();
    this.http.get(APP_API_URL + 'account/roles/permissions').subscribe((response) => {
      callback(response);
    });
  }

  index(callback: any) {
    this.loader.start();
    this.http.get(APP_API_URL + 'account/roles').subscribe((response) => {
      this.loader.stop();
      callback(response);
    });
  }

  show(id: number, callback: any) {
    this.http.get(APP_API_URL + 'account/roles/'+ id).subscribe((response) => {
      callback(response);
    });
  }

  store(data: any, callback: any) {
    this.http.post(APP_API_URL + 'account/roles', data).subscribe((response) => {
      callback(response);
    });
  }

  destroy(id: number, callback: any) {
    this.http.delete(APP_API_URL + 'account/roles/'+ id).subscribe((response) => {
      callback(response);
    });
  }
}
