import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoleService } from '../../../../account/services/role.service';

@Component({
  selector: 'app-add-role',
  standalone: false,
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent {
  form: FormGroup = new FormGroup({})

  permissions: any[] = [];

  constructor( private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddRoleComponent>,
    private roleService: RoleService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [this.data?.id],
      name: [this.data?.name, [Validators.required]],
      description: [this.data?.description],
      permissions_id: [this.data?.permissions_id || [], [Validators.required]],
    });
    this.permissions = this.data?.permissions || [];
    this.roleService.permissions((data) => {
      this.permissions = data;
    });
  }

  save() {
    this.roleService.store(this.form.value, (data) => {
      this.dialogRef.close(data);
    });
  }
}
