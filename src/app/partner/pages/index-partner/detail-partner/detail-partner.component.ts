import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NewPaymentComponent } from '../../../../invoice/pages/index-payment/new-payment/new-payment.component';
import { DetailInvoiceComponent } from '../../../../invoice/pages/invoice/detail-invoice/detail-invoice.component';
import { InvoiceService } from '../../../../invoice/services/invoice.service';
import { PartnerService } from '../../../../partner/services/partner.service';
import { AlertService } from '../../../../shared/services/alert.service';

@Component({
  selector: 'app-detail-partner',
  standalone: false,
  templateUrl: './detail-partner.component.html',
  styleUrls: ['./detail-partner.component.scss']
})
export class DetailPartnerComponent {
  partner: any;
  loading: boolean = true;
  invoices: any[] = [];
  total = 0;
  due_amount = 0;
  paid_amount = 0;
  due_amount_refund = 0;
  paid_amount_refund = 0;
  paid = 0;
  due = 0;

  constructor(private alert: AlertService,
    private partnerService: PartnerService,
    private invoiceService: InvoiceService,
    private router: Router,
    public dialogRef: MatDialogRef<DetailPartnerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.partnerService.show(this.data?.id, response => {
      this.partner = response;

      this.total = 0;
      this.paid_amount = 0;
      this.partner.invoices.forEach(elt => {
        if (elt.type == 'INVOICE') {
          this.due_amount += elt.due_amount;
          this.paid_amount += elt.paid_amount;
        } else if (elt.type == 'REFUND') {
          this.due_amount_refund += elt.due_amount;
          this.paid_amount_refund += elt.paid_amount;
        }
      });
      this.loading = false;
    }, this.data?.type);
  }

  detailInvoice(item, index) {
    this.alert.openModal(DetailInvoiceComponent, (response) => {
      if (response) {
        // this.partner.invoices[index] = response;
      }
    }, {invoice_type: item.type=='INVOICE'?'invoices':'refunds', type: this.data?.type, id: item.id}, 'full');
  }

  addPayment(item, index) {
    this.alert.openModal(NewPaymentComponent, (response) => {
      if (response) {
        // this.partner.invoices[index].due_amount -= response.amount;
        // this.partner.invoices[index].paid_amount += response.amount;
        this.ngOnInit();
      }
    }, {invoice_type: item.type=='INVOICE'?'invoices':'refunds', type: this.data?.type, invoice: item});
  }

  validate(item, index) {
    this.invoiceService.confirm(item.id, {}, (response) => {
      if (response) {
        this.data.data[index].status = true;
      }
    }, item.type=='INVOICE'?'invoices':'refunds', this.data?.type);
  }

  filter(type?: string): any[] {
    if (this.partner?.invoices) {
      if(type == 'unpaid') {
        return this.partner.invoices.filter(elt => elt.due_amount > 0);
      } else if(type == 'paid') {
        return this.partner.invoices.filter(elt => elt.due_amount == 0);
      }
    }
    return [];
  }
}
