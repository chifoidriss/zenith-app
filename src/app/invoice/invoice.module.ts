import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NewInvoiceComponent } from './pages/invoice/new-invoice/new-invoice.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddArticleComponent } from './pages/invoice/add-article/add-article.component';
import { IndexDeviseComponent } from './pages/index-devise/index-devise.component';
import { AddDeviseComponent } from './pages/index-devise/add-devise/add-devise.component';
import { IndexTaxeComponent } from './pages/index-taxe/index-taxe.component';
import { AddTaxeComponent } from './pages/index-taxe/add-taxe/add-taxe.component';
import { IndexPaymentComponent } from './pages/index-payment/index-payment.component';
import { NewPaymentComponent } from './pages/index-payment/new-payment/new-payment.component';
import { PaymentMethodComponent } from './pages/payment-method/payment-method.component';
import { AddPaymentMethodComponent } from './pages/payment-method/add-payment-method/add-payment-method.component';
import { DetailInvoiceComponent } from './pages/invoice/detail-invoice/detail-invoice.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';
import { FollowupComponent } from './pages/followup/followup.component';
import { DetailPaymentComponent } from './pages/index-payment/detail-payment/detail-payment.component';
import { DetailFollowComponent } from './pages/followup/detail-follow/detail-follow.component';
import { DocumentComponent } from './pages/document/document.component';
import { SettingComponent } from './pages/setting/setting.component';
import { ErrorInvoiceComponent } from './pages/invoice/error-invoice/error-invoice.component';
import { EditDocumentComponent } from './pages/document/edit-document/edit-document.component';
import { EditSocietyComponent } from './pages/document/edit-society/edit-society.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    NewInvoiceComponent,
    DashboardComponent,
    AddArticleComponent,
    IndexDeviseComponent,
    AddDeviseComponent,
    IndexTaxeComponent,
    AddTaxeComponent,
    IndexPaymentComponent,
    NewPaymentComponent,
    PaymentMethodComponent,
    AddPaymentMethodComponent,
    DetailInvoiceComponent,
    InvoiceComponent,
    FollowupComponent,
    DetailPaymentComponent,
    DetailFollowComponent,
    DocumentComponent,
    SettingComponent,
    ErrorInvoiceComponent,
    EditDocumentComponent,
    EditSocietyComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    // InvoiceRoutingModule,
    SharedModule
  ]
})
export class InvoiceModule { }
