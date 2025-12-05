import { Component } from '@angular/core';
import {AlertService} from "../../../shared/services/alert.service";
import { Paginate } from '../../../shared/models/paginate';
import { ArticleService } from '../../../article/services/article.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-room',
  standalone: false,
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent {
  data: Paginate = new Paginate();
  loading = true;

  constructor(public alert: AlertService,
    private articleService: ArticleService,
    public auth: AuthService,
  ) {}

  ngOnInit() {
    this.loading = true;
    this.articleService.index(response => {
      this.data = response;
      this.loading = false;
    }, {type: 'ROOM'});
  }

  freeUp(room: any) {
    this.alert.confirm(result => {
      if (result) {
        this.articleService.freeUp(room.id, response => {
          room.status = response.status;
        });
      }
    });
  }
}
