import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ArticleService } from '../../../../article/services/article.service';
import { UnitService } from '../../../../article/services/unit.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-article',
  standalone: false,
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent {
  form: FormGroup = new FormGroup({});
  articles: any[] = [];
  taxes: any;
  taxes_id: any=[];
  taxe: any;
  article: any;
  taxe_value: any;
  price_tax: any;
  discount: any;
  selected_article: any;
  selected_taxe: any[] = [];
  taxe_names: any[] = [];
  units: any[] = [];
  unit: any;
  prices: any[] = [];
  room: any;
  onload = false;
  available = 10000;
  availableName = '';
  price: any;
  type: string;

  constructor(
    private formBuilder: FormBuilder,
    private articleService: ArticleService,
    private unitService: UnitService,
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<AddArticleComponent>,
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
      this.changeUnit();
    });

    if (this.data.type == 'hosting') {
      this.type = 'ROOM';
    } else if(this.data.type == 'restaurant') {
      this.type = 'MENU';
    } else {
      this.type = this.data.type;
    }

    this.articleService.index((data) => {
      this.articles = data.data;
      this.changeArticle();
    }, {type: this.type});
  }

  changeArticle() {
    const article_id = this.form.get('article_id')?.value;
    if (article_id) {
      this.article = this.articles.find(elt => elt.id == article_id);
      if (this.article) {
        if(this.data.type != 'hosting' && this.data.type != 'restaurant' && this.data?.type != 'suppliers') {
          this.form.get('unit_id')?.setValue(this.data?.type != 'suppliers' ? this.article.sale_unit_id : this.article.purchase_unit_id);
          this.form.get('price')?.setValue(this.data?.type != 'suppliers' ? this.article.price : this.article.cost);
          this.form.get('label')?.setValue(this.article.name);

          this.available = 0;
          this.article.stocks.forEach(stock => {
            // this.available += stock.qty;
            // this.available += stock.original_qty;
            this.available += 1000;
          });

          const unit_id = this.form.get('unit_id')?.value;
          this.unit = this.units.find(elt => elt.id == unit_id);
          const a = parseInt((this.available / (this.unit?.unity || 1))+'');
          const m = this.available % (this.unit?.unity || 1);

          this.availableName = a + ' ' + this.unit?.name;
          if (m>0) {
            this.availableName += ' '+m;
          }

          if(this.available > 0) {
            this.form.get('qty')?.setValidators([
              Validators.required,
              Validators.min(1),
              Validators.max(this.available)
            ]);
            this.form.get('qty')?.enable();
            this.form.get('price')?.enable();
            this.form.get('unit_id')?.enable();
            this.form.get('subtotal')?.enable();
          } else {
            this.form.get('qty')?.disable();
            this.form.get('price')?.disable();
            this.form.get('unit_id')?.disable();
            this.form.get('subtotal')?.disable();
          }

          this.getTotal();
        } else if(this.data.type == 'restaurant' || this.data.type == 'suppliers') {
          this.form.get('unit_id')?.setValue(this.data?.type != 'suppliers' ? this.article.sale_unit_id : this.article.purchase_unit_id);
          this.form.get('price')?.setValue(this.data?.type != 'suppliers' ? this.article.price : this.article.cost);
          this.form.get('label')?.setValue(this.article.name);
          this.getTotal();
        } else {
          this.form.get('label')?.setValue(this.article.name);
          this.form.get('unit_id')?.setValue(undefined);
          this.form.get('price')?.setValue('0');
          this.form.get('subtotal')?.setValue('0');
          this.prices = this.article.prices;
        }
        this.ngAfterViewInit();
      }
    }
    this.room = null;
  }

  getTotal() {
    const price = this.form.get('price')?.value || 0;
    const qty = this.form.get('qty')?.value || 0;
    const discount = this.form.get('discount')?.value || 0;
    let total = price*qty;
    const discountAmount = (total*discount)/100;
    this.form.get('subtotal')?.setValue(total - discountAmount);
    this.room = null;
  }

  changeUnit() {
    const unit_id = this.form.get('unit_id')?.value;
    if(this.data.type == 'hosting') {
      this.price = this.prices.find(elt => elt.unit_id == unit_id);
      this.form.get('price')?.setValidators([
        Validators.required,
        Validators.min(this.price?.min_price),
        Validators.max(this.price?.price)
      ]);
      this.form.get('price')?.setValue(this.price?.price);

      this.getTotal();
    } else {
      this.unit = this.units.find(elt => elt.id == unit_id);
    }
    this.room = null;
  }

  initForm(data?: any) {
    const now = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    const time = this.datePipe.transform(new Date(), 'HH')+':00';
    // console.log(data);

    this.form = this.formBuilder.group({
      id: [data?.id],
      article_id: [data?.article_id || data?.article?.id, [Validators.required]],
      unit_id: [data?.unit_id, [Validators.required]],
      label: [data?.label || ''],
      qty: [data?.qty || '1', [Validators.required]],
      price: [data?.price || '0', [Validators.required]],
      discount: [data?.discount || '0'],
      start_date: [data.start_date ? this.datePipe.transform(data.start_date, 'yyyy-MM-dd') : now, [Validators.required]],
      start_time: [data.start_date ? this.datePipe.transform(data.start_date, 'HH:mm') : time],
      subtotal: [data?.subtotal || '0', [Validators.required]],
    });
    // this.changeArticle();
    // this.changeUnit();
    this.ngAfterViewInit();
  }

  store() {
    this.onload = true;
    this.articleService.checkValidity({
      ...this.form.value,
      ...{calcul: this.price?.calcul},
      ...{type: this.data.type}
    }, (response) => {
      if (this.data.type == 'hosting') {
        if (response.free) {
          this.close();
        } else {
          this.room = response.room;
          this.onload = false;
        }
      } else if (this.data.type == 'bar') {
        if (response.available) {
          this.close();
        } else {
          // const unit = this.units.find(elt => elt.id == this.form.get('unit_id')?.value)
          this.availableName = response.label;
          this.available = response.stock;
          this.room = response;
          this.onload = false;
        }
      } else if (this.data.type == 'restaurant') {
        if (response.available) {
          this.close();
        } else {
          this.room = response;
          this.onload = false;
        }
      } else {
        this.close();
      }
    });
  }

  invalid() {
    const qty = this.form.get('qty')?.value
    // return this.form.invalid || this.onload || this.room || this.available < qty
    return this.form.invalid || this.onload || this.room
  }

  close() {
    const d = {
      article: this.articles.find(elt => elt.id == this.form.get('article_id')?.value),
      unit: this.units.find(elt => elt.id == this.form.get('unit_id')?.value),
      calcul: this.price?.calcul
    };
    const data = {...this.form.value, ...d};
    this.dialogRef.close(data);
    this.onload = false;
  }

  filter(event) {
    this.articleService.filter((data) => {
      this.articles = data;
    }, event.term, this.type);
  }
}
