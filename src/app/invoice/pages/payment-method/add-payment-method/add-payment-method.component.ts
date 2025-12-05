import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PaymentMethodService } from '../../../services/payment-method.service';
import { ChartAccountService } from '../../../../accounting/services/chart-account.service';

@Component({
  selector: 'app-add-payment-method',
  standalone: false,
  templateUrl: './add-payment-method.component.html',
  styleUrls: ['./add-payment-method.component.scss']
})
export class AddPaymentMethodComponent {
  accounts: any[] = [];
  form: FormGroup = new FormGroup({})

  constructor( private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddPaymentMethodComponent>,
    private paymentMethods: PaymentMethodService,
    private chartAccountService: ChartAccountService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [this.data?.id],
      name: [this.data?.name || '', [Validators.required]],
      description: [this.data?.description || ''],
      cash_account_id: [this.data?.cash_account_id],
    });
    if (this.data?.cash_account_id) {
      this.accounts.push(this.data?.cash_account);
    }
  }

  save() {
    this.paymentMethods.store(this.form.value, (data) => {
      this.dialogRef.close(data);
    });
  }

  filter(event) {
    this.chartAccountService.filter(response => {
      this.accounts = response;
    }, event.term);
  }
}
