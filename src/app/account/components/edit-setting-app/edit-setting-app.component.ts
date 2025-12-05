import { Component, Inject } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-edit-setting-app',
  standalone: false,
  templateUrl: './edit-setting-app.component.html',
  styleUrls: ['./edit-setting-app.component.scss']
})
export class EditSettingAppComponent {
  form: FormGroup = new FormGroup({})

  languages: any[] = [];
  timezones: any[] = [];

  constructor( private formBuilder: UntypedFormBuilder,
    public dialogRef: MatDialogRef<EditSettingAppComponent>,
    private accountService: AccountService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
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
