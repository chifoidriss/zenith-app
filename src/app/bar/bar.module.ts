import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BarRoutingModule } from './bar-routing.module';
import { IndexBarComponent } from './pages/index-bar/index-bar.component';
import {SharedModule} from "../shared/shared.module";
import { AddDrinkComponent } from './pages/index-bar/add-drink/add-drink.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    IndexBarComponent,
    AddDrinkComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    // BarRoutingModule,
    SharedModule
  ]
})
export class BarModule { }
