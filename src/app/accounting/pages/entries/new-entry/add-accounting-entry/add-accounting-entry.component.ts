import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ChartAccountService } from '../../../../../accounting/services/chart-account.service';

@Component({
  selector: 'app-add-accounting-entry',
  standalone: false,
  templateUrl: './add-accounting-entry.component.html',
  styleUrls: ['./add-accounting-entry.component.scss']
})
export class AddAccountingEntryComponent {
  form: FormGroup = new FormGroup({});
  accounts: any[] = [];
  account: any;

  constructor(
    private formBuilder: FormBuilder,
    private chartAccountService: ChartAccountService,
    public dialogRef: MatDialogRef<AddAccountingEntryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.initForm(this.data);

    // this.chartAccountService.index((data) => {
    //   this.accounts = data.data;
    // });
  }

  initForm(data?: any) {
    this.form = this.formBuilder.group({
      id: [data?.id],
      chart_account_id: [data?.chart_account_id, [Validators.required]],
      debit: [data?.debit || '0', [Validators.required]],
      credit: [data?.credit || '0', [Validators.required]],
      label: [data?.label || '', [Validators.required]],
    });

    if (data?.chart_account_id) {
      this.accounts.push(data?.chart_account);
    }
  }

  changeAccount() {
    const chart_account_id = this.form.get('chart_account_id')?.value;
    this.account = this.accounts.find(elt => elt.id == chart_account_id);

    this.form.get('label')?.setValue(this.account?.name);
  }

  filter(event) {
    this.chartAccountService.filter(response => {
      this.accounts = response;
    }, event.term);
  }

  store() {
    const d = {
      chart_account: this.account,
    };
    const data = {...this.form.value, ...d};
    this.dialogRef.close(data);
  }
}
