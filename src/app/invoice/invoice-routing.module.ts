import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceComponent } from './pages/invoice/invoice.component';
import { NewInvoiceComponent } from './pages/invoice/new-invoice/new-invoice.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NewPaymentComponent } from './pages/index-payment/new-payment/new-payment.component';
import { IndexPaymentComponent } from './pages/index-payment/index-payment.component';
import { PaymentMethodComponent } from './pages/payment-method/payment-method.component';
import { IndexTaxeComponent } from './pages/index-taxe/index-taxe.component';
import { IndexDeviseComponent } from './pages/index-devise/index-devise.component';
import { FollowupComponent } from './pages/followup/followup.component';
import { SettingComponent } from './pages/setting/setting.component';
import { DocumentComponent } from './pages/document/document.component';

export const routes: Routes = [
  {
    path: 'payments/:type',
    component: IndexPaymentComponent,
    data: {
      title: 'Paiements'
    }
  },
  {
    path: 'payments/:type/new',
    component: NewPaymentComponent,
    data: {
      title: 'Nouveau paiement'
    }
  },
  {
    path: 'payments/:type/edit/:id',
    component: NewPaymentComponent,
    data: {
      title: 'Édition paiement'
    }
  },
  {
    path: 'followup/:type',
    component: FollowupComponent,
    data: {
      title: 'Rapport de suivi'
    }
  },

  {
    path: 'dashboard/:source',
    component: DashboardComponent,
    data: {
      title: 'Tableau de bord des factures'
    }
  },

  {
    path: ':invoice_type/:type',
    component: InvoiceComponent,
    data: {
      title: 'Factures'
    }
  },
  {
    path: ':invoice_type/:type/new',
    component: NewInvoiceComponent,
    data: {
      title: 'Nouvelle facture'
    }
  },
  {
    path: ':invoice_type/:type/edit/:id',
    component: NewInvoiceComponent,
    data: {
      title: 'Édition facture'
    }
  },
  {
    path: 'payment-methods',
    component: PaymentMethodComponent,
    data: {
      title: 'Méthodes de paiement'
    }
  },
  {
    path: 'taxes',
    component: IndexTaxeComponent,
    data: {
      title: 'Taxes et impôts'
    }
  },
  {
    path: 'devises',
    component: IndexDeviseComponent,
    data: {
      title: 'Devises'
    }
  },
  {
    path: 'settings',
    component: SettingComponent,
    data: {
      title: 'Paramètres généraux'
    }
  },
  {
    path: 'documents',
    component: DocumentComponent,
    data: {
      title: 'Paramètres des documents'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
