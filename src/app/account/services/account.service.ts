import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { APP_API_URL } from '../../../env';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  countries(callback: any) {
    this.http.get(`${APP_API_URL}countries`).subscribe({
      next: (response: any) => {
        callback(response);
      }
    });
  }

  index(callback: any) {
    this.http.get(`${APP_API_URL}account`).subscribe({
      next: (response: any) => {
        callback(response);
      }
    });
  }

  updateInformations(param: any, callback: any) {
    this.http.post(`${APP_API_URL}account/update-informations`, param).subscribe({
      next: (response: any) => {
        this.auth.user = response;
        callback(response);
      }
    });
  }

  updatePassword(param: any, callback: any) {
    this.http.post(`${APP_API_URL}account/update-password`, param).subscribe({
      next: (response: any) => {
        this.auth.user = response;
        callback(response);
      }
    });
  }

  updateImage(param: any, callback: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    });

    this.http.post(`${APP_API_URL}account/update-image`, param, {headers: headers}).subscribe({
      next: (response: any) => {
        this.auth.user = response;
        callback(response);
      }
    });
  }
}
