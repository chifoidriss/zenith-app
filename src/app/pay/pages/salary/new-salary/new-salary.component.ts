import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BonusService } from '../../../../pay/services/bonus.service';
import { IndemnityService } from '../../../../pay/services/indemnity.service';
import { SalaryService } from '../../../../pay/services/salary.service';

@Component({
  selector: 'app-new-salary',
  standalone: false,
  templateUrl: './new-salary.component.html',
  styleUrls: ['./new-salary.component.scss']
})
export class NewSalaryComponent {
  form: FormGroup = new FormGroup({});
  indemnities: any[] = [];
  bonuses: any[] = [];
  onLoad = false;
  loading = true;

  constructor( private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<NewSalaryComponent>,
    private salaryServie: SalaryService,
    private indemnityServie: IndemnityService,
    private bonusService: BonusService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.indemnityServie.index(response => {
      this.indemnities = response.data;
    });

    this.bonusService.index(response => {
      this.bonuses = response.data;
      this.loading = false;
    });
  }

  initForm(data?) {
    this.form = this.formBuilder.group({
      id: [data?.id],
      contract_id: [data?.contract_id, [Validators.required]],
      // partner_id: [data?.partner_id, [Validators.required]],
      // payed: [data?.payed || '1'],
    });
  }

  save() {
    this.onLoad = true;
    this.salaryServie.store(this.form.value, (data) => {
      this.onLoad = false;
      this.dialogRef.close(data);
    });
  }
}
