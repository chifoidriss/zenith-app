import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '../../../../shared/services/config.service';
import { ArticleService } from '../../../services/article.service';
import { AlertService } from '../../../../shared/services/alert.service';
import { Location } from '@angular/common';
import { CategoryService } from '../../../services/category.service';
import { RestService } from '../../../../shared/services/rest.service';
import { UnitService } from '../../../services/unit.service';
import { AddPriceComponent } from './add-price/add-price.component';
import { AddMenuItemComponent } from './add-menu-item/add-menu-item.component';
import { ChartAccountService } from '../../../../accounting/services/chart-account.service';

@Component({
  selector: 'app-create-article',
  standalone: false,
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent {
  form: FormGroup = new FormGroup({});
  fileData: any;
  imageUrl: any = '';
  article_types: any;
  categories: any[] = [];
  units: any[] = [];
  prices: any[] = [];
  menus: any[] = [];
  accounts: any[] = [];
  id: any;
  isLoad = false;

  constructor(public config: ConfigService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private categoryService: CategoryService,
    private unitService: UnitService,
    private alert: AlertService,
    private rest: RestService,
    private location: Location,
    private chartAccountService: ChartAccountService,
    // private route : ActivatedRoute,
  ) { }

  ngAfterViewInit() {
    $('.form-group .form-control').on('focus blur change', function (e) {
      const val: any = $(this).val() || [];
      $(this).parents('.form-group').toggleClass('focused', (e.type === 'focus' || val.length > 0));
    }).trigger('blur');
  }

  ngOnInit(): void {
    this.initForm();
    this.route.params.subscribe(result => {
      this.id = result['id'];
      if (this.id) {
        this.articleService.show(this.id, response => {
          this.initForm(response);
        });
      }
    });
    this.categoryService.index((data) => {
      this.categories = data.data;
    });
    this.unitService.index((data) => {
      this.units = data.data;
    });
  }

  initForm(data?: any) {
    this.form = this.formBuilder.group({
      id: [data?.id],
      type: [data?.type || 'STOCKABLE', [Validators.required]],
      name: [data?.name || '', [Validators.required]],
      category_id: [data?.category_id],
      reference: [data?.reference || ''],
      barcode: [data?.barcode || ''],
      price: [data?.price || '0'],
      cost: [data?.cost || '0'],
      purchase_unit_id: [data?.purchase_unit_id],
      sale_unit_id: [data?.sale_unit_id],
      can_sale: [data?.can_sale],
      can_purchase: [data?.can_purchase],
      can_rented: [data?.can_rented],
      product_account_id: [data?.product_account_id],
      expense_account_id: [data?.expense_account_id],
      stock_account_id: [data?.stock_account_id],
      commodity_account_id: [data?.commodity_account_id],
    });
    this.imageUrl = data?.image || '';
    this.prices = data?.prices || [];
    this.menus = data?.menus || [];

    if (data?.product_account_id) {
      this.accounts.push(data?.product_account);
    }
    if (data?.expense_account_id) {
      this.accounts.push(data?.expense_account);
    }
    if (data?.stock_account_id) {
      this.accounts.push(data?.stock_account);
    }
    if (data?.commodity_account_id) {
      this.accounts.push(data?.commodity_account);
    }

    this.ngAfterViewInit();
  }

  store() {
    const formData = this.rest.asFormData(this.form);
    formData.append('image', this.fileData || '');

    // this.prices.forEach(elt => {
    //   formData.append('prices[]', elt);
    // });
    // this.menus.forEach(elt => {
    //   formData.append('menus[]', elt);
    // });

    formData.append('prices', JSON.stringify(this.prices));
    formData.append('menus', JSON.stringify(this.menus));

    this.isLoad = true;

    // this.articleService.store({...this.form.value, ...{prices: this.prices}, ...{menus: this.menus}}, data => {
    this.articleService.store(formData, data => {
      this.isLoad = false;
      this.alert.message('Produit enregistré avec succès.');
      this.location.back();
    });
  }

  addItem() {
    this.alert.openModal(AddPriceComponent, (result) => {
      if (result) {
        this.prices.push(result);
      }
    });
  }

  removeItem(index: number, item: any) {
    this.alert.confirm(result => {
      if (result) {
        if (item.id) {
          this.articleService.removePrice(item.id, (response) => {
            this.prices.splice(index, 1);
          });
        } else {
          this.prices.splice(index, 1);
        }
      }
    });
  }

  editItem(index: number, item: any) {
    this.alert.openModal(AddPriceComponent, (result) => {
      if (result) {
        this.prices[index] = result;
      }
    }, item);
  }

  addMenuItem() {
    this.alert.openModal(AddMenuItemComponent, (result) => {
      if (result) {
        this.menus.push(result);
      }
    });
  }

  removeMenuItem(index: number, item: any) {
    this.alert.confirm(result => {
      if (result) {
        if (item.id) {
          this.articleService.removeMenuItem(item.id, (response) => {
            this.menus.splice(index, 1);
          });
        } else {
          this.menus.splice(index, 1);
        }
      }
    });
  }

  editMenuItem(index: number, item: any) {
    this.alert.openModal(AddMenuItemComponent, (result) => {
      if (result) {
        this.menus[index] = result;
      }
    }, item);
  }

  filter(event) {
    this.chartAccountService.filter(response => {
      this.accounts = response;
    }, event.term);
  }
}
