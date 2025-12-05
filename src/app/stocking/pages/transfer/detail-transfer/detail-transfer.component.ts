import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertService } from '../../../../shared/services/alert.service';
import { RestService } from '../../../../shared/services/rest.service';
import { TransferService } from '../../../../stocking/services/transfer.service';

@Component({
  selector: 'app-detail-transfer',
  standalone: false,
  templateUrl: './detail-transfer.component.html',
  styleUrls: ['./detail-transfer.component.scss']
})
export class DetailTransferComponent {
  invoice: any;
  loading: boolean = true;
  onDuplicate = false;
  onRefund = false;

  constructor(public alert: AlertService,
    private transferService: TransferService,
    private restService: RestService,
    private router: Router,
    public dialogRef: MatDialogRef<DetailTransferComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.transferService.show(this.data?.id, response => {
      this.invoice = response;
      this.loading = false;
    });
  }

  validate() {
    this.transferService.confirm(this.data.id, {}, (response) => {
      this.invoice.status = true;
    });
  }

  print() {
    this.restService.printToPDF('transfer', this.data?.id, () => {
      this.dialogRef.close();
    });
  }

  duplicateInvoice(refunding = false) {
    this.onDuplicate = true;
    this.onRefund = true;

    this.transferService.duplicate(this.data.id, {}, (response) => {
      this.dialogRef.close();
      this.router.navigate(['/stocking/transfers/edit/'+response.id]);
      this.onDuplicate = false;
      this.onRefund = false;
    });
  }
}
