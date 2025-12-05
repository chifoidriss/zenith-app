import { Component, Input } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { MENU } from '../../../../env';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() links = MENU.filter(elt => this.auth.can(elt.permissions));
  @Input() name: string = '';

  constructor(public auth: AuthService) {}

  toggleMenu(elt) {
    $('.nav-item.opening').removeClass('opening');
    $(elt.srcElement.parentElement).toggleClass('opening');
  }
}
