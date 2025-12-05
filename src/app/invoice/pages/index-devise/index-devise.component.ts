import { Component } from '@angular/core';
import { Paginate } from '../../../shared/models/paginate';
import { AlertService } from '../../../shared/services/alert.service';
import { DeviseService } from '../../services/devise.service';
import { AddDeviseComponent } from './add-devise/add-devise.component';

@Component({
  selector: 'app-index-devise',
  standalone: false,
  templateUrl: './index-devise.component.html',
  styleUrls: ['./index-devise.component.scss']
})
export class IndexDeviseComponent {
  data: Paginate = new Paginate();
  loading = true;

  constructor(private alert: AlertService,
    private deviseService: DeviseService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.deviseService.index(response => {
      this.data = response;
      this.loading = false;
    });
  }

  addItem() {
    this.alert.openModal(AddDeviseComponent, (result) => {
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
          this.deviseService.destroy(item.id, (response) => {});
        }
      }
    });
  }

  editItem(index: number, item: any) {
    this.alert.openModal(AddDeviseComponent, (result) => {
      if (result) {
        this.data.data[index] = result;
      }
    }, item);
  }
}
