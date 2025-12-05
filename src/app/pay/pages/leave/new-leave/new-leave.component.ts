import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PartnerService } from '../../../../partner/services/partner.service';
import { LeaveService } from '../../../../pay/services/leave.service';
import { LeavingTypeService } from '../../../../pay/services/leaving-type.service';

@Component({
  selector: 'app-new-leave',
  standalone: false,
  templateUrl: './new-leave.component.html',
  styleUrls: ['./new-leave.component.scss']
})
export class NewLeaveComponent {
  employees: any[] = [];
  leaveTypes: any[] = [];
  onload = false;

  form: FormGroup = new FormGroup({})

  constructor( private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<NewLeaveComponent>,
    private leaveService: LeaveService,
    private partnerService: PartnerService,
    private leavingTypeService: LeavingTypeService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [this.data?.id],
      partner_id: [this.data?.partner_id, [Validators.required]],
      leaving_type_id: [this.data?.leaving_type_id, [Validators.required]],
      observation: [this.data?.observation || '', [Validators.required]],
      start_date: [this.data?.start_date || '', [Validators.required]],
      payed: [this.data?.payed || '1'],
      longtime: [this.data?.longtime || '1'],
      amount: [this.data?.amount || '0'],
    });
    this.partnerService.index(response => {
      this.employees = response.data;
    }, 'salaries');

    this.leavingTypeService.index(response => {
      this.leaveTypes = response.data;
    });
  }

  save() {
    this.onload = true;
    this.leaveService.store(this.form.value, (data) => {
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
