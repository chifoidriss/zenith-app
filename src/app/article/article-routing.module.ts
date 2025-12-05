import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexArticleComponent } from './pages/index-article/index-article.component';
import { IndexCategoryComponent } from './pages/index-category/index-category.component';
import { CreateArticleComponent } from './pages/index-article/create-article/create-article.component';
import { IndexUnitComponent } from './pages/index-unit/index-unit.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: IndexArticleComponent,
    data: {
      title: 'Articles'
    }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: {
      title: 'Articles'
    }
  },
  {
    path: 'new-article',
    component: CreateArticleComponent,
    data: {
      title: 'Nouveau produit'
    }
  },
  {
    path: 'edit-article/:id',
    component: CreateArticleComponent,
    data: {
      title: 'Nouveau produit'
    }
  },
  {
    path: 'categories',
    component: IndexCategoryComponent,
    data: {
      title: 'Catégories'
    }
  },
  {
    path: 'units',
    component: IndexUnitComponent,
    data: {
      title: 'Unités de mesures'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule { }
