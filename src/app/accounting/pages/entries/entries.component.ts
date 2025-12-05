import { Component } from '@angular/core';
import { Paginate } from '../../../shared/models/paginate';
import { AlertService } from '../../../shared/services/alert.service';
import { NewEntryComponent } from './new-entry/new-entry.component';
import { EntryService } from '../../services/entry.service';
import { AuthService } from '../../../auth/services/auth.service';
import { RestService } from '../../../shared/services/rest.service';
import { InvoiceService } from '../../../invoice/services/invoice.service';
import { TransferService } from '../../../stocking/services/transfer.service';
import { PaymentService } from '../../../invoice/services/payment.service';
import { SalaryService } from '../../../pay/services/salary.service';
// import { PartnerService } from '../../../partner/services/partner.service';

@Component({
  selector: 'app-entries',
  standalone: false,
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.scss']
})
export class EntriesComponent {
  // data: Paginate = new Paginate();
  data: any[] = [];
  loading = true;
  filter = false;
  params = {
    source: '',
    form_date: '',
    to_date: '',
    date: 'today',
  }

  constructor(
    private alert: AlertService,
    private entryService: EntryService,
    public auth: AuthService,
    private restService: RestService,
    private invoiceService: InvoiceService,
    private paymentService: PaymentService,
    private transferService: TransferService,
    private salaryService: SalaryService,
    // private partnerService: PartnerService,
    // private chartAccountService: ChartAccountService,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.entryService.index(response => {
      this.data = response;
      this.loading = false;
    }, this.params);
  }

  create() {
    this.alert.openModal(NewEntryComponent, (data: any) => {
      this.data.push(data);
    });
  }

  edit(index: number, item) {
    this.alert.openModal(NewEntryComponent, (result) => {
      if (result) {
        this.data[index] = result;
      }
    }, item);
  }

  detail(entry) {
    if(entry.invoice_id) {
      this.invoiceService.detail(entry.invoice_id);
    } else if(entry.payment_id) {
      this.paymentService.detail(entry.payment_id);
    } else if(entry.transfer_id) {
      this.transferService.detail(entry.transfer_id);
    } else if(entry.salary_id) {
      this.salaryService.detail(entry.salary_id);
    }
  }

  export() {
    this.restService.tableToExcel('data', 'general-ledges');
  }
}
