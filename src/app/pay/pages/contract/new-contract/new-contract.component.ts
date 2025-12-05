import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TaxeService } from '../../../../invoice/services/taxe.service';
import { PartnerService } from '../../../../partner/services/partner.service';
import { BonusService } from '../../../../pay/services/bonus.service';
import { ContractTypeService } from '../../../../pay/services/contract-type.service';
import { ContractService } from '../../../../pay/services/contract.service';
import { IndemnityService } from '../../../../pay/services/indemnity.service';
import { PostService } from '../../../../pay/services/post.service';

@Component({
  selector: 'app-new-contract',
  standalone: false,
  templateUrl: './new-contract.component.html',
  styleUrls: ['./new-contract.component.scss']
})
export class NewContractComponent {
  employees: any[] = [];
  contractTypes: any[] = [];
  posts: any[] = [];
  bonuses: any[] = [];
  indemnities: any[] = [];
  taxes: any[] = [];
  onLoad = false;
  loading = true;
  id: number;

  form: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder,
    private contractService: ContractService,
    private partnerService: PartnerService,
    private contractTypeService: ContractTypeService,
    private postService: PostService,
    private bonusService: BonusService,
    private indemnityService: IndemnityService,
    private taxeService: TaxeService,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit() {
    this.route.params.subscribe(result => {
      this.loading = true;
      this.initForm();

      this.id = result['id'];

      if(this.id) {
        this.contractService.show(this.id, (response) => {
          this.initForm(response);
        });
      }

      this.partnerService.index((response) => {
        this.employees = response.data;
        this.loading = false;
      }, 'salaries');

      this.contractTypeService.index((response) => {
        this.contractTypes = response.data;
      });

      this.postService.index((response) => {
        this.posts = response.data;
      });

      this.bonusService.index((response) => {
        this.bonuses = response.data;
      });

      this.indemnityService.index((response) => {
        this.indemnities = response.data;
      });

      this.taxeService.index((response) => {
        this.taxes = response.data;
      });
    });
  }

  initForm(data?: any) {
    this.form = this.formBuilder.group({
      id: [data?.id],
      partner_id: [data?.partner_id, [Validators.required]],
      post_id: [data?.post_id, [Validators.required]],
      contract_type_id: [data?.contract_type_id, [Validators.required]],
      status: [data?.status || '1'],
      salary: [data?.salary || '0', [Validators.required]],
      start_date: [data?.start_date, [Validators.required]],
      end_date: [data?.end_date],
      observation: [data?.observation || ''],
    });

    // this.loading = false;
  }

  save() {
    this.onLoad = true;
    const f: any = document.getElementById('form');
    const formData = new FormData(f);

    for (const key in this.form.value) {
      if (Object.prototype.hasOwnProperty.call(this.form.value, key)) {
        const element = this.form.value[key];
        formData.append(key, element || '');
      }
    }

    this.contractService.store(formData, (data) => {
      this.onLoad = false;
      this.router.navigate(['/paying/contracts']);
    });
  }

  filterPartners(event) {
    this.partnerService.filter((data) => {
      this.employees = data;
    }, event.term);
  }
}
