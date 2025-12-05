import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SocietyService } from '../../../../invoice/services/society.service';

@Component({
  selector: 'app-edit-society',
  standalone: false,
  templateUrl: './edit-society.component.html',
  styleUrls: ['./edit-society.component.scss']
})
export class EditSocietyComponent {
  form: FormGroup = new FormGroup({})

  constructor( private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditSocietyComponent>,
    private societyService: SocietyService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [this.data?.name, [Validators.required]],
      address_name: [this.data?.address_name, [Validators.required]],
      phone: [this.data?.phone || '', [Validators.required]],
      email: [this.data?.email || '', [Validators.required]],
      uid: [this.data?.uid || '', ],
      registre: [this.data?.registre || '', ],
      site: [this.data?.site || '', ],
    });
  }

  save() {
    this.societyService.store(this.form.value, (data) => {
      this.dialogRef.close(data);
    });
  }
}
