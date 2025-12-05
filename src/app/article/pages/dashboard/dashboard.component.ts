import { Component } from '@angular/core';
import { AlertService } from '../../../shared/services/alert.service';
import { ArticleService } from '../../services/article.service';
import { Paginate } from '../../../shared/models/paginate';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  data: Paginate = new Paginate();
  loading = true;
  params = {
    form_date: '',
    to_date: '',
    date: 'week',
    source: '',
    type: '',
  }

  constructor(public alert: AlertService,
    private articleService: ArticleService,
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.articleService.statistics(response => {
      this.data = response;
      this.loading = false;
    }, this.params);
  }

  unit(article) {
    const g = Math.ceil(article.invoice_items_sum_qty/article.invoice_items[0].unit?.unity || 1);
    // const u = article.invoice_items_sum_qty % article.invoice_items[0].unit?.unity || 1;
    // return g + ' ' +article.invoice_items[0].unit?.name+' & '+u+' Unités';
    return g + ' ' +article.invoice_items[0].unit?.name;
  }

}
