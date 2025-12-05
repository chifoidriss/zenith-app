import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexPartnerComponent } from './pages/index-partner/index-partner.component';
import { NewPartnerComponent } from './pages/new-partner/new-partner.component';

export const routes: Routes = [
  {
    path: ':type',
    component: IndexPartnerComponent,
    data: {
      title: 'Partenaires'
    }
  },
  {
    path: ':type/new',
    component: NewPartnerComponent,
    data: {
      title: 'Nouveau partenaire'
    }
  },
  {
    path: ':type/edit/:id',
    component: NewPartnerComponent,
    data: {
      title: 'Modification partenaire'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartnerRoutingModule { }
