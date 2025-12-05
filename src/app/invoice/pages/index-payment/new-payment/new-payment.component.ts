import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PartnerService } from '../../../../partner/services/partner.service';
import { AlertService } from '../../../../shared/services/alert.service';
import { InvoiceService } from '../../../services/invoice.service';
import { DeviseService } from '../../../services/devise.service';
import { PaymentMethodService } from '../../../services/payment-method.service';
import { PaymentService } from '../../../services/payment.service';

@Component({
  selector: 'app-new-payment',
  standalone: false,
  templateUrl: './new-payment.component.html',
  styleUrls: ['./new-payment.component.scss']
})
export class NewPaymentComponent {
  type: string = '';
  title: string = '';
  form: FormGroup = new FormGroup({});
  partners: any[] = [];
  invoices: any[] = [];
  devises: any[] = [];
  payment_methods: any[] = [];
  onLoad = false;

  constructor(private alert: AlertService,
    private formBuilder: FormBuilder,
    private partnerService: PartnerService,
    private invoiceService: InvoiceService,
    private deviseService: DeviseService,
    private paymentService: PaymentService,
    private paymentMethodService: PaymentMethodService,
    public dialogRef: MatDialogRef<NewPaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.initForm(this.data);
    this.partnerService.index((data) => {
      this.partners = data.data;
    }, this.data.type);

    // this.invoiceService.index((data) => {
    //   this.invoices = data.data;
    // }, this.data.invoice_type, this.data.type);

    this.deviseService.index((response) => {
      this.devises = response.data;
      if(this.devises.length == 1) {
        this.form.get('devise_id')?.setValue(this.devises[0].id);
      }
    });

    this.paymentMethodService.index((response) => {
      this.payment_methods = response.data;
      if (this.payment_methods.length == 1) {
        this.form.get('payment_method_id')?.setValue(this.payment_methods[0].id);
      }
    });
  }

  initForm(data?: any) {
    const d = new Date().toISOString();
    const now = d.substring(0, d.indexOf('T'));

    this.form = this.formBuilder.group({
      id: [data?.id],
      invoice_id: [data?.invoice_id || this.data?.invoice?.id, [Validators.required]],
      partner_id: [data?.invoice?.partner_id],
      devise_id: [data?.devise_id || data?.invoice?.devise_id, [Validators.required]],
      payment_method_id: [data?.payment_method_id, [Validators.required]],
      reference: [data?.reference],
      payment_date: [data?.payment_date || now, [Validators.required]],
      amount: [data?.amount || data?.invoice?.due_amount || '0', [Validators.required, Validators.max(data?.invoice?.due_amount), Validators.min(1)]],
    });
  }

  changePartner() {
  }

  changeInvoice() {
  }

  getAmount() {
    const price = this.form.get('amount')?.value;
  }

  store() {
    this.onLoad = true;
    this.paymentService.store(this.form.value, (response) => {
      this.dialogRef.close(response);
      this.onLoad = false;
    }, this.data.type);
  }

  filterPartners(event) {
    this.partnerService.filter((data) => {
      this.partners = data;
    }, event.term);
  }
}
