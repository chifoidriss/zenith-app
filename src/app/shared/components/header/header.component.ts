import { Component, Input } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { APP_NAME, MENU } from '../../../../env';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() logo;
  @Input() apps: any[] = [];
  @Input() appName: string;
  APP_NAME = APP_NAME;
  @Input() links: any[] = [];

  sideLinks = MENU.filter(elt => this.auth.can(elt.permissions));

  constructor(public auth: AuthService, public config: ConfigService) {}

  ngOnInit() {
    this.apps = this.apps.filter(elt => elt.status == true);
  }

  openMenu() {
    $('.sidebar').toggleClass('open');
  }

  minimize() {
    document.exitFullscreen()
  }
  maximize() {
    document.documentElement.requestFullscreen()
  }

  close() {
    // window.close();
    document.close();
  }
}
