import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InvoiceService } from '../../../../invoice/services/invoice.service';
import { PaymentService } from '../../../../invoice/services/payment.service';

@Component({
  selector: 'app-detail-payment',
  standalone: false,
  templateUrl: './detail-payment.component.html',
  styleUrls: ['./detail-payment.component.scss']
})
export class DetailPaymentComponent {
  payment: any;
  loading: boolean = true;

  constructor(private paymentService: PaymentService,
    private invoiceService: InvoiceService,
    public dialogRef: MatDialogRef<DetailPaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.paymentService.show(this.data?.id, response => {
      this.payment = response;
      this.loading = false;
    }, 'all');
  }

  detailInvoice(id) {
    this.invoiceService.detail(id);
  }

  print() {
    this.paymentService.print(this.data.id, this.data?.invoice_type);
  }
}
