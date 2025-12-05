import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartnerRoutingModule } from './partner-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NewPartnerComponent } from './pages/new-partner/new-partner.component';
import { IndexPartnerComponent } from './pages/index-partner/index-partner.component';
import { DetailPartnerComponent } from './pages/index-partner/detail-partner/detail-partner.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    NewPartnerComponent,
    IndexPartnerComponent,
    DetailPartnerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    // PartnerRoutingModule,
    SharedModule
  ]
})
export class PartnerModule { }
