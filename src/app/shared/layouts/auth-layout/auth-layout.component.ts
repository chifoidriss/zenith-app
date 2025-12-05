import { Component, Input } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { APP_NAME } from '../../../../env';
import { AlertService } from '../../services/alert.service';
import { ApiInfoComponent } from './api-info/api-info.component';

@Component({
  selector: 'app-auth-layout',
  standalone: false,
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent {
  @Input() name: string = '';
  @Input() title: string = '';
  APP_NAME = APP_NAME;
  API_URL;
  API_NAME;

  constructor(public auth: AuthService, private alert: AlertService) {}

  ngOnInit() {
    this.API_URL = localStorage.getItem('API_URL');
    this.API_NAME = localStorage.getItem('API_NAME');
  }

  changeApiInfo() {
    this.alert.openModal(ApiInfoComponent, (form) => {
      this.API_NAME = form.name;
      this.API_URL = form.url;

      localStorage.setItem('API_NAME', this.API_NAME);
      localStorage.setItem('API_URL', this.API_URL);

      location.reload();
    }, {name: this.API_NAME, url: this.API_URL}, 'sm');
  }
}
