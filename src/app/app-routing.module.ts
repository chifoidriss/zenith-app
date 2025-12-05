import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/pages/home/home.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { routes as routesPartner } from './partner/partner-routing.module';
import { routes as routesCore } from './core/core-routing.module';
import { routes as routesAuth } from './auth/auth-routing.module';
import { routes as routesArticle } from './article/article-routing.module';
import { routes as routesAccount } from './account/account-routing.module';
import { routes as routesAccounting } from './accounting/accounting-routing.module';
import { routes as routesHosting } from './hosting/hosting-routing.module';
import { routes as routesBar } from './bar/bar-routing.module';
import { routes as routesInvoicing } from './invoice/invoice-routing.module';
import { routes as routesStocking } from './stocking/stocking-routing.module';
import { routes as routesRestaurant } from './restaurant/restaurant-routing.module';
import { routes as routesPay } from './pay/pay-routing.module';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    // loadChildren: () => import('./core/core.module').then(m => m.CoreModule)
    children: routesCore
  },
  {
    path: 'auth',
    // loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    children: routesAuth
  },
  {
    path: 'account',
    canActivate: [AuthGuard],
    // loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
    children: routesAccount
  },
  {
    path: 'accounting',
    canActivate: [AuthGuard],
    // loadChildren: () => import('./accounting/accounting.module').then(m => m.AccountingModule)
    children: routesAccounting
  },
  {
    path: 'articles',
    canActivate: [AuthGuard],
    // loadChildren: () => import('./article/article.module').then(m => m.ArticleModule)
    children: routesArticle
  },
  {
    path: 'hosting',
    canActivate: [AuthGuard],
    // loadChildren: () => import('./hosting/hosting.module').then(m => m.HostingModule)
    children: routesHosting
  },
  {
    path: 'bar',
    canActivate: [AuthGuard],
    // loadChildren: () => import('./bar/bar.module').then(m => m.BarModule)
    children: routesBar
  },
  {
    path: 'partners',
    canActivate: [AuthGuard],
    // loadChildren: () => import('./partner/partner.module').then(m => m.PartnerModule)
    children: routesPartner
  },
  {
    path: 'invoicing',
    canActivate: [AuthGuard],
    // loadChildren: () => import('./invoice/invoice.module').then(m => m.InvoiceModule)
    children: routesInvoicing
  },
  {
    path: 'stocking',
    canActivate: [AuthGuard],
    // loadChildren: () => import('./stocking/stocking.module').then(m => m.StockingModule)
    children: routesStocking
  },
  {
    path: 'restaurant',
    canActivate: [AuthGuard],
    // loadChildren: () => import('./restaurant/restaurant.module').then(m => m.RestaurantModule)
    children: routesRestaurant
  },
  {
    path: 'paying',
    canActivate: [AuthGuard],
    // loadChildren: () => import('./pay/pay.module').then(m => m.PayModule)
    children: routesPay
  },

  {
    path: '**',
    redirectTo: '/not-found',
    // component: HomeComponent,
    pathMatch: 'full'
  },
  // {
  //   path: '',
  //   component: HomeComponent,
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
