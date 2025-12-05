import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaxeService } from '../../../services/taxe.service';
import { ChartAccountService } from '../../../../accounting/services/chart-account.service';

@Component({
  selector: 'app-add-taxe',
  standalone: false,
  templateUrl: './add-taxe.component.html',
  styleUrls: ['./add-taxe.component.scss']
})
export class AddTaxeComponent {
  accounts: any[] = [];
  form: FormGroup = new FormGroup({})

  constructor( private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddTaxeComponent>,
    private taxeService: TaxeService,
    private chartAccountService: ChartAccountService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [this.data?.id],
      name: [this.data?.name || '', [Validators.required]],
      type: [this.data?.type || 'IN', [Validators.required]],
      calcul: [this.data?.calcul || 'PERCENT', [Validators.required]],
      value: [this.data?.value || '', [Validators.required]],
      status: [this.data?.status || '1'],
      chart_account_id: [this.data?.chart_account_id],
    });
    if (this.data?.chart_account_id) {
      this.accounts.push(this.data?.chart_account);
    }
  }

  save() {
    this.taxeService.store(this.form.value, (data) => {
      this.dialogRef.close(data);
    });
  }

  filter(event) {
    this.chartAccountService.filter(response => {
      this.accounts = response;
    }, event.term);
  }
}
