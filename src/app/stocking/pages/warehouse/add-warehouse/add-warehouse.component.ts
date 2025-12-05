import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChartAccountService } from '../../../../accounting/services/chart-account.service';
import { WarehouseService } from '../../../../stocking/services/warehouse.service';

@Component({
  selector: 'app-add-warehouse',
  standalone: false,
  templateUrl: './add-warehouse.component.html',
  styleUrls: ['./add-warehouse.component.scss']
})
export class AddWarehouseComponent {
  form: FormGroup;
  categories: any [] = [];
  // accounts: any [] = [];

  constructor( private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddWarehouseComponent>,
    private warehouseService: WarehouseService,
    // private chartAccountService: ChartAccountService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    // this.warehouseService.index((data) => {
    //   this.categories = data.data;
    // });

    this.form = this.formBuilder.group({
      id: [this.data?.id],
      name: [this.data?.name, [Validators.required]],
      description: [this.data?.description, [Validators.required]],
      // stock_account_id: [this.data?.stock_account_id],
      // commodity_account_id: [this.data?.commodity_account_id],
    });

    // if (this.data?.stock_account_id) {
    //   this.accounts.push(this.data?.stock_account);
    // }
    // if (this.data?.commodity_account_id) {
    //   this.accounts.push(this.data?.commodity_account);
    // }
  }

  save() {
    this.warehouseService.store(this.form.value, (data) => {
      this.dialogRef.close(data);
    });
  }

  // filter(event) {
  //   this.chartAccountService.filter(response => {
  //     this.accounts = response;
  //   }, event.term);
  // }
}
