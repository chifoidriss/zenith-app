import { Component, Input } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { APP_NAME } from '../../../../env';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  @Input() hasBg = true;
  @Input() canHide = false;
  APP_NAME = APP_NAME;
  current_date = new Date();

  constructor(public auth: AuthService) {}
}
