import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LeavingTypeService } from '../../../../pay/services/leaving-type.service';
import { AlertService } from '../../../../shared/services/alert.service';

@Component({
  selector: 'app-leave-type',
  standalone: false,
  templateUrl: './leave-type.component.html',
  styleUrls: ['./leave-type.component.scss']
})
export class LeaveTypeComponent {
  data: any[] = [];
  form: FormGroup = new FormGroup({});
  onLoad = false;
  loading = true;
  index: number = -1;

  constructor(private formBuilder: FormBuilder,
    private alert: AlertService,
    public dialogRef: MatDialogRef<LeaveTypeComponent>,
    private leavingTypeService: LeavingTypeService) { }

  ngOnInit() {
    this.leavingTypeService.index((response) => {
      this.data = response.data;
      this.loading = false;
    });
    this.initForm();
  }

  initForm(data?) {
    this.form = this.formBuilder.group({
      id: [data?.id],
      name: [data?.name || '', [Validators.required]],
      description: [data?.description || ''],
    });
  }

  save() {
    this.onLoad = true;
    this.leavingTypeService.store(this.form.value, (data) => {
      if (this.index > -1) {
        this.data[this.index] = data;
      } else {
        this.data.push(data);
      }

      this.form.reset();
      this.index = -1;
      this.onLoad = false;
    });
  }

  editItem(i, item) {
    this.initForm(item);
    this.index = i;
  }

  removeItem(i, item) {
    this.alert.confirm(result => {
      if (result) {
        this.data.splice(i, 1);
        if (item.id) {
          this.leavingTypeService.destroy(item.id, (response) => {});
        }
      }
    });
  }
}
