import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../../app/shared/services/alert.service';
import { PartnerService } from '../../services/partner.service';
import { Location } from '@angular/common';
import { AccountService } from '../../../../app/account/services/account.service';
import { ChartAccountService } from '../../../../app/accounting/services/chart-account.service';

@Component({
  selector: 'app-new-partner',
  standalone: false,
  templateUrl: './new-partner.component.html',
  styleUrls: ['./new-partner.component.scss']
})
export class NewPartnerComponent {
  id: string = '';
  type: string = '';
  title: string = '';
  form: FormGroup = new FormGroup({});
  fileData: any;
  imageUrl: any = '';
  loading: boolean = true;
  countries: any[] = [];
  isLoad = false;
  accounts: any[] = [];

  constructor(private alert: AlertService,
    private formBuilder: FormBuilder,
    private partnerService: PartnerService,
    private accountService: AccountService,
    private location: Location,
    private chartAccountService: ChartAccountService,
    private route: ActivatedRoute) { }

  ngAfterViewInit() {
    $('.form-group .form-control').on('focus blur change', function (e) {
      const val: any = $(this).val() || [];
      $(this).parents('.form-group').toggleClass('focused', (e.type === 'focus' || val.length > 0));
    }).trigger('blur');
  }

  ngOnInit(): void {
    this.route.params.subscribe(result => {
      this.loading = true;
      this.initForm();
      this.type = result['type'];
      this.id = result['id'];

      if (this.type == 'clients') {
        this.title = 'Client';
      } else if(this.type == 'suppliers') {
        this.title = 'Fournisseur';
      } else if(this.type == 'salaries') {
        this.title = 'Employé';
      }

      if (this.id) {
        this.partnerService.show(this.id, response => {
          this.initForm(response);
        }, this.type);
      }
    });

    this.accountService.countries(response => {
      this.countries = response;
    });
  }

  initForm(data?: any) {
    this.form = this.formBuilder.group({
      id: [data?.id],
      partner_type: [data?.partner_type || 'PARTICULAR', Validators.required],
      first_name: [data?.first_name || '', Validators.required],
      last_name: [data?.last_name || '', Validators.required],
      society_name: [data?.society_name || ''],
      genre: [data?.genre],
      post: [data?.post || ''],
      phone: [data?.phone || '', Validators.required],
      email: [data?.email || ''],
      birthday: [data?.birthday || ''],
      birthplace: [data?.birthplace || ''],
      identity_type: [data?.identity_type || ''],
      identity_number: [data?.identity_number || ''],
      identity_delivery_place: [data?.identity_delivery_place || ''],
      identity_delivery_date: [data?.identity_delivery_date || ''],
      identity_expiry_date: [data?.identity_expiry_date || ''],
      nationality_id: [data?.nationality_id],
      country_id: [data?.country_id],
      city: [data?.city || ''],
      reference: [data?.reference || ''],
      barcode: [data?.barcode || ''],
      default_account_id: [data?.default_account_id],
    });
    this.loading = false;
    this.ngAfterViewInit();

    if (data?.default_account_id) {
      this.accounts.push(data?.default_account);
    }
  }

  store() {
    this.isLoad = true;
    this.partnerService.store(this.form.value, (data) => {
      this.isLoad = false;
      this.alert.message(this.title+ ' enregistré avec succès.');
      this.location.back();
    }, this.type);
  }

  filter(event) {
    this.chartAccountService.filter(response => {
      this.accounts = response;
    }, event.term);
  }
}
