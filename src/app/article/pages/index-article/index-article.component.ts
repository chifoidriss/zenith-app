import { Component } from '@angular/core';
import { Paginate } from '../../../shared/models/paginate';
import { AlertService } from '../../../shared/services/alert.service';
import { ArticleService } from '../../services/article.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-index-article',
  standalone: false,
  templateUrl: './index-article.component.html',
  styleUrls: ['./index-article.component.scss']
})
export class IndexArticleComponent {
  data: Paginate = new Paginate();
  loading: boolean = true;
  type = 'all';

  constructor(public alert: AlertService,
    private articleService: ArticleService,
    public auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.loadArticles('all');
  }

  removeItem(index: number, item: any) {
    this.alert.confirm(result => {
      if (result) {
        this.data.data.splice(index, 1);
        if (item.id) {
          this.articleService.destroy(item.id, (response) => {});
        }
      }
    });
  }

  loadArticles(type: string) {
    this.loading = true;
    this.articleService.index(response => {
      this.data = response;
      this.loading = false;
    }, {type: type});
    this.type = type;
  }

  showType(type: string) {
    if(type == 'CONSUMABLE') {
      return 'Consommables';
    } else if(type == 'STOCKABLE') {
      return 'Stockable';
    } else if(type == 'ROOM') {
      return 'Chambres';
    } else if(type == 'SERVICE') {
      return 'Services';
    } else if(type == 'MENU') {
      return 'Menu';
    }
    return 'Tout';
  }
}
