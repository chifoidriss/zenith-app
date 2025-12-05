import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DayBookComponent } from './pages/day-book/day-book.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RoomComponent } from "./pages/room/room.component";

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    pathMatch: 'full'
  },
  {
    path: 'day-book',
    component: DayBookComponent
  },
  {
    path: 'rooms',
    component: RoomComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HostingRoutingModule { }
