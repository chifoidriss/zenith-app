import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';

import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { MasterComponent } from './layouts/master/master.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoaderComponent } from './components/loader/loader.component';
import { AlertConfirmComponent } from './components/alert-confirm/alert-confirm.component';

import { TabsComponent } from './components/tabs/tabs.component';
import { EmptyDataComponent } from './components/empty-data/empty-data.component';
import { AlertErrorComponent } from './components/alert-error/alert-error.component';
import { PricePipe } from './pipes/price.pipe';
import { LocalePipe } from './pipes/locale.pipe';
import { ImageComponent } from './components/image/image.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { NavBackDirective } from './directives/nav-back.directive';
import { NavNextDirective } from './directives/nav-next.directive';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { DashComponent } from './components/dash/dash.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { UnityPipe } from './pipes/unity.pipe';
import { ApiInfoComponent } from './layouts/auth-layout/api-info/api-info.component';
// import { MDBBootstrapModulesPro } from '../../libs/ng-uikit-pro-standard/lib/mdb.module';


@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    MasterComponent,
    FooterComponent,
    AuthLayoutComponent,
    LoaderComponent,
    AlertConfirmComponent,
    TabsComponent,
    EmptyDataComponent,
    AlertErrorComponent,
    PricePipe,
    LocalePipe,
    ImageComponent,
    PaginationComponent,
    NavBackDirective,
    NavNextDirective,
    PageHeaderComponent,
    DashComponent,
    UnityPipe,
    ApiInfoComponent,
  ],
  imports: [
    RouterModule.forChild([]),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
    NgSelectModule,
    NgxPermissionsModule.forRoot()
    // SelectModule,
    // MDBBootstrapModulesPro.forRoot()
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
    HeaderComponent,
    SidebarComponent,
    MasterComponent,
    FooterComponent,
    AuthLayoutComponent,
    LoaderComponent,
    TabsComponent,
    EmptyDataComponent,
    PricePipe,
    LocalePipe,
    ImageComponent,
    PaginationComponent,
    NavBackDirective,
    NavNextDirective,
    PageHeaderComponent,
    NgSelectModule,
    NgxPermissionsModule,
    UnityPipe,
    // MDBBootstrapModulesPro,
  ],
})
export class SharedModule { }
