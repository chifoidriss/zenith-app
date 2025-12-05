import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantRoutingModule } from './restaurant-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MenusComponent } from './pages/menus/menus.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    MenusComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    // RestaurantRoutingModule,
    SharedModule
  ]
})
export class RestaurantModule { }
