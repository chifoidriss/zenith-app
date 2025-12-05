import { Component } from '@angular/core';
import { Paginate } from '../../../shared/models/paginate';
import { AlertService } from '../../../shared/services/alert.service';
import { UserService } from '../../services/user.service';
import { AddUserComponent } from './add-user/add-user.component';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  data: Paginate = new Paginate();
  loading = true;

  constructor(private alert: AlertService,
    private userService: UserService,
    public auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.userService.index(response => {
      this.data = response;
      this.loading = false;
    });
  }

  addItem() {
    this.alert.openModal(AddUserComponent, (result) => {
      if (result) {
        this.data.data.push(result);
      }
    }, null, 'xl');
  }

  removeItem(index: number, item: any) {
    this.alert.confirm(result => {
      if (result) {
        this.data.data.splice(index, 1);
        if (item.id) {
          this.userService.destroy(item.id, (response) => {});
        }
      }
    });
  }

  editItem(index: number, item: any) {
    this.alert.openModal(AddUserComponent, (result) => {
      if (result) {
        this.data.data[index] = result;
      }
    }, item, 'xl');
  }
}
