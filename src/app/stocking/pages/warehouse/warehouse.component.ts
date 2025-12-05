import { Component } from '@angular/core';
import { Paginate } from '../../../shared/models/paginate';
import { AlertService } from '../../../shared/services/alert.service';
import { AddWarehouseComponent } from './add-warehouse/add-warehouse.component';
import { WarehouseService } from '../../services/warehouse.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-warehouse',
  standalone: false,
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent {
  data: Paginate = new Paginate();
  loading = true;

  constructor(private alert: AlertService,
    private warehouseService: WarehouseService,
    public auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.warehouseService.index(response => {
      this.data = response;
      this.loading = false;
    });
  }

  addItem() {
    this.alert.openModal(AddWarehouseComponent, (result) => {
      if (result) {
        this.data.data.push(result);
      }
    });
  }

  removeItem(index: number, item: any) {
    this.alert.confirm(result => {
      if (result) {
        this.data.data.splice(index, 1);
        if (item.id) {
          this.warehouseService.destroy(item.id, (response) => {});
        }
      }
    });
  }

  editItem(index: number, item: any) {
    this.alert.openModal(AddWarehouseComponent, (result) => {
      if (result) {
        this.data.data[index] = result;
      }
    }, item);
  }
}
