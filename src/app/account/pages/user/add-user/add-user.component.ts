import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoleService } from '../../../../account/services/role.service';
import { UserService } from '../../../../account/services/user.service';

@Component({
  selector: 'app-add-user',
  standalone: false,
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  form: FormGroup = new FormGroup({})
  isLoad = false;
  roles: any[] = [];
  permissions: any[] = [];
  userPermissions: any[] = [];

  constructor( private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddUserComponent>,
    private userService: UserService,
    private roleService: RoleService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [this.data?.id],
      first_name: [this.data?.first_name, [Validators.required]],
      last_name: [this.data?.last_name, [Validators.required]],
      title: [this.data?.title],
      email: [this.data?.email, [Validators.required, Validators.email]],
      phone: [this.data?.phone, [Validators.required]],
      // language: [this.data?.language, [Validators.required]],
      status: [this.data?.status || '0'],
    });

    this.roles = this.data?.roles || [];
    this.userPermissions = this.data?.permissions || [];
    // this.roleService.index((data) => {
    //   this.roles = data.data;
    // });

    this.roleService.permissions((data) => {
      this.permissions = data;
    });
    console.log(this.data);
  }

  check(code: string) {
    const p = this.userPermissions.find(elt => elt.code == code);
    return p?.pivot?.value || 0;
  }

  save() {
    this.isLoad = true;
    let val: any[] = [];
    this.permissions.forEach(permis => {
      const v = $(`.permissions input[name=${permis.code}]:checked`).val() || '';
      val.push({
        id: permis.id,
        code: permis.code,
        value: v,
      });
    });

    this.userService.store({...this.form.value, ...{permis: val}}, (data) => {
      this.isLoad = false;
      this.dialogRef.close(data);
    });
  }
}
