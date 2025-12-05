import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockingRoutingModule } from './stocking-routing.module';
import { SharedModule } from '../shared/shared.module';
import { WarehouseComponent } from './pages/warehouse/warehouse.component';
import { TransferComponent } from './pages/transfer/transfer.component';
import { OperationComponent } from './pages/operation/operation.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StockComponent } from './pages/stock/stock.component';
import { AddWarehouseComponent } from './pages/warehouse/add-warehouse/add-warehouse.component';
import { AddOperationComponent } from './pages/operation/add-operation/add-operation.component';
import { AddStockComponent } from './pages/stock/add-stock/add-stock.component';
import { NewTransferComponent } from './pages/transfer/new-transfer/new-transfer.component';
import { DetailTransferComponent } from './pages/transfer/detail-transfer/detail-transfer.component';
import { AddArticleTransferItemComponent } from './pages/transfer/new-transfer/add-article-transfer-item/add-article-transfer-item.component';
import { ErrorTransferModalComponent } from './pages/transfer/error-transfer-modal/error-transfer-modal.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    WarehouseComponent,
    TransferComponent,
    OperationComponent,
    DashboardComponent,
    StockComponent,
    AddWarehouseComponent,
    AddOperationComponent,
    AddStockComponent,
    NewTransferComponent,
    DetailTransferComponent,
    AddArticleTransferItemComponent,
    ErrorTransferModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    // StockingRoutingModule,
    SharedModule
  ]
})
export class StockingModule { }
