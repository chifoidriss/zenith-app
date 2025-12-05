import { Platform } from '@angular/cdk/platform';
import { Component, Input } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { APP, APP_NAME } from '../../../../env';
import { ConfigService } from '../../services/config.service';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-master',
  standalone: false,
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent {
  @Input() name: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() header: boolean = true;
  links: any[] = [];
  APP_NAME = APP_NAME;
  apps = APP;

  constructor(public auth: AuthService,
    public platform: Platform,
    public loader: LoaderService,
    private config: ConfigService
  ) {}

  ngOnInit() {
    this.config.setTitle(this.title);
    this.config.setMeta('description', this.description);
  }

}
