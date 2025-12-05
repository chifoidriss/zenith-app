import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PartnerService } from '../../../../partner/services/partner.service';
import { AbsenceService } from '../../../../pay/services/absence.service';

@Component({
  selector: 'app-new-absence',
  standalone: false,
  templateUrl: './new-absence.component.html',
  styleUrls: ['./new-absence.component.scss']
})
export class NewAbsenceComponent {
  employees: any[] = [];
  onload = false;
  form: FormGroup = new FormGroup({})

  constructor( private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<NewAbsenceComponent>,
    private absenceService: AbsenceService,
    private partnerService: PartnerService,
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [this.data?.id],
      partner_id: [this.data?.partner_id, [Validators.required]],
      reason: [this.data?.reason || '', [Validators.required]],
      start_date: [this.data?.start_date || this.datePipe.transform(new Date(), 'yyyy-mm-dd'), [Validators.required]],
      justified: [this.data?.justified || '1'],
      longtime: [this.data?.longtime || '1'],
      amount: [this.data?.amount || '0',],
    });

    this.partnerService.index(response => {
      this.employees = response.data;
    }, 'salaries');
  }

  save() {
    this.onload = true;
    this.absenceService.store(this.form.value, (data) => {
      this.onload = false;
      this.dialogRef.close(data);
    }, () => {
      this.onload = false;
    });
  }

  filterPartners(event) {
    this.partnerService.filter((data) => {
      this.employees = data;
    }, event.term);
  }
}
