import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { EditSettingAppComponent } from '../../components/edit-setting-app/edit-setting-app.component';
import { AlertService } from '../../../shared/services/alert.service';
import { EditPasswordComponent } from '../../components/edit-password/edit-password.component';

@Component({
  selector: 'app-setting',
  standalone: false,
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent {
  constructor(public auth: AuthService, private alert: AlertService) {}

  editSetting() {
    this.alert.openModal(EditSettingAppComponent, (result) => {

    }, this.auth.user);
  }

  editPassword() {
    this.alert.openModal(EditPasswordComponent, (result) => {

    }, this.auth.user);
  }
}
