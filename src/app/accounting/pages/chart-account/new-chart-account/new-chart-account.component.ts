import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChartAccountService } from '../../../../accounting/services/chart-account.service';

@Component({
  selector: 'app-new-chart-account',
  standalone: false,
  templateUrl: './new-chart-account.component.html',
  styleUrls: ['./new-chart-account.component.scss']
})
export class NewChartAccountComponent implements OnInit {
  form:FormGroup = new FormGroup({});
  typeAccounts: any[] = [];
  errorMsg: any;
  errorCode: any;

  constructor(
    private formBuilder: FormBuilder,
    private chartAccountService: ChartAccountService,
    public dialogRef: MatDialogRef<NewChartAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngAfterViewInit() {
    $('.form-group .form-control').on('focus blur change', function (e) {
      const val: any = $(this).val() || [];
      $(this).parents('.form-group').toggleClass('focused', (e.type === 'focus' || val.length > 0));
    }).trigger('blur');
  }

  ngOnInit(): void {
    this.getTypeAccount();
    this.initForm();
  }

  getTypeAccount(){
    this.chartAccountService.indexTypeAccount((response: any) => {
      this.typeAccounts = response;
    });
  }

  initForm() {
    this.form = this.formBuilder.group({
      id: [this.data?.id],
      code: [this.data?.code || '', [Validators.required]],
      name: [this.data?.name || '', [Validators.required]],
      account_type_id: [this.data?.account_type_id || '', [Validators.required]],
      allow_reconciliation: [this.data?.allow_reconciliation || 0],
      deprecated: [this.data?.deprecated || 0],
    });
  }

  createAccount(){
    this.chartAccountService.store(this.form.value, (data)=>{
      this.dialogRef.close(data);
    });
  }
}
