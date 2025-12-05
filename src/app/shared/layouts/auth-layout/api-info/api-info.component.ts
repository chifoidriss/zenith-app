import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-api-info',
  standalone: false,
  templateUrl: './api-info.component.html',
  styleUrls: ['./api-info.component.scss']
})
export class ApiInfoComponent {
  form: FormGroup;

  constructor( private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ApiInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [this.data?.name || '', [Validators.required]],
      url: [this.data?.url || '', [Validators.required]],
    });
  }

  save() {
    this.dialogRef.close(this.form.value);
  }
}
