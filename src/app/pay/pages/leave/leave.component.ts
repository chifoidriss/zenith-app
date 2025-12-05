import { Component } from '@angular/core';
import { NewLeaveComponent } from './new-leave/new-leave.component';
import { LeaveService } from '../../services/leave.service';
import { AlertService } from '../../../shared/services/alert.service';
import { Paginate } from '../../../shared/models/paginate';
import { LeaveTypeComponent } from './leave-type/leave-type.component';

@Component({
  selector: 'app-leave',
  standalone: false,
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss']
})
export class LeaveComponent {
  data: Paginate = new Paginate();
  loading = true;

  constructor(private alert: AlertService,
    private leaveService: LeaveService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.leaveService.index(response => {
      this.data = response;
      this.loading = false;
    });
  }

  addItem() {
    this.alert.openModal(NewLeaveComponent, (result) => {
      if (result) {
        this.data.data.push(result);
      }
    });
  }

  addLeaveType() {
    this.alert.openModal(LeaveTypeComponent, (result) => {
      // if (result) {
      //   this.data.data.push(result);
      // }
    }, 'xl');
  }

  removeItem(index: number, item: any) {
    this.alert.confirm(result => {
      if (result) {
        this.data.data.splice(index, 1);
        if (item.id) {
          this.leaveService.destroy(item.id, (response) => {});
        }
      }
    });
  }

  editItem(index: number, item: any) {
    this.alert.openModal(NewLeaveComponent, (result) => {
      if (result) {
        this.data.data[index] = result;
      }
    }, item);
  }
}
