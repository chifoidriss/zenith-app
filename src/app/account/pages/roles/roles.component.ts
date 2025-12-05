import { Component } from '@angular/core';
import { Paginate } from '../../../shared/models/paginate';
import { AlertService } from '../../../shared/services/alert.service';
import { RoleService } from '../../services/role.service';
import { AddRoleComponent } from './add-role/add-role.component';

@Component({
  selector: 'app-roles',
  standalone: false,
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent {
  data: Paginate = new Paginate();

  constructor(private alert: AlertService,
    private roleService: RoleService
  ) { }

  ngOnInit(): void {
    this.roleService.index(response => {
      this.data = response;
    });
  }

  addItem() {
    this.alert.openModal(AddRoleComponent, (result) => {
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
          this.roleService.destroy(item.id, (response) => {});
        }
      }
    });
  }

  editItem(index: number, item: any) {
    this.alert.openModal(AddRoleComponent, (result) => {
      if (result) {
        this.data.data[index] = result;
      }
    }, item);
  }
}
