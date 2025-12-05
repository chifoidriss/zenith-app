import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountingRoutingModule } from './accounting-routing.module';
import { NewChartAccountComponent } from './pages/chart-account/new-chart-account/new-chart-account.component';
import { SharedModule } from '../shared/shared.module';
import { ChartAccountComponent } from './pages/chart-account/chart-account.component';
import { JournalsComponent } from './pages/journals/journals.component';
import { EntriesComponent } from './pages/entries/entries.component';
import { NewEntryComponent } from './pages/entries/new-entry/new-entry.component';
import { NewJournalComponent } from './pages/journals/new-journal/new-journal.component';
import { AddAccountingEntryComponent } from './pages/entries/new-entry/add-accounting-entry/add-accounting-entry.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    NewChartAccountComponent,
    ChartAccountComponent,
    JournalsComponent,
    EntriesComponent,
    NewEntryComponent,
    NewJournalComponent,
    AddAccountingEntryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    // AccountingRoutingModule,
    SharedModule,
  ]
})
export class AccountingModule { }
