import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PartnerService } from '../../../../partner/services/partner.service';
import { DepartmentService } from '../../../../pay/services/department.service';

@Component({
  selector: 'app-new-department',
  standalone: false,
  templateUrl: './new-department.component.html',
  styleUrls: ['./new-department.component.scss']
})
export class NewDepartmentComponent {
  employees: any[] = [];
  form: FormGroup = new FormGroup({})

  constructor( private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<NewDepartmentComponent>,
    private departmentService: DepartmentService,
    private partnerService: PartnerService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [this.data?.id],
      name: [this.data?.name || '', [Validators.required]],
      description: [this.data?.description || ''],
      partner_id: [this.data?.partner_id],
    });
    this.partnerService.index(response => {
      this.employees = response.data;
    }, 'salaries');
  }

  save() {
    this.departmentService.store(this.form.value, (data) => {
      this.dialogRef.close(data);
    });
  }

  filterPartners(event) {
    this.partnerService.filter((data) => {
      this.employees = data;
    }, event.term);
  }
}
