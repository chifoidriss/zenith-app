import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from '../../shared/services/alert.service';
import { LoaderService } from '../../shared/services/loader.service';
import { APP_API_URL } from '../../../env';
import { DetailArticleComponent } from '../pages/index-article/detail-article/detail-article.component';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient, private loader: LoaderService, private alert: AlertService) { }

  statistics(callback: any, param: any) {
    const params = new HttpParams({
      fromObject: param
    });

    this.loader.start();
    this.http.get(APP_API_URL + `articles/statistics`, {params: params}).subscribe((response) => {
      this.loader.stop();
      callback(response);
    });
  }

  index(callback: any, param?: any) {
    const params = new HttpParams({
      fromObject: param
    });

    this.loader.start();
    this.http.get(APP_API_URL + 'articles', {params: params}).subscribe((response) => {
      this.loader.stop();
      callback(response);
    });
  }

  show(id: number, callback: any) {
    this.loader.start();
    this.http.get(APP_API_URL + 'articles/'+ id).subscribe((response) => {
      this.loader.stop();
      callback(response);
    });
  }

  store(data: any, callback: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    });

    this.http.post(APP_API_URL + 'articles', data, {headers: headers}).subscribe((response) => {
      callback(response);
    });
  }

  destroy(id: number, callback: any) {
    this.http.delete(APP_API_URL + 'articles/'+ id).subscribe((response) => {
      callback(response);
    });
  }

  detail(id: number) {
    this.alert.openModal(DetailArticleComponent, (response) => {
      if (response) {
        // this.data.data[index] = response;
      }
    }, {id: id}, 'full');
  }

  removePrice(id: number, callback: any) {
    this.http.delete(APP_API_URL + 'articles/remove-price/'+ id).subscribe((response) => {
      callback(response);
    });
  }

  removeMenuItem(id: number, callback: any) {
    this.http.delete(APP_API_URL + 'articles/remove-menu-item/'+ id).subscribe((response) => {
      callback(response);
    });
  }

  freeUp(id: number, callback: any) {
    this.http.get(APP_API_URL + 'articles/free-up/'+ id).subscribe((response) => {
      callback(response);
    });
  }

  dayBook(callback: any, param: any) {
    const params = new HttpParams({
      fromObject: param
    });

    this.loader.start();
    this.http.get(APP_API_URL + 'articles/day-book', {params: params}).subscribe((response) => {
      this.loader.stop();
      callback(response);
    });
  }

  checkValidity(params, callback: any) {
    this.loader.start();
    this.http.post(APP_API_URL + 'articles/check-validity', params).subscribe((response) => {
      this.loader.stop();
      callback(response);
    });
  }

  filter(callback: any, term: string, type: string) {
    const params = new HttpParams({
      fromObject: {q: term, type: type || ''}
    });

    this.http.get(APP_API_URL + 'articles/filter?q='+term, {params: params}).subscribe((response) => {
      callback(response);
    });
  }
}
