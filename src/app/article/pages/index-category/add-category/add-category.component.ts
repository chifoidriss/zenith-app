import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-add-category',
  standalone: false,
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {
  form: FormGroup = new FormGroup({})
  categories: any [] = [];

  constructor( private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddCategoryComponent>,
    private categoryService: CategoryService,
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
    });

    this.categoryService.index((data) => {
      this.categories = data.data;
    });
  }

  save() {
    this.categoryService.store(this.form.value, (data) => {
      this.dialogRef.close(data);
    });
  }
}
