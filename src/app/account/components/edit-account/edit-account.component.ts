import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-edit-account',
  standalone: false,
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss']
})
export class EditAccountComponent {
  form: FormGroup = new FormGroup({})

  constructor( private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditAccountComponent>,
    private accountService: AccountService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: [this.data?.username, [Validators.required]],
      email: [this.data?.email, [Validators.email, Validators.required]],
      phone: [this.data?.phone, [Validators.required]],
    });
  }

  save() {
    this.accountService.updateInformations(this.form.value, (data) => {
      this.dialogRef.close(data);
    });
  }
}
