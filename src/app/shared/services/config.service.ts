import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { APP, APP_NAME } from '../../../env';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  apps = APP;

  constructor(private router: Router, private titleService: Title, private metaService: Meta) { }

  get isConnect(): boolean {
    let token = this.token;
    let user = this.user;
    return (token && user)?true:false;
  }

  get token(): any {
    return localStorage.getItem('token');
  }
  set token(value: string) {
    localStorage.setItem('token', value);
  }

  get user(): any {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }
  set user(value) {
    localStorage.setItem('user', JSON.stringify(value));
  }

  setTitle(title?: string) {
    // const fullTitle = title ? (title + ' | '+APP_NAME):ADPP_NAME;
    const fullTitle = title ||'';
    this.titleService.setTitle(fullTitle);
  }

  setMeta(name: string, content: string) {
    this.metaService.addTag({
      name: name,
      content: content,
    });
  }
}
