import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { EditAccountComponent } from '../../components/edit-account/edit-account.component';
import { EditProfileComponent } from '../../components/edit-profile/edit-profile.component';
import { EditInformationComponent } from '../../components/edit-information/edit-information.component';
import { AlertService } from '../../../shared/services/alert.service';

@Component({
  selector: 'app-profile-setting',
  standalone: false,
  templateUrl: './profile-setting.component.html',
  styleUrls: ['./profile-setting.component.scss']
})
export class ProfileSettingComponent {

  constructor(public auth: AuthService, private alert: AlertService) {}

  ngOnInit() {
  }

  editProfile() {
    this.alert.openModal(EditProfileComponent, (result) => {

    }, this.auth.user);
  }

  editInformation() {
    this.alert.openModal(EditInformationComponent, (result) => {

    }, this.auth.user);
  }

  editAccount() {
    this.alert.openModal(EditAccountComponent, (result) => {

    }, this.auth.user);
  }
}
