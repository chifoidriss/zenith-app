import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NotAuthorizedComponent } from './pages/not-authorized/not-authorized.component';
import { InternalErrorComponent } from './pages/internal-error/internal-error.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    HomeComponent,
    NotFoundComponent,
    NotAuthorizedComponent,
    InternalErrorComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    // CoreRoutingModule,
    SharedModule,
  ]
})
export class CoreModule { }
