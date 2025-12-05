import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Paginate } from '../../../shared/models/paginate';
import { AlertService } from '../../../shared/services/alert.service';
import { PaymentService } from '../../services/payment.service';
import { DetailInvoiceComponent } from '../invoice/detail-invoice/detail-invoice.component';
import { DetailPartnerComponent } from '../../../partner/pages/index-partner/detail-partner/detail-partner.component';
import { PaymentMethodService } from '../../services/payment-method.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-index-payment',
  standalone: false,
  templateUrl: './index-payment.component.html',
  styleUrls: ['./index-payment.component.scss']
})
export class IndexPaymentComponent {
  data: Paginate = new Paginate();
  type: string = '';
  title: string = '';
  loading: boolean = true;
  payment_methods: any[] = [];
  params = {
    sens: '',
    source: '',
    payment_method: '',
    form_date: '',
    to_date: '',
    date: 'week',
  }
  canWrite = false;

  constructor(private alert: AlertService,
    private route: ActivatedRoute,
    private paymentService: PaymentService,
    private auth: AuthService,
    private paymentMethodService: PaymentMethodService,
  ) { }


  ngOnInit(): void {
    this.paymentMethodService.index(response => {
      this.payment_methods = response.data;
    });

    this.route.params.subscribe(result => {
      this.loading = true;
      this.type = result['type'];
      this.params.source = result['type'];
      this.canWrite = false;

      if (this.type == 'clients') {
        this.title = 'clients';
      } else if(this.type == 'suppliers') {
        this.canWrite = this.auth.can(['PURCHASE_W']);
        this.title = 'fournisseurs';
      } else if(this.type == 'salaries') {
        this.canWrite = this.auth.can(['PAY_RH_W']);
        this.title = 'employés';
      } else if(this.type == 'bar') {
        this.canWrite = this.auth.can(['BAR_W']);
        this.title = 'bar';
      } else if(this.type == 'hosting') {
        this.canWrite = this.auth.can(['HOSTING_W']);
        this.title = 'hébergement';
      } else if(this.type == 'restaurant') {
        this.canWrite = this.auth.can(['RESTAURANT_W']);
        this.title = 'restaurant';
      } else if(this.type == 'entries') {
        this.title = '';
      }

      this.paymentService.index((response) => {
        this.data = response;
        this.loading = false;
      }, this.type, this.params);
    });
  }

  removeItem(index: number, item: any) {
    this.alert.confirm(result => {
      if (result) {
        this.data.data.splice(index, 1);
        if (item.id) {
          this.paymentService.destroy(item.id, (response) => {}, this.type);
        }
      }
    });
  }

  cancel(item: any) {
    this.alert.confirm(result => {
      if (result) {
        this.paymentService.cancel(item.id, (response) => {
          this.data.data.unshift(response);
        }, this.type);
      }
    });
  }

  detailInvoice(invoice, index) {
    this.alert.openModal(DetailInvoiceComponent, (response) => {
      if (response) {
        this.data.data[index] = response;
      }
    }, {invoice_type: invoice.type == 'INVOICE'?'invoices':'refunds', type: this.type, id: invoice.id}, 'full');
  }

  detailPartner(id, index) {
    this.alert.openModal(DetailPartnerComponent, (response) => {
    }, {type: this.type, id: id}, 'full');
  }

  detailPayment(id) {
    this.paymentService.detail(id);
  }

  // canWrite() {
  //   if(this.type != 'entries') {
  //     if(this.type == '')
  //     return this.auth.can(['HOSTING_W','BAR_W','RESTAURANT_W']);
  //   }
  //   return false;
  // }

  print(id: number) {
    this.paymentService.print(id, this.type);
  }
}
