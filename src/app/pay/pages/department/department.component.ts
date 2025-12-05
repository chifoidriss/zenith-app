import { Component } from '@angular/core';
import { NewDepartmentComponent } from './new-department/new-department.component';
import { Paginate } from '../../../shared/models/paginate';
import { AlertService } from '../../../shared/services/alert.service';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-department',
  standalone: false,
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent {
  data: Paginate = new Paginate();
  loading = true;

  constructor(private alert: AlertService,
    private departmentService: DepartmentService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.departmentService.index(response => {
      this.data = response;
      this.loading = false;
    });
  }

  addItem() {
    this.alert.openModal(NewDepartmentComponent, (result) => {
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
          this.departmentService.destroy(item.id, (response) => {});
        }
      }
    });
  }

  editItem(index: number, item: any) {
    this.alert.openModal(NewDepartmentComponent, (result) => {
      if (result) {
        this.data.data[index] = result;
      }
    }, item);
  }
}
