import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ArticleService } from '../../../../article/services/article.service';
import { UnitService } from '../../../../article/services/unit.service';
import { StockService } from '../../../../stocking/services/stock.service';

@Component({
  selector: 'app-add-stock',
  standalone: false,
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.scss']
})
export class AddStockComponent {
  form: FormGroup = new FormGroup({})
  articles: any [] = [];
  units: any [] = [];
  onload = false;

  constructor( private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddStockComponent>,
    private articleService: ArticleService,
    private unitService: UnitService,
    private stockService: StockService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [this.data?.id],
      warehouse_id: [this.data?.warehouse_id, [Validators.required]],
      article_id: [this.data?.article_id, [Validators.required]],
      unit_id: [this.data?.unit_id, [Validators.required]],
      qty_min: [this.data?.qty_min, [Validators.required]],
      // price: [this.data?.price],
    });

    this.articleService.index((data) => {
      this.articles = data.data;
    }, {type: 'STOCKABLE,CONSUMABLE'});

    this.unitService.index((data) => {
      this.units = data.data;
    });
  }

  store() {
    this.onload = true;
    this.stockService.store(this.form.value, (data) => {
      this.onload = false;
      this.dialogRef.close(data);
    });
  }

  filter(event) {
    this.articleService.filter((data) => {
      this.articles = data;
    }, event.term, 'STOCKABLE,CONSUMABLE');
  }
}
