import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContractTypeService } from '../../../../pay/services/contract-type.service';
import { AlertService } from '../../../../shared/services/alert.service';

@Component({
  selector: 'app-contract-type',
  standalone: false,
  templateUrl: './contract-type.component.html',
  styleUrls: ['./contract-type.component.scss']
})
export class ContractTypeComponent {
  data: any[] = [];
  form: FormGroup = new FormGroup({});
  onLoad = false;
  loading = true;
  index: number = -1;

  constructor( private formBuilder: FormBuilder,
    private alert: AlertService,
    private contractTypeService: ContractTypeService) { }

  ngOnInit() {
    this.contractTypeService.index((response) => {
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
    this.contractTypeService.store(this.form.value, (data) => {
      if (this.index >-1) {
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
          this.contractTypeService.destroy(item.id, (response) => {});
        }
      }
    });
  }
}
