import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OperationComponent } from './pages/operation/operation.component';
import { TransferComponent } from './pages/transfer/transfer.component';
import { WarehouseComponent } from './pages/warehouse/warehouse.component';
import { StockComponent } from './pages/stock/stock.component';
import { NewTransferComponent } from './pages/transfer/new-transfer/new-transfer.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      title: 'Analyse des stocks'
    }
  },
  {
    path: 'operations',
    component: OperationComponent,
    data: {
      title: 'Operations'
    }
  },
  {
    path: 'transfers',
    component: TransferComponent,
    data: {
      title: 'Transferts'
    }
  },
  {
    path: 'transfers/new',
    component: NewTransferComponent,
    data: {
      title: 'Nouveau transfert'
    }
  },
  {
    path: 'transfers/edit/:id',
    component: NewTransferComponent,
    data: {
      title: 'Modifier transfert'
    }
  },
  {
    path: 'transfers/:warehouse',
    component: TransferComponent,
    data: {
      title: 'Transferts'
    }
  },
  {
    path: 'warehouses',
    component: WarehouseComponent,
    data: {
      title: 'Entrepôts'
    }
  },
  {
    path: 'stocks',
    component: StockComponent,
    data: {
      title: 'Stocks'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockingRoutingModule { }
