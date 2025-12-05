import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ArticleService } from '../../../../../article/services/article.service';
import { UnitService } from '../../../../../article/services/unit.service';

@Component({
  selector: 'app-add-price',
  standalone: false,
  templateUrl: './add-price.component.html',
  styleUrls: ['./add-price.component.scss']
})
export class AddPriceComponent {
  form: FormGroup = new FormGroup({});
  taxes: any;
  taxes_id: any = [];
  taxe: any;
  taxe_value: any;
  price_tax: any;
  discount: any;
  selected_article: any;
  selected_taxe: any[] = [];
  taxe_names: any[] = [];
  units: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private articleService: ArticleService,
    private unitService: UnitService,
    public dialogRef: MatDialogRef<AddPriceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngAfterViewInit() {
    $('.form-group .form-control').on('focus blur change', function (e) {
      const val: any = $(this).val() || [];
      $(this).parents('.form-group').toggleClass('focused', (e.type === 'focus' || val.length > 0));
    }).trigger('blur');
  }

  ngOnInit(): void {
    this.initForm(this.data);
    this.unitService.index((data) => {
      this.units = data.data;
    });
  }

  initForm(data?: any) {
    this.form = this.formBuilder.group({
      id: [data?.id],
      unit_id: [data?.unit_id, [Validators.required]],
      price: [data?.price || '0', [Validators.required]],
      min_price: [data?.min_price || '0', [Validators.required]],
      calcul: [data?.calcul || 'D', [Validators.required]],
    });
    this.ngAfterViewInit();
  }

  store() {
    const d = {
      unit: this.units.find(elt => elt.id == this.form.get('unit_id')?.value),
    };
    const data = {...this.form.value, ...d};
    this.dialogRef.close(data);
  }
}
