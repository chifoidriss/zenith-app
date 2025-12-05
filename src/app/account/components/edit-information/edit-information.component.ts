import { Component, Inject } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-edit-information',
  standalone: false,
  templateUrl: './edit-information.component.html',
  styleUrls: ['./edit-information.component.scss']
})
export class EditInformationComponent {
  form: FormGroup = new FormGroup({})

  constructor( private formBuilder: UntypedFormBuilder,
    public dialogRef: MatDialogRef<EditInformationComponent>,
    private accountService: AccountService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      first_name: [this.data?.first_name, [Validators.required, Validators.min(2), Validators.max(50)]],
      last_name: [this.data?.last_name, [Validators.required, Validators.min(2), Validators.max(50)]],
      title: [this.data?.title, [Validators.required, Validators.min(2), Validators.max(50)]],
    });
  }

  save() {
    this.accountService.updateInformations(this.form.value, (data) => {
      this.dialogRef.close(data);
    });
  }
}
