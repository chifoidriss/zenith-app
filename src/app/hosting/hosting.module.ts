import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { HostingRoutingModule } from './hosting-routing.module';
import { DayBookComponent } from './pages/day-book/day-book.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RoomComponent } from './pages/room/room.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    DayBookComponent,
    DashboardComponent,
    RoomComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    // HostingRoutingModule,
    SharedModule
  ]
})
export class HostingModule { }
