import { Component } from '@angular/core';
import { NewReasonLeavingComponent } from './new-reason-leaving/new-reason-leaving.component';
import { AlertService } from '../../../shared/services/alert.service';
import { Paginate } from '../../../shared/models/paginate';
import { ReasonLeavingService } from '../../services/reason-leaving.service';

@Component({
  selector: 'app-reason-leaving',
  standalone: false,
  templateUrl: './reason-leaving.component.html',
  styleUrls: ['./reason-leaving.component.scss']
})
export class ReasonLeavingComponent {
  data: Paginate = new Paginate();
  loading = true;

  constructor(private alert: AlertService,
    private reasonLeavingService: ReasonLeavingService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.reasonLeavingService.index(response => {
      this.data = response;
      this.loading = false;
    });
  }

  addItem() {
    this.alert.openModal(NewReasonLeavingComponent, (result) => {
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
          this.reasonLeavingService.destroy(item.id, (response) => {});
        }
      }
    });
  }

  editItem(index: number, item: any) {
    this.alert.openModal(NewReasonLeavingComponent, (result) => {
      if (result) {
        this.data.data[index] = result;
      }
    }, item);
  }
}
