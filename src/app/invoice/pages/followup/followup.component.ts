import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Paginate } from '../../../shared/models/paginate';
import { AlertService } from '../../../shared/services/alert.service';
import { InvoiceService } from '../../services/invoice.service';
import { DetailPartnerComponent } from '../../../partner/pages/index-partner/detail-partner/detail-partner.component';
import { DetailFollowComponent } from './detail-follow/detail-follow.component';

@Component({
  selector: 'app-followup',
  standalone: false,
  templateUrl: './followup.component.html',
  styleUrls: ['./followup.component.scss']
})
export class FollowupComponent {
  data: Paginate = new Paginate();
  type: string = '';
  title: string = '';
  loading: boolean = true;
  params = {
    source: '',
    form_date: '',
    to_date: '',
    date: 'week',
    follow: 'due',
  }

  constructor(private alert: AlertService,
    private invoiceService: InvoiceService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(result => {
      this.loading = true;
      this.type = result['type'];
      if (this.type == 'clients') {
        this.title += 'clients';
      } else if(this.type == 'suppliers') {
        this.title += 'fournisseurs';
      } else if(this.type == 'salaries') {
        this.title += 'employés';
      } else if(this.type == 'bar') {
        this.title += 'bar';
      } else if(this.type == 'hosting') {
        this.title += 'hébergement';
      } else if(this.type == 'restaurant') {
        this.title += 'restaurant';
      } else {
        this.title += 'tout';
      }

      this.invoiceService.followup((response) => {
        this.data = response;
        this.loading = false;
        // console.log(response);
      }, this.type, this.params);
    });
  }

  detailPartner(item) {
    this.alert.openModal(DetailFollowComponent, (response) => {
      // if (response) {
      //   this.data.data[index] = response;
      // }
    }, item, 'full');
  }

  total(invoices: any[]) {
    let total = 0;
    invoices?.forEach(elt => {
      total += elt.total;
    });
    return total;
  }
}
