import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ArticleService } from '../../../../../article/services/article.service';
import { UnitService } from '../../../../../article/services/unit.service';

@Component({
  selector: 'app-add-article-transfer-item',
  standalone: false,
  templateUrl: './add-article-transfer-item.component.html',
  styleUrls: ['./add-article-transfer-item.component.scss']
})
export class AddArticleTransferItemComponent {
  form: FormGroup = new FormGroup({});
  articles: any[] = [];
  article: any;
  units: any[] = [];
  unit: any;
  art: any;
  onLoad = false;
  available = 10000;
  availableName = '';

  constructor(
    private formBuilder: FormBuilder,
    private articleService: ArticleService,
    private unitService: UnitService,
    public dialogRef: MatDialogRef<AddArticleTransferItemComponent>,
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
    }, {type: 'STOCKABLE,CONSUMABLE', warehouse_id: this.data.warehouse_id});
  }

  initForm(data?: any) {
    this.form = this.formBuilder.group({
      id: [data?.id],
      article_id: [data?.article_id || data?.article?.id, [Validators.required]],
      unit_id: [data?.unit_id, [Validators.required]],
      qty: [data?.qty || '1', [Validators.required]],
    });
    this.ngAfterViewInit();
  }

  store() {
    this.onLoad = true;
    this.articleService.checkValidity({
      ...this.form.value,
      ...{warehouse_id: this.data.warehouse_id}
    }, (response) => {
      console.log(response);
      if (response.available) {
        this.close();
        this.onLoad = false;
      } else {
        this.availableName = response.label;
        this.available = response.stock;
        this.art = response;
        this.onLoad = false;
      }
    });
  }

  changeArticle() {
    const article_id = this.form.get('article_id')?.value;
    if (article_id) {
      this.article = this.articles.find(elt => elt.id == article_id);
      if (this.article) {
        this.form.get('unit_id')?.setValue(this.article.purchase_unit_id);
        this.ngAfterViewInit();
      }
    }
    this.art = null
  }

  invalid() {
    // const qty = this.form.get('qty')?.value
    return this.form.invalid || this.onLoad || this.art
  }

  close() {
    const d = {
      article: this.articles.find(elt => elt.id == this.form.get('article_id')?.value),
      unit: this.units.find(elt => elt.id == this.form.get('unit_id')?.value),
    };
    const data = {...this.form.value, ...d};
    this.dialogRef.close(data);
    this.onLoad = false;
  }

  filter(event) {
    this.articleService.filter((data) => {
      this.articles = data;
    }, event.term, 'STOCKABLE,CONSUMABLE');
  }
}
