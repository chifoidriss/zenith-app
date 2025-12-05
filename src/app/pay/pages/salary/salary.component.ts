import { Component } from '@angular/core';
import { Paginate } from '../../../shared/models/paginate';
import { AlertService } from '../../../shared/services/alert.service';
import { SalaryService } from '../../services/salary.service';
import { NewSalaryComponent } from './new-salary/new-salary.component';
import { DetailSalaryComponent } from './detail-salary/detail-salary.component';
import { NewPaymentComponent } from '../../../invoice/pages/index-payment/new-payment/new-payment.component';

@Component({
  selector: 'app-salary',
  standalone: false,
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.scss']
})
export class SalaryComponent {
  data: Paginate = new Paginate();
  loading = true;
  current_month = '2024-01';
  next_month = '2024-02';

  constructor(private alert: AlertService,
    private salaryService: SalaryService
  ) {
    const d = new Date().toISOString();
    this.current_month = d.substring(0, 7);
    const n = new Date();
    this.next_month = n.getFullYear()+'-'+n.getMonth()+1;
  }

  ngOnInit(): void {
    this.loading = true;
    this.salaryService.index(response => {
      this.data = response;
      this.loading = false;
      // console.log(response);
    }, {current_month: this.current_month});
  }

  show() {
  }

  create(i, item, btn) {
    $(btn).find('span.spinner-border').removeClass('d-none');
    $(btn).attr('disabled', 'true');

    this.salaryService.store({
      current_month: this.current_month,
      contract_id: item.id
    }, (response) => {
      $(btn).find('span.spinner-border').addClass('d-none');
      $(btn).removeAttr('disabled');

      if (response) {
        this.detail(response)
        this.data.data[i].pay = response;
      }
    }, (error) => {
      $(btn).find('span.spinner-border').addClass('d-none');
      $(btn).removeAttr('disabled');
    });
  }

  edit(i, item) {
    this.alert.openModal(NewSalaryComponent, (result) => {
      if (result) {
        this.data.data[i] = result;
      }
    }, item, 'md');
  }

  detail(pay) {
    this.alert.openModal(DetailSalaryComponent, (result) => {
      if (result) {
        // this.data.data.push(result);
      }
    }, pay, 'md');
  }

  addPayment(item, i) {
    this.alert.openModal(NewPaymentComponent, (response) => {
      if (response) {
        this.data.data[i].pay.invoice.due_amount -= response.amount;
        this.data.data[i].pay.invoice.paid_amount += response.amount;
      }
    }, {invoice_type: 'invoices', type: 'salaries', invoice: item.pay.invoice});
  }
}
