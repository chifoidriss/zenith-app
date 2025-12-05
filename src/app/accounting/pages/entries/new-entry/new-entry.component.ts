import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EntryService } from '../../../../accounting/services/entry.service';
import { ChartAccountService } from '../../../../accounting/services/chart-account.service';
import { DeviseService } from '../../../../invoice/services/devise.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../../shared/services/alert.service';
import { AddAccountingEntryComponent } from './add-accounting-entry/add-accounting-entry.component';
import { PartnerService } from '../../../../partner/services/partner.service';
import { RestService } from '../../../../shared/services/rest.service';

@Component({
  selector: 'app-new-entry',
  standalone: false,
  templateUrl: './new-entry.component.html',
  styleUrls: ['./new-entry.component.scss']
})
export class NewEntryComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  lines: any[] = [];
  partners: any[] = [];
  devises: any[] = [];
  debit_total = 0;
  credit_total = 0;
  onLoad = false;
  loading = false;
  id;
  fileData: any;

  constructor(private alert: AlertService,
    private entryService: EntryService,
    private formBuilder: FormBuilder,
    private chartAccountService: ChartAccountService,
    private deviseService: DeviseService,
    private partnerService: PartnerService,
    private router: Router,
    private route: ActivatedRoute,
    private rest: RestService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(result => {
      this.loading = true;
      this.initForm();

      this.id = result['id'];

      this.partnerService.index((response) => {
        this.partners = response.data;
      }, 'all');

      this.deviseService.index((response) => {
        this.devises = response.data;
        if(this.devises.length == 1) {
          this.form.get('devise_id')?.setValue(this.devises[0].id);
        }
      });
    });
  }

  initForm(data?: any) {
    const d = new Date().toISOString();
    const now = d.substring(0, d.indexOf('T'));

    this.form = this.formBuilder.group({
      id: [data?.id],
      reference: [data?.reference, [Validators.required]],
      partner_id: [data?.partner_id],
      devise_id: [data?.devise_id, [Validators.required]],
      billing_date: [data?.billing_date || now, [Validators.required]],
    });

    this.loading = false;
  }

  store() {
    this.onLoad = true;

    const formData = this.rest.asFormData(this.form);
    formData.append('document', this.fileData || '');
    formData.append('lines', JSON.stringify(this.lines));

    this.entryService.store(formData, (data) => {
      this.onLoad = false;
      this.router.navigate(['/accounting/entries']);
    });
  }

  fileEvent(e: any){
    this.fileData = e.target.files[0];
  }

  getTotal() {
    this.credit_total = 0;
    this.debit_total = 0;

    this.lines.forEach(line => {
      this.credit_total += parseFloat(line.credit);
      this.debit_total += parseFloat(line.debit);
    });
  }

  addLine() {
    this.alert.openModal(AddAccountingEntryComponent, (data) => {
      this.lines.push(data);
      this.getTotal();
    });
  }

  editLine(line, i) {
    this.alert.openModal(AddAccountingEntryComponent, (data) => {
      this.lines[i] = data;
      this.getTotal();
    }, line);
  }

  removeLine(line, i) {
    this.alert.confirm(response => {
      if (response) {
        if (line.id) {
          this.entryService.removeLine(line.id, (response) => {
            this.lines.splice(i, 1);
            this.getTotal();
          });
        } else {
          this.lines.splice(i, 1);
          this.getTotal();
        }
      }
    });
  }

  filterPartners(event) {
    this.partnerService.filter((data) => {
      this.partners = data;
    }, event.term);
  }

  invalid() {
    return this.form.invalid || this.lines.length == 0 || this.onLoad || this.debit_total != this.credit_total || !this.fileData;
  }
}
