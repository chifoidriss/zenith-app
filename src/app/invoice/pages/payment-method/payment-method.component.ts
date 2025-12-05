import { Component } from '@angular/core';
import { Paginate } from '../../../shared/models/paginate';
import { AlertService } from '../../../shared/services/alert.service';
import { PaymentMethodService } from '../../../invoice/services/payment-method.service';
import { AddPaymentMethodComponent } from './add-payment-method/add-payment-method.component';

@Component({
  selector: 'app-payment-method',
  standalone: false,
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent {
  data: Paginate = new Paginate();
  loading = true;

  constructor(private alert: AlertService,
    private paymentMethods: PaymentMethodService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.paymentMethods.index(response => {
      this.data = response;
      this.loading = false;
    });
  }

  addItem() {
    this.alert.openModal(AddPaymentMethodComponent, (result) => {
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
          this.paymentMethods.destroy(item.id, (response) => {});
        }
      }
    });
  }

  editItem(index: number, item: any) {
    this.alert.openModal(AddPaymentMethodComponent, (result) => {
      if (result) {
        this.data.data[index] = result;
      }
    }, item);
  }
}
