import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ArticleService } from '../../../../../article/services/article.service';
import { UnitService } from '../../../../../article/services/unit.service';

@Component({
  selector: 'app-add-menu-item',
  standalone: false,
  templateUrl: './add-menu-item.component.html',
  styleUrls: ['./add-menu-item.component.scss']
})
export class AddMenuItemComponent {
  form: FormGroup = new FormGroup({});
  taxes: any;
  taxes_id: any=[];
  taxe: any;
  taxe_value: any;
  price_tax: any;
  discount: any;
  selected_article: any;
  selected_taxe: any[] = [];
  taxe_names: any[] = [];
  units: any[] = [];
  articles: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private articleService: ArticleService,
    private unitService: UnitService,
    public dialogRef: MatDialogRef<AddMenuItemComponent>,
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
    this.articleService.index((data) => {
      this.articles = data.data;
    }, {type: 'CONSUMABLE,STOCKABLE'});
  }

  initForm(data?: any) {
    this.form = this.formBuilder.group({
      id: [data?.id],
      article_id: [data?.article_id, [Validators.required]],
      unit_id: [data?.unit_id, [Validators.required]],
      qty: [data?.qty || '1', [Validators.required]],
    });
    this.ngAfterViewInit();
  }

  store() {
    const d = {
      unit: this.units.find(elt => elt.id == this.form.get('unit_id')?.value),
      article: this.articles.find(elt => elt.id == this.form.get('article_id')?.value),
    };
    const data = {...this.form.value, ...d};
    this.dialogRef.close(data);
  }

  filter(event) {
    this.articleService.filter((data) => {
      this.articles = data;
    }, event.term, 'STOCKABLE,CONSUMABLE');
  }
}
