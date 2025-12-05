import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UnitService } from '../../../services/unit.service';

@Component({
  selector: 'app-add-unit',
  standalone: false,
  templateUrl: './add-unit.component.html',
  styleUrls: ['./add-unit.component.scss']
})
export class AddUnitComponent {
  form: FormGroup = new FormGroup({})
  unitGroups: any [] = [];

  constructor( private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddUnitComponent>,
    private unitService: UnitService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngAfterViewInit() {
    $('.form-group .form-control').on('focus blur change', function (e) {
      const val: any = $(this).val() || [];
      $(this).parents('.form-group').toggleClass('focused', (e.type === 'focus' || val.length > 0));
    }).trigger('blur');
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [this.data?.id],
      name: [this.data?.name, [Validators.required]],
      parent_id: [this.data?.parent_id],
      role: [this.data?.role || 'MAIN'],
      unity: [this.data?.unity || '1'],
      code: [this.data?.code || ''],
      status: [this.data?.status || 0],
    });

    this.unitService.index((data) => {
      this.unitGroups = data.data;
    });
  }

  save() {
    this.unitService.store(this.form.value, (data) => {
      this.dialogRef.close(data);
    });
  }
}
