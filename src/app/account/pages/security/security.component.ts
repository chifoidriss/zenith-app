import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { EditPasswordComponent } from '../../components/edit-password/edit-password.component';
import { AlertService } from '../../../shared/services/alert.service';

@Component({
  selector: 'app-security',
  standalone: false,
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent {
  constructor(public auth: AuthService, private alert: AlertService) {}

  editPassword() {
    this.alert.openModal(EditPasswordComponent, (result) => {

    }, this.auth.user);
  }
}
