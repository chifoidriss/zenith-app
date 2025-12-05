import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartAccountComponent } from './pages/chart-account/chart-account.component';
import { EntriesComponent } from './pages/entries/entries.component';
import { JournalsComponent } from './pages/journals/journals.component';
import { NewEntryComponent } from './pages/entries/new-entry/new-entry.component';

export const routes: Routes = [
  {
    path: 'chart-accounts',
    component: ChartAccountComponent,
    data: {
      title: 'Plan Comptable'
    }
  },
  {
    path: 'entries',
    component: EntriesComponent,
    data: {
      title: 'Écritures comptables'
    }
  },
  {
    path: 'entries/new',
    component: NewEntryComponent,
    data: {
      title: 'Nouvelle écritures comptables'
    }
  },
  {
    path: 'entries/edit/:id',
    component: NewEntryComponent,
    data: {
      title: 'Édition écritures comptables'
    }
  },
  {
    path: 'journals',
    component: JournalsComponent,
    data: {
      title: 'Journaux'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountingRoutingModule { }
