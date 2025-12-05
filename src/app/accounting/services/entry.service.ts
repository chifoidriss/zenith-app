import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoaderService } from '../../shared/services/loader.service';
import { APP_API_URL } from '../../../env';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  constructor(private http: HttpClient, private loader: LoaderService) { }

  index(callback: any, param?: any) {
    const params = new HttpParams({
      fromObject: param
    });

    this.loader.start();
    this.http.get(APP_API_URL + 'accounting/entries', {params: params}).subscribe((response) => {
      this.loader.stop();
      callback(response);
    });
  }

  show(id: number, callback: any) {
    this.http.get(APP_API_URL + 'accounting/entries/'+ id).subscribe((response) => {
      callback(response);
    });
  }

  store(data: any, callback: any, errorCallback?: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    });

    this.http.post(APP_API_URL + 'accounting/entries', data, {headers: headers}).subscribe({
    next: (response) => {
      callback(response);
    }, error: (error) => {
      errorCallback(error);
    }});
  }

  destroy(id: number, callback: any) {
    this.http.delete(APP_API_URL + 'accounting/entries/'+id).subscribe((response) => {
      callback(response);
    });
  }

  removeLine(id: number, callback: any) {
    this.http.delete(APP_API_URL + `accounting/remove-line/${id}`).subscribe((response) => {
      callback(response);
    });
  }
}
