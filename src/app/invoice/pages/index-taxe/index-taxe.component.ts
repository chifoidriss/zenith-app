import { Component } from '@angular/core';
import { Paginate } from '../../../shared/models/paginate';
import { AlertService } from '../../../shared/services/alert.service';
import { TaxeService } from '../../services/taxe.service';
import { AddTaxeComponent } from './add-taxe/add-taxe.component';

@Component({
  selector: 'app-index-taxe',
  standalone: false,
  templateUrl: './index-taxe.component.html',
  styleUrls: ['./index-taxe.component.scss']
})
export class IndexTaxeComponent {
  data: Paginate = new Paginate();
  loading = true;

  constructor(private alert: AlertService,
    private taxeService: TaxeService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.taxeService.index(response => {
      this.data = response;
      this.loading = false;
    });
  }

  addItem() {
    this.alert.openModal(AddTaxeComponent, (result) => {
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
          this.taxeService.destroy(item.id, (response) => {});
        }
      }
    });
  }

  editItem(index: number, item: any) {
    this.alert.openModal(AddTaxeComponent, (result) => {
      if (result) {
        this.data.data[index] = result;
      }
    }, item);
  }
}
