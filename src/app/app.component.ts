import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from './auth/services/auth.service';
import { ConfigService } from './shared/services/config.service';
import { RestService } from './shared/services/rest.service';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  scrollingPositon = 0;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              public auth: AuthService,
              public rest: RestService,
              private config: ConfigService) { }

  ngAfterViewInit(): void {
    // Scroll to Top
    // document.getElementById('page-content')?.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe(() => {
      const childRoute = this.getChild(this.activatedRoute);
      childRoute.data.subscribe((data: any) => {
        this.config.setTitle(data.title);
      });
    });

    // this.rest.getSociety();
  }

  getChild(activatedRoute: ActivatedRoute): any {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    }
    else {
      return activatedRoute;
    }
  }

  closeViewer() {
    $('.pdf-viewer').hide();
    $('.pdf-viewer .viewer').removeAttr('src');
  }
}
