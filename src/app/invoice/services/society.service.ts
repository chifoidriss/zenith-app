import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoaderService } from '../../shared/services/loader.service';
import { APP_API_URL } from '../../../env';

@Injectable({
  providedIn: 'root'
})
export class SocietyService {
  constructor(private http: HttpClient, private loader: LoaderService) { }

  show(id: number, callback: any) {
    this.http.get(APP_API_URL + 'invoicing/societies').subscribe((response) => {
      callback(response);
    });
  }

  store(data: any, callback: any) {
    this.http.post(APP_API_URL + 'invoicing/societies', data).subscribe((response) => {
      callback(response);
    });
  }
}
