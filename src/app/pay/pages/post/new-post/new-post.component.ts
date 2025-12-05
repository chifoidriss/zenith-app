import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DepartmentService } from '../../../../pay/services/department.service';
import { PostService } from '../../../../pay/services/post.service';

@Component({
  selector: 'app-new-post',
  standalone: false,
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent {
  departments: any[] = [];
  workplaces: any[] = [];

  form: FormGroup = new FormGroup({})

  constructor( private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<NewPostComponent>,
    private postService: PostService,
    private departmentService: DepartmentService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [this.data?.id],
      name: [this.data?.name || '', [Validators.required]],
      description: [this.data?.description || ''],
      department_id: [this.data?.department_id],
      // workplace_id: [this.data?.workplace_id || ''],
      // number_employees_expected: [this.data?.number_employees_expected || '1'],
    });
    this.departmentService.index(response => {
      this.departments = response.data;
    });
  }

  save() {
    this.postService.store(this.form.value, (data) => {
      this.dialogRef.close(data);
    });
  }
}
