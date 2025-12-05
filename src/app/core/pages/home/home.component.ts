import { Platform } from '@angular/cdk/platform';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { LoaderService } from '../../../shared/services/loader.service';
import { APP, APP_NAME, MENU } from '../../../../env';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  APP_NAME = APP_NAME;
  apps = APP;
  menu = MENU.filter(elt => this.auth.can(elt.permissions));
  isWeb = true;
  isMobile = true;

  heros = [
    'assets/svg/05.svg',
    'assets/svg/02.svg',
    'assets/svg/04.svg',
    'assets/svg/06.svg',
    'assets/svg/07.svg',
    'assets/svg/08.svg',
    'assets/svg/10.svg',
    'assets/svg/16.svg',
  ];

  constructor(
    public loader: LoaderService,
    public auth: AuthService,
    public platform: Platform
  ) {}

  ngOnInit() {
    this.loader.start();
    this.isWeb = this.platform.BLINK || this.platform.EDGE || this.platform.FIREFOX || this.platform.SAFARI;
    this.isMobile = this.platform.ANDROID || this.platform.IOS;
  }

  ngAfterViewInit(): void {
    // setInterval(() => {
    //   $('.hero img').attr('src', this.heros[this.randomIntFromInterval(0, (this.heros.length-1))]);
    // }, 5000);
  }

  private randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
}
