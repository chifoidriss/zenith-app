import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AlertService } from '../../../shared/services/alert.service';
import { BonusService } from '../../services/bonus.service';

@Component({
  selector: 'app-bonus',
  standalone: false,
  templateUrl: './bonus.component.html',
  styleUrls: ['./bonus.component.scss']
})
export class BonusComponent {
  data: any[] = [];
  form: FormGroup = new FormGroup({});
  onLoad = false;
  loading = true;
  index: number = -1;

  constructor( private formBuilder: FormBuilder,
    private alert: AlertService,
    public dialogRef: MatDialogRef<BonusComponent>,
    private bonusService: BonusService) { }

  ngOnInit() {
    this.bonusService.index((response) => {
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
    this.bonusService.store(this.form.value, (data) => {
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
          this.bonusService.destroy(item.id, (response) => {});
        }
      }
    });
  }
}
