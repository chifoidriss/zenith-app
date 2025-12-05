import { Component } from '@angular/core';
import { ArticleService } from '../../../article/services/article.service';
import { Paginate } from '../../../shared/models/paginate';
import { AlertService } from '../../../shared/services/alert.service';

@Component({
  selector: 'app-menus',
  standalone: false,
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss']
})
export class MenusComponent {
  data: Paginate = new Paginate();
  loading = true;

  constructor(public alert: AlertService, private articleService: ArticleService) {
  }

  ngOnInit() {
    this.loading = true;
    this.articleService.index(response => {
      this.data = response;
      this.loading = false;
    }, {type: 'MENU'});
  }
}
