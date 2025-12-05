import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../../shared/services/alert.service';
import { InvoiceService } from '../../../services/invoice.service';
import { AddArticleComponent } from '../add-article/add-article.component';
import { PartnerService } from '../../../../partner/services/partner.service';
import { DeviseService } from '../../../services/devise.service';
import { NewPaymentComponent } from '../../index-payment/new-payment/new-payment.component';
import { Location } from '@angular/common';
import { PaymentService } from '../../../../invoice/services/payment.service';
import { RestService } from '../../../../shared/services/rest.service';

@Component({
  selector: 'app-new-invoice',
  standalone: false,
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.scss']
})
export class NewInvoiceComponent {
  id: string = '';
  type: string = '';
  invoice_type: string = '';
  title: string = '';
  form: FormGroup = new FormGroup({});
  invoice: any;
  items: any[] = [];
  payments: any[] = [];
  partners: any[] = [];
  devises: any[] = [];
  loading: boolean = true;
  onLoad = false;

  constructor(private alert: AlertService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private invoiceService: InvoiceService,
    private partnerService: PartnerService,
    private deviseService: DeviseService,
    private paymentService: PaymentService,
    private restService: RestService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(result => {
      this.loading = true;
      this.initForm();

      this.type = result['type'];
      this.invoice_type = result['invoice_type'];
      this.id = result['id'];

      if (this.invoice_type == 'invoices') {
        this.title = 'facture ';
      } else if(this.invoice_type == 'refunds') {
        this.title = 'avoir ';
      }

      if (this.type == 'clients') {
        this.title += 'client';
      } else if(this.type == 'suppliers') {
        this.title += 'fournisseur';
      } else if(this.type == 'salaries') {
        this.title += 'employé';
      } else if(this.type == 'bar') {
        this.title += 'bar';
      } else if(this.type == 'hosting') {
        this.title += 'hébergement';
      } else if(this.type == 'restaurant') {
        this.title += 'restaurant';
      }

      if (this.id) {
        this.invoiceService.show(this.id, response => {
          this.invoice = response;
          this.initForm(this.invoice);
        }, this.invoice_type, this.type);
      }

      this.partnerService.index((response) => {
        this.partners = response.data;
      }, (this.type == 'suppliers'?'suppliers':'clients'));

      this.deviseService.index((response) => {
        this.devises = response.data;
        if(this.devises.length == 1) {
          this.form.get('devise_id')?.setValue(this.devises[0].id);
        }
      });
    });
  }

  initForm(defaultData?: any) {
    // const data: any = defaultData || JSON.parse(localStorage.getItem('draft.invoice') || '{}');
    const data: any = defaultData;
    const d = new Date().toISOString();
    const now = d.substring(0, d.indexOf('T'));

    this.form = this.formBuilder.group({
      id: [data?.id],
      partner_id: [data?.partner_id, [Validators.required]],
      devise_id: [data?.devise_id, [Validators.required]],
      billing_date: [data?.billing_date || now],
      due_date: [data?.due_date || now],
      subtotal: [data?.subtotal || '0', Validators.required],
      total: [data?.total || '0', Validators.required],
      due_amount: [data?.due_amount || '0', Validators.required],
    });
    this.items = data?.items || [];
    this.payments = data?.payments || [];

    this.loading = false;
  }

  store() {
    this.onLoad = true;
    this.invoiceService.store({...this.form.value, ...{items: this.items}}, (response) => {
      localStorage.setItem('draft.invoice', '{}');
      this.onLoad = false;
      // this.location.back();
      this.router.navigate(['/invoicing/'+this.invoice_type+'/'+this.type]);
    }, this.invoice_type, this.type);
  }

  validate() {
    this.invoiceService.confirm(this.id, {}, (response) => {
      this.location.back();
    }, this.invoice_type, this.type);
  }

  print() {
    this.restService.printToPDF('invoice', this.id, () => {
      // this.dialogRef.close();
    });
  }

  addPayment() {
    this.alert.openModal(NewPaymentComponent, (result) => {
      if (result) {
        this.initForm(result.invoice);
      }
    }, {invoice_type: this.invoice_type, type: this.type, invoice: this.invoice});
  }

  addItem() {
    this.alert.openModal(AddArticleComponent, (result) => {
      if (result) {
        this.items.push(result);
        this.getTotal();
      }
    }, {type: this.type});
  }

  removeItem(index: number, item: any) {
    this.alert.confirm(result => {
      if (result) {
        if (item.id) {
          this.invoiceService.removeItem(item.id, (response) => {
            this.items.splice(index, 1);
            this.getTotal();
          }, this.invoice_type, this.type);
        } else {
          this.items.splice(index, 1);
          this.getTotal();
        }
      }
    });
  }

  editItem(index: number, item: any) {
    this.alert.openModal(AddArticleComponent, (result) => {
      if (result) {
        this.items[index] = result;
        this.getTotal();
      }
    }, {...item, ...{type: this.type}});
  }

  getTotal() {
    let total = 0;
    this.items.forEach(item => {
      total += item.subtotal;
    });
    this.form.get('subtotal')?.setValue(total);
    this.form.get('total')?.setValue(total);
  }

  duplicateInvoice(refunding = false) {
    this.loading = true;
    let redirect_invoice_type = '';
    let data = {};
    if (refunding) {
      redirect_invoice_type = this.invoice_type == 'invoices' ? 'refunds': 'invoices';
      data = {refunding: true};
    } else {
      redirect_invoice_type = this.invoice_type;
    }
    this.invoiceService.duplicate(this.id, data, (response) => {
      this.router.navigate(['/invoicing/'+redirect_invoice_type+'/'+this.type+'/edit/'+response.id]);
      this.loading = false;
    }, this.invoice_type, this.type);
  }

  invalid() {
    const data = {...this.form.value, ...{items: this.items}, ...{payments: this.payments}}
    localStorage.setItem('draft.invoice', JSON.stringify(data));
    return this.form.invalid || this.items.length == 0 || this.onLoad || this.invoice?.status;
  }

  detailPayment(id) {
    this.paymentService.detail(id);
  }

  createPartner = (name) => {
    this.router.navigate([`/partners/${this.type == 'suppliers'?'suppliers':'clients'}/new`]);
  }

  filterPartners(event) {
    this.partnerService.filter((data) => {
      this.partners = data;
    }, event.term, this.type == 'suppliers'?'suppliers':'clients');
  }
}
