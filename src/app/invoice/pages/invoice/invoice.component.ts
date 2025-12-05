import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Paginate } from '../../../shared/models/paginate';
import { AlertService } from '../../../shared/services/alert.service';
import { InvoiceService } from '../../services/invoice.service';
import { NewPaymentComponent } from '../index-payment/new-payment/new-payment.component';
import { DetailInvoiceComponent } from '../invoice/detail-invoice/detail-invoice.component';
import { DetailPartnerComponent } from '../../../partner/pages/index-partner/detail-partner/detail-partner.component';
import { RestService } from '../../../shared/services/rest.service';
import { ErrorInvoiceComponent } from './error-invoice/error-invoice.component';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-invoice',
  standalone: false,
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent {
  data: Paginate = new Paginate();
  type: string = '';
  invoice_type: string = '';
  title: string = '';
  loading: boolean = true;
  filter = false;
  params = {
    order: 'updated_at',
    form_date: '',
    to_date: '',
    invoice_status: '',
    payment_status: '',
    by: 'DESC',
  }
  canWrite = false;

  constructor(private alert: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private invoiceService: InvoiceService,
    private restService: RestService,
    private auth: AuthService,
  ) { }

  ngAfterViewInit() {
    $('.form-group .form-control').on('focus blur change', function (e) {
      const val: any = $(this).val() || [];
      $(this).parents('.form-group').toggleClass('focused', (e.type === 'focus' || val.length > 0));
    }).trigger('blur');
  }

  ngOnInit(): void {
    this.route.params.subscribe(result => {
      this.type = result['type'];
      this.invoice_type = result['invoice_type'];
      this.canWrite = false;

      if (this.invoice_type == 'invoices') {
        this.title = 'Factures ';
      } else if(this.invoice_type == 'refunds') {
        this.title = 'Avoirs ';
      }

      if (this.type == 'clients') {
        this.title += 'clients';
      } else if(this.type == 'suppliers') {
        this.canWrite = this.auth.can(['PURCHASE_W']);
        this.title += 'fournisseurs';
      } else if(this.type == 'salaries') {
        this.canWrite = this.auth.can(['PAY_RH_W']);
        this.title += 'employés';
      } else if(this.type == 'bar') {
        this.canWrite = this.auth.can(['BAR_W']);
        this.title += 'bar';
      } else if(this.type == 'hosting') {
        this.canWrite = this.auth.can(['HOSTING_W']);
        this.title += 'hébergement';
      } else if(this.type == 'restaurant') {
        this.canWrite = this.auth.can(['RESTAURANT_W']);
        this.title += 'restaurant';
      } else if(this.type == 'entries') {
        this.title += '';
      }

      this.getInvoices();
    });
  }

  getInvoices() {
    this.loading = true;
    this.invoiceService.index((response) => {
      this.data = response;
      this.loading = false;
    }, this.invoice_type, this.type, this.params);
    this.filter = false;
  }

  removeItem(index: number, item: any) {
    this.alert.confirm(result => {
      if (result) {
        if (item.id) {
          this.invoiceService.destroy(item.id, (response) => {
            this.data.data.splice(index, 1);
          }, this.invoice_type, this.type);
        }
      }
    });
  }

  addPayment(item, index) {
    this.alert.openModal(NewPaymentComponent, (response) => {
      if (response) {
        this.data.data[index].due_amount -= response.amount;
        this.data.data[index].paid_amount += response.amount;
      }
    }, {invoice_type: this.invoice_type, type: this.type, invoice: item});
  }

  detailInvoice(id, index) {
    this.alert.openModal(DetailInvoiceComponent, (response) => {
      if (response) {
        this.data.data[index] = response;
      }
    }, {invoice_type: this.invoice_type, type: this.type, id: id}, 'full');
  }

  duplicateInvoice(id, refunding = false) {
    let redirect_invoice_type = '';
    let data = {};
    if (refunding) {
      redirect_invoice_type = this.invoice_type == 'invoices' ? 'refunds': 'invoices';
      data = {refunding: true};
    } else {
      redirect_invoice_type = this.invoice_type;
    }
    this.invoiceService.duplicate(id, data,(response) => {
      this.router.navigate(['/invoicing/'+redirect_invoice_type+'/'+this.type+'/edit/'+response.id]);
    }, this.invoice_type, this.type);
  }

  addRefund(item) {
    this.router.navigate(['/invoicing/'+this.invoice_type+'/'+this.type+'/edit/'+item.id])
  }

  validate(id, index, btn) {
    $(btn).find('span.spinner-border').removeClass('d-none');
    $(btn).attr('disabled', 'true');

    this.invoiceService.confirm(id, {}, (response) => {
      $(btn).find('span.spinner-border').addClass('d-none');
      $(btn).removeAttr('disabled');

      if (response) {
        if(response.is_valid) {
          this.data.data[index].status = true;
        } else {
          this.alert.openModal(ErrorInvoiceComponent, (data) => {
          }, response);
        }
      }
    }, this.invoice_type, this.type, error => {
      $(btn).find('span.spinner-border').addClass('d-none');
      $(btn).removeAttr('disabled');
    });
  }

  detailPartner(id, index) {
    this.alert.openModal(DetailPartnerComponent, (response) => {
    }, {type: this.type, id: id}, 'full');
  }

  export() {
    this.restService.tableToExcel('invoices', 'invoices');
  }
}
