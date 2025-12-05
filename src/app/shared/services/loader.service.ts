import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  loading = false;
  hasError = false;

  constructor() { }

  start() {
    this.loading = true;
    this.hasError = false;
  }

  stop() {
    this.loading = false;
  }
}
