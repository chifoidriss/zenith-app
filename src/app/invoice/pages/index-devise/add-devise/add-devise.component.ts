import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DeviseService } from '../../../services/devise.service';

@Component({
  selector: 'app-add-devise',
  standalone: false,
  templateUrl: './add-devise.component.html',
  styleUrls: ['./add-devise.component.scss']
})
export class AddDeviseComponent {
  form: FormGroup = new FormGroup({})

  constructor( private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddDeviseComponent>,
    private deviseService: DeviseService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [this.data?.id],
      devise: [this.data?.devise, [Validators.required]],
      symbol: [this.data?.symbol, [Validators.required]],
      name: [this.data?.name, [Validators.required]],
      unity: [this.data?.unity, [Validators.required]],
      status: [this.data?.status || '1'],
    });
  }

  save() {
    this.deviseService.store(this.form.value, (data) => {
      this.dialogRef.close(data);
    });
  }
}
