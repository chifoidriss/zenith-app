import { Component } from '@angular/core';
import { AlertService } from '../../../shared/services/alert.service';
import { StockService } from '../../services/stock.service';
import { Paginate } from '../../../shared/models/paginate';
import { WarehouseService } from '../../services/warehouse.service';
import { AddStockComponent } from './add-stock/add-stock.component';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-stock',
  standalone: false,
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent {
  data: Paginate = new Paginate();
  loading: boolean = true;
  warehouse: any;
  warehouses: any[] = [];

  constructor(private alert: AlertService,
    private warehouseService: WarehouseService,
    private stockService: StockService,
    public auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.warehouseService.index(response => {
      this.warehouses = response.data;
      this.loading = false;
    });
  }

  addItem() {
    this.alert.openModal(AddStockComponent, (result) => {
      if (result) {
        this.data.data.push(result);
      }
    }, {warehouse_id: this.warehouse.id});
  }

  editItem(index: number, item: any) {
    this.alert.openModal(AddStockComponent, (result) => {
      if (result) {
        this.data.data[index] = result;
      }
    }, {...item, ...{warehouse_id: this.warehouse.id}});
  }

  removeItem(index: number, item: any) {
    this.alert.confirm(result => {
      if (result) {
        this.data.data.splice(index, 1);
        if (item.id) {
          this.stockService.destroy(item.id, (response) => {});
        }
      }
    });
  }

  loadArticles(warehouse) {
    this.loading = true;
    this.stockService.index(response => {
      this.data = response;
      this.loading = false;
    }, warehouse.short_name);
    this.warehouse = warehouse;
  }
}
