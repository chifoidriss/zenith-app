import { Component } from '@angular/core';
import { Paginate } from '../../../shared/models/paginate';
import { AlertService } from '../../../shared/services/alert.service';
import { CategoryService } from '../../services/category.service';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-index-category',
  standalone: false,
  templateUrl: './index-category.component.html',
  styleUrls: ['./index-category.component.scss']
})
export class IndexCategoryComponent {
  data: Paginate = new Paginate();
  loading: boolean = true;

  constructor(private alert: AlertService,
    private categoryService: CategoryService,
    public auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.categoryService.index(response => {
      this.data = response;
      this.loading = false;
    });
  }

  addItem() {
    this.alert.openModal(AddCategoryComponent, (result) => {
      if (result) {
        this.data.data.push(result);
      }
    });
  }

  removeItem(index: number, item: any) {
    this.alert.confirm(result => {
      if (result) {
        this.data.data.splice(index, 1);
        if (item.id) {
          this.categoryService.destroy(item.id, (response) => {});
        }
      }
    });
  }

  editItem(index: number, item: any) {
    this.alert.openModal(AddCategoryComponent, (result) => {
      if (result) {
        this.data.data[index] = result;
      }
    }, item);
  }
}
