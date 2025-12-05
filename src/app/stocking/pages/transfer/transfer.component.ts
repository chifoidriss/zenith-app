import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../shared/services/alert.service';
import { RestService } from '../../../shared/services/rest.service';
import { TransferService } from '../../services/transfer.service';
import { Paginate } from '../../../shared/models/paginate';
import { DetailTransferComponent } from './detail-transfer/detail-transfer.component';
import { ErrorTransferModalComponent } from './error-transfer-modal/error-transfer-modal.component';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-transfer',
  standalone: false,
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent {
  data: Paginate = new Paginate();
  warehouse: string = '';
  invoice_type: string = '';
  title: string = '';
  loading: boolean = true;
  filter = false;
  params = {
    order: 'updated_at',
    form_date: '',
    to_date: '',
    invoice_status: '',
    payment_status: '',
    by: 'DESC',
  }

  constructor(private alert: AlertService,
    private route: ActivatedRoute,
    private transferService: TransferService,
    private restService: RestService,
    public auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(result => {
      this.warehouse = result['warehouse'];

      if (this.warehouse == 'bar') {
        this.title = 'Commandes bar';
      } else if(this.warehouse == 'restaurant') {
        this.title = 'commandes restaurant';
      } else {
        this.title = 'Transferts';
        this.warehouse = '';
      }

      this.getInvoices();
    });
  }

  getInvoices() {
    this.loading = true;
    this.transferService.index((response) => {
      this.data = response;
      this.loading = false;
    }, {...this.params, ...{warehouse: this.warehouse}});
    this.filter = false;
  }

  removeItem(index: number, item: any) {
    this.alert.confirm(result => {
      if (result) {
        if (item.id) {
          this.transferService.destroy(item.id, (response) => {
            this.data.data.splice(index, 1);
          });
        }
      }
    });
  }

  detailInvoice(id, index) {
    this.alert.openModal(DetailTransferComponent, (response) => {
      if (response) {
        this.data.data[index] = response;
      }
    }, {id: id}, 'full');
  }

  duplicateInvoice(id, refunding = false) {
    let redirect_invoice_type = '';
    let data = {};
    if (refunding) {
      redirect_invoice_type = this.invoice_type == 'invoices' ? 'refunds': 'invoices';
      data = {refunding: true};
    } else {
      redirect_invoice_type = this.invoice_type;
    }
    // this.transferService.duplicate(id, data,(response) => {
    //   this.router.navigate(['/invoicing/'+redirect_invoice_type+'/'+this.type+'/edit/'+response.id]);
    // }, this.invoice_type, this.type);
  }

  addRefund(item) {
    // this.router.navigate(['/invoicing/'+this.invoice_type+'/'+this.type+'/edit/'+item.id])
  }

  validate(id, index) {
    this.transferService.confirm(id, {}, (response) => {
      // if (response) {
      //   this.data.data[index].status = true;
      // }
      if (response) {
        if(response.is_valid) {
          this.data.data[index].status = true;
        } else {
          this.alert.openModal(ErrorTransferModalComponent, (data) => {
          }, response);
        }
      }
    });
  }

  export() {
    this.restService.tableToExcel('data', 'invoices');
  }
}
