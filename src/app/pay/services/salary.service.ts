import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from '../../shared/services/alert.service';
import { LoaderService } from '../../shared/services/loader.service';
import { APP_API_URL } from '../../../env';
import { DetailSalaryComponent } from '../pages/salary/detail-salary/detail-salary.component';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {
  constructor(private http: HttpClient, private loader: LoaderService, private alert: AlertService) { }

  index(callback: any, param?) {
    const params = new HttpParams({
      fromObject: param
    });

    this.loader.start();
    this.http.get(APP_API_URL + 'paying/salaries', {params: params}).subscribe((response) => {
      this.loader.stop();
      callback(response);
    });
  }

  show(id: number, callback: any) {
    this.loader.start();
    this.http.get(APP_API_URL + 'paying/salaries/'+ id).subscribe((response) => {
      this.loader.stop();
      callback(response);
    });
  }

  store(data: any, callback: any, errorCallback?: any) {
    this.http.post(APP_API_URL + 'paying/salaries', data).subscribe({
      next: (response) => {
        callback(response);
      }, error: (error) => {
        errorCallback(error);
      }
    });
  }

  destroy(id: number, callback: any) {
    this.http.delete(APP_API_URL + 'paying/salaries/'+ id).subscribe((response) => {
      callback(response);
    });
  }

  detail(id, callback?) {
    this.alert.openModal(DetailSalaryComponent, (response) => {
      if (response) {
        callback(response);
      }
    }, {id: id}, 'full');
  }
}
