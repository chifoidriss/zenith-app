import { AfterViewInit, Component, Input } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { Platform } from '@angular/cdk/platform';
import { MENU } from '../../../../env';

@Component({
  selector: 'app-tabs',
  standalone: false,
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements AfterViewInit {
  @Input() links: any[] = [];
  prevScrollPos: number;
  menu = MENU;

  constructor(public config: ConfigService, public platform: Platform) {}

  ngAfterViewInit(): void {
    if (this.platform.ANDROID || this.platform.IOS) {
      /* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
      this.prevScrollPos = window.screenY || document.documentElement.scrollTop;
      window.onscroll = () => {
        const currentScrollPos = window.screenY || document.documentElement.scrollTop;
        if (this.prevScrollPos > currentScrollPos) {
          $(".tabs, .navbar").removeClass('hide');
        } else {
          $(".tabs, .navbar").addClass('hide');
        }
        this.prevScrollPos = currentScrollPos;
      }
    }
  }

  openMenu(input) {
    $('.sidebar').toggleClass('open');
    $(input).toggleClass('active');
  }
}
