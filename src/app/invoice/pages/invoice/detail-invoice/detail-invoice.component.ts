import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InvoiceService } from '../../../services/invoice.service';
import { AlertService } from '../../../../shared/services/alert.service';
import { NewPaymentComponent } from '../../index-payment/new-payment/new-payment.component';
import { Router } from '@angular/router';
import { PaymentService } from '../../../../invoice/services/payment.service';
import { RestService } from '../../../../shared/services/rest.service';

@Component({
  selector: 'app-detail-invoice',
  standalone: false,
  templateUrl: './detail-invoice.component.html',
  styleUrls: ['./detail-invoice.component.scss']
})
export class DetailInvoiceComponent {
  invoice: any;
  loading: boolean = true;
  onDuplicate = false;
  onRefund = false;

  constructor(public alert: AlertService,
    private invoiceService: InvoiceService,
    private paymentService: PaymentService,
    private restService: RestService,
    private router: Router,
    public dialogRef: MatDialogRef<DetailInvoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.invoiceService.show(this.data?.id, response => {
      this.invoice = response;
      this.loading = false;
    }, this.data?.invoice_type, this.data?.type);
  }

  validate() {
    this.invoiceService.confirm(this.data.id, {}, (response) => {
      this.invoice.status = true;
    }, this.data?.invoice_type, this.data?.type);
  }

  print() {
    this.restService.printToPDF('invoice', this.data?.id, () => {
      this.dialogRef.close();
    });
  }

  addPayment() {
    this.alert.openModal(NewPaymentComponent, (response) => {
      if (response) {
        this.invoice.due_amount -= response.amount;
        this.invoice.paid_amount += response.amount;
        this.invoice.payments.push(response);
      }
    }, {invoice_type: this.data?.invoice_type, type: this.data?.type, invoice: this.invoice});
  }

  duplicateInvoice(refunding = false) {
    this.onDuplicate = true;
    this.onRefund = true;

    let redirect_invoice_type = '';
    let data = {};
    if (refunding) {
      redirect_invoice_type = this.data?.invoice_type == 'invoices' ? 'refunds': 'invoices';
      data = {refunding: true};
    } else {
      redirect_invoice_type = this.data?.invoice_type;
    }

    this.invoiceService.duplicate(this.data.id, data, (response) => {
      this.dialogRef.close();
      this.router.navigate(['/invoicing/'+redirect_invoice_type+'/'+this.data?.type+'/edit/'+response.id]);
      this.onDuplicate = false;
      this.onRefund = false;
    }, this.data?.invoice_type, this.data?.type);
  }

  detailPayment(id) {
    this.paymentService.detail(id);
  }
}
