import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdvanceService } from '../../../../pay/services/advance.service';
import { ContractService } from '../../../../pay/services/contract.service';

@Component({
  selector: 'app-new-advance',
  standalone: false,
  templateUrl: './new-advance.component.html',
  styleUrls: ['./new-advance.component.scss']
})
export class NewAdvanceComponent {
  contracts: any[] = [];
  onload = false;
  form: FormGroup = new FormGroup({})

  constructor( private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<NewAdvanceComponent>,
    private advanceService: AdvanceService,
    private contractService: ContractService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [this.data?.id],
      contract_id: [this.data?.contract_id, [Validators.required]],
      reason: [this.data?.reason || '', [Validators.required]],
      amount: [this.data?.amount || '0'],
    });

    this.contractService.index(response => {
      this.contracts = response.data;
    });
  }

  save() {
    this.onload = true;
    this.advanceService.store(this.form.value, (data) => {
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
