import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-verify-email',
  standalone: false,
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent {
  status: string;

  constructor(public auth: AuthService) {}

  onSubmit() {
    this.auth.sendVerificationMail(response => {
      this.status = response.status;
    });
  }
}
