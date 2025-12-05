import { Component } from '@angular/core';
import {AlertService} from "../../../shared/services/alert.service";
import { Paginate } from '../../../shared/models/paginate';
import { ArticleService } from '../../../article/services/article.service';
import { DatePipe } from '@angular/common';
import { RestService } from '../../../shared/services/rest.service';

@Component({
  selector: 'app-day-book',
  standalone: false,
  templateUrl: './day-book.component.html',
  styleUrls: ['./day-book.component.scss']
})
export class DayBookComponent {
  data: Paginate = new Paginate();
  loading = true;
  params = {
    date: new DatePipe('en-US').transform(new Date(), 'yyyy-MM'),
  }
  months: any[] = [];

  constructor(public alert: AlertService,
    private restService: RestService,
    private articleService: ArticleService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.articleService.dayBook(response => {
      this.data = response.data;
      this.months = response.months;
      this.loading = false;
      // console.log(response);
    }, this.params);
  }

  plane(item: any, date) {
    let items: any[] = [];

    item.invoice_items.forEach(elt => {
      items.push(...elt.dates);
    });

    return items.includes(date);
  }

  plane1(item: any, date) {
    let items: any[] = item.invoice_items;
    let res = 0;

    let cs_date: string = '';
    let ce_date: string = '';
    if (item.current_room) {
      cs_date = item.current_room.start_date;
      ce_date = item.current_room.end_date;
    }

    for (let i = 0; i < items.length; i++) {
      const elt = items[i];
      const d = new Date(date);
      d.setHours(12,0,0,0);
      let s_date = new Date(elt.start_date);
      let e_date = new Date(elt.end_date);

      // console.log(d+' [:] '+s_date+' [:] '+e_date);

      if (elt.status) {
        if (d >= s_date && d <= e_date) {
          if (cs_date == elt.start_date && ce_date == elt.end_date) {
            res = 2;
          } else {
            res = 1
          }
        }
      }
    }
    return res;
  }

  export() {
    this.restService.tableToExcel('data', 'main-courante');
  }

}
