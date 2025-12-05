import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import { IndexArticleComponent } from './pages/index-article/index-article.component';
import { IndexCategoryComponent } from './pages/index-category/index-category.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { IndexUnitComponent } from './pages/index-unit/index-unit.component';
import { AddUnitComponent } from './pages/index-unit/add-unit/add-unit.component';
import { DetailArticleComponent } from './pages/index-article/detail-article/detail-article.component';
import { AddCategoryComponent } from './pages/index-category/add-category/add-category.component';
import { CreateArticleComponent } from './pages/index-article/create-article/create-article.component';
import { AddPriceComponent } from './pages/index-article/create-article/add-price/add-price.component';
import { AddMenuItemComponent } from './pages/index-article/create-article/add-menu-item/add-menu-item.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    CreateArticleComponent,
    IndexArticleComponent,
    IndexCategoryComponent,
    AddCategoryComponent,
    AddUnitComponent,
    IndexUnitComponent,
    DashboardComponent,
    DetailArticleComponent,
    AddPriceComponent,
    AddMenuItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    // ArticleRoutingModule,
    SharedModule
  ]
})
export class ArticleModule { }
