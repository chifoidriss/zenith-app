import { Component } from '@angular/core';
import { NewLoanComponent } from './new-loan/new-loan.component';
import { AlertService } from '../../../shared/services/alert.service';
import { Paginate } from '../../../shared/models/paginate';
import { LoanService } from '../../services/loan.service';
import { NewPaymentComponent } from '../../../invoice/pages/index-payment/new-payment/new-payment.component';

@Component({
  selector: 'app-loan',
  standalone: false,
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss']
})
export class LoanComponent {
  data: Paginate = new Paginate();
  loading = true;

  constructor(private alert: AlertService,
    private loanService: LoanService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.loanService.index(response => {
      this.data = response;
      this.loading = false;
    });
  }

  addItem() {
    this.alert.openModal(NewLoanComponent, (result) => {
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
          this.loanService.destroy(item.id, (response) => {});
        }
      }
    });
  }

  editItem(index: number, item: any) {
    this.alert.openModal(NewLoanComponent, (result) => {
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
