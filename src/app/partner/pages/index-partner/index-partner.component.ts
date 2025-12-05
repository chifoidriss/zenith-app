import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Paginate } from '../../../shared/models/paginate';
import { AlertService } from '../../../shared/services/alert.service';
import { PartnerService } from '../../services/partner.service';
import { DetailPartnerComponent } from './detail-partner/detail-partner.component';
import { RestService } from '../../../shared/services/rest.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-index-partner',
  standalone: false,
  templateUrl: './index-partner.component.html',
  styleUrls: ['./index-partner.component.scss']
})
export class IndexPartnerComponent {
  data: Paginate = new Paginate();
  type: string = '';
  title: string = '';
  loading: boolean = true;

  constructor(private alert: AlertService,
    private partnerService: PartnerService,
    private restService: RestService,
    private auth: AuthService,
    private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.route.params.subscribe(result => {
      this.loading = true;
      this.type = result['type'];
      if (this.type == 'clients') {
        this.title = 'Clients';
      } else if(this.type == 'suppliers') {
        this.title = 'Fournisseurs';
      } else if(this.type == 'salaries') {
        this.title = 'Employés';
      }
      this.partnerService.index((response) => {
        this.data = response;
        this.loading = false;
      }, this.type);
    });
  }

  removeItem(index: number, item: any) {
    this.alert.confirm(result => {
      if (result) {
        this.data.data.splice(index, 1);
        if (item.id) {
          this.partnerService.destroy(item.id, (response) => {}, this.type);
        }
      }
    });
  }

  detailPartner(id, index) {
    this.alert.openModal(DetailPartnerComponent, (response) => {
    }, {type: this.type, id: id}, 'full');
  }

  canWrite() {
    return this.auth.can(['HOSTING_W','BAR_W','RESTAURANT_W', 'PAY_RH_W']);
  }

  export() {
    this.restService.tableToExcel('invoices', 'invoices');
  }
}
