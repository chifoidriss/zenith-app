import { Component } from '@angular/core';
import {AlertService} from "../../../shared/services/alert.service";
import { Paginate } from '../../../shared/models/paginate';
import { ArticleService } from '../../../article/services/article.service';

@Component({
  selector: 'app-index-bar',
  standalone: false,
  templateUrl: './index-bar.component.html',
  styleUrls: ['./index-bar.component.scss']
})
export class IndexBarComponent {
  data: Paginate = new Paginate();
  loading = true;

  constructor(public alert: AlertService, private articleService: ArticleService) {
  }

  ngOnInit() {
    this.loading = true;
    this.articleService.index(response => {
      this.data = response;
      this.loading = false;
    }, {type: 'bar'});
  }
}
