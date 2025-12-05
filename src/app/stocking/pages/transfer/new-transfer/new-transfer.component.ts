import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../../shared/services/alert.service';
import { TransferService } from '../../../../stocking/services/transfer.service';
import { AddArticleTransferItemComponent } from './add-article-transfer-item/add-article-transfer-item.component';
import { WarehouseService } from '../../../../stocking/services/warehouse.service';
import { RestService } from '../../../../shared/services/rest.service';
// import { PartnerService } from '../../../../partner/services/partner.service';

@Component({
  selector: 'app-new-transfer',
  standalone: false,
  templateUrl: './new-transfer.component.html',
  styleUrls: ['./new-transfer.component.scss']
})
export class NewTransferComponent {
  id: string = '';
  type: string = '';
  invoice_type: string = '';
  title: string = '';
  form: FormGroup = new FormGroup({});
  invoice: any;
  items: any[] = [];
  payments: any[] = [];
  partners: any[] = [];
  warehouses: any[] = [];
  devises: any[] = [];
  loading: boolean = true;
  onLoad = false;

  constructor(private alert: AlertService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private transferService: TransferService,
    // private partnerService: PartnerService,
    private warehouseService: WarehouseService,
    private restService: RestService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(result => {
      this.loading = true;
      this.initForm();

      this.id = result['id'];

      if (this.id) {
        this.transferService.show(this.id, response => {
          this.invoice = response;
          this.initForm(this.invoice);
        });
      }

      // this.partnerService.index((response) => {
      //   this.partners = response.data;
      // }, (this.type == 'suppliers'?'suppliers':'clients'));

      this.warehouseService.index((response) => {
        this.warehouses = response.data;
      });
    });
  }

  initForm(defaultData?: any) {
    const data: any = defaultData;
    const d = new Date().toISOString();
    const now = d.substring(0, d.indexOf('T'));

    this.form = this.formBuilder.group({
      id: [data?.id],
      partner_id: [data?.partner_id],
      operation: [data?.operation || 'TRANSFER', [Validators.required]],
      origin_warehouse_id: [data?.origin_warehouse_id, [Validators.required]],
      destination_warehouse_id: [data?.destination_warehouse_id, [Validators.required]],
      billing_date: [data?.billing_date || now],
      due_date: [data?.due_date || now],
    });
    this.items = data?.items || [];

    this.loading = false;
  }

  store() {
    this.onLoad = true;
    this.transferService.store({...this.form.value, ...{items: this.items}}, (response) => {
      localStorage.setItem('draft.invoice', '{}');
      this.onLoad = false;
      // this.location.back();
      this.router.navigate(['/stocking/transfers']);
    });
  }

  validate() {
    this.transferService.confirm(this.id, {}, (response) => {
      this.location.back();
    });
  }

  print() {
    this.restService.printToPDF('transfer', this.id, () => {
      // this.dialogRef.close();
    });
  }

  addItem() {
    this.alert.openModal(AddArticleTransferItemComponent, (result) => {
      if (result) {
        this.items.push(result);
      }
    }, {warehouse_id: this.form.get('origin_warehouse_id')?.value});
  }

  removeItem(index: number, item: any) {
    this.alert.confirm(result => {
      if (result) {
        if (item.id) {
          this.transferService.removeItem(item.id, (response) => {
            this.items.splice(index, 1);
          });
        } else {
          this.items.splice(index, 1);
        }
      }
    });
  }

  editItem(index: number, item: any) {
    this.alert.openModal(AddArticleTransferItemComponent, (result) => {
      if (result) {
        this.items[index] = result;
      }
    }, {...item, ...{warehouse_id: this.form.get('origin_warehouse_id')?.value}});
  }

  duplicateInvoice(refunding = false) {
    this.loading = true;
    this.transferService.duplicate(this.id, {}, (response) => {
      this.router.navigate(['/stocking/transfers/edit/'+response.id]);
      this.loading = false;
    });
  }

  invalid() {
    // const data = {...this.form.value, ...{items: this.items}, ...{payments: this.payments}}
    // localStorage.setItem('draft.invoice', JSON.stringify(data));
    return this.form.invalid || this.items.length == 0 || this.onLoad || this.invoice?.status;
  }
}
