import { Component } from '@angular/core';
import { AlertService } from '../../../shared/services/alert.service';
import { AdvanceService } from '../../services/advance.service';
import { Paginate } from '../../../shared/models/paginate';
import { NewAdvanceComponent } from './new-advance/new-advance.component';
import { NewPaymentComponent } from '../../../invoice/pages/index-payment/new-payment/new-payment.component';

@Component({
  selector: 'app-advance',
  standalone: false,
  templateUrl: './advance.component.html',
  styleUrls: ['./advance.component.scss']
})
export class AdvanceComponent {
  data: Paginate = new Paginate();
  loading = true;

  constructor(private alert: AlertService,
    private advanceService: AdvanceService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.advanceService.index(response => {
      this.data = response;
      this.loading = false;
    });
  }

  addItem() {
    this.alert.openModal(NewAdvanceComponent, (result) => {
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
          this.advanceService.destroy(item.id, (response) => {});
        }
      }
    });
  }

  editItem(index: number, item: any) {
    this.alert.openModal(NewAdvanceComponent, (result) => {
      if (result) {
        this.data.data[index] = result;
      }
    }, item);
  }

  addPayment(item, i) {
    this.alert.openModal(NewPaymentComponent, (response) => {
      if (response) {
        this.data.data[i].invoice.due_amount -= response.amount;
        this.data.data[i].invoice.paid_amount += response.amount;
      }
    }, {invoice_type: 'invoices', type: 'salaries', invoice: item.invoice});
  }
}
