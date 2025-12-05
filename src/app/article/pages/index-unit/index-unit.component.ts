import { Component } from '@angular/core';
import { Paginate } from '../../../shared/models/paginate';
import { AlertService } from '../../../shared/services/alert.service';
import { UnitService } from '../../services/unit.service';
import { AddUnitComponent } from './add-unit/add-unit.component';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-index-unit',
  standalone: false,
  templateUrl: './index-unit.component.html',
  styleUrls: ['./index-unit.component.scss']
})
export class IndexUnitComponent {
  data: Paginate = new Paginate();
  loading = true;

  constructor(private alert: AlertService,
    private unitService: UnitService,
    public auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.unitService.index(response => {
      this.data = response;
      this.loading = false;
    });
  }

  addItem() {
    this.alert.openModal(AddUnitComponent, (result) => {
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
          this.unitService.destroy(item.id, (response) => {});
        }
      }
    });
  }

  editItem(index: number, item: any) {
    this.alert.openModal(AddUnitComponent, (result) => {
      if (result) {
        this.data.data[index] = result;
      }
    }, item);
  }
}
