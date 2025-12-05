import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ContractService } from '../../../../pay/services/contract.service';
import { LoanService } from '../../../../pay/services/loan.service';

@Component({
  selector: 'app-new-loan',
  standalone: false,
  templateUrl: './new-loan.component.html',
  styleUrls: ['./new-loan.component.scss']
})
export class NewLoanComponent {
  contracts: any[] = [];
  onload = false;
  form: FormGroup = new FormGroup({})

  constructor( private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<NewLoanComponent>,
    private loanService: LoanService,
    private contractService: ContractService,
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [this.data?.id],
      contract_id: [this.data?.contract_id, [Validators.required]],
      reason: [this.data?.reason || '', [Validators.required]],
      start_date: [this.data?.start_date || this.datePipe.transform(new Date(), 'yyyy-mm-dd'), [Validators.required]],
      amount: [this.data?.amount || '0',],
      months: [this.data?.months || '1',],
    });
    this.contractService.index(response => {
      this.contracts = response.data;
    });
  }

  save() {
    this.onload = true;
    this.loanService.store(this.form.value, (data) => {
      this.onload = false;
      this.dialogRef.close(data);
    }, () => {
      this.onload = false;
    });
  }

  filter(event) {
    this.contractService.filter((data) => {
      this.contracts = data;
    }, event.term);
  }
}
