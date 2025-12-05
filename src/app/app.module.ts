import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './auth/interceptors/auth.interceptor';
import { ErrorInterceptor } from './auth/interceptors/error.interceptor';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import localeFr from '@angular/common/locales/fr';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';
import { AccountingModule } from './accounting/accounting.module';
import { ArticleModule } from './article/article.module';
import { BarModule } from './bar/bar.module';
import { CoreModule } from './core/core.module';
import { HostingModule } from './hosting/hosting.module';
import { InvoiceModule } from './invoice/invoice.module';
import { PartnerModule } from './partner/partner.module';
import { PayModule } from './pay/pay.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { StockingModule } from './stocking/stocking.module';

registerLocaleData(localeFr); // Register the desired locale data

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    AccountModule,
    AccountingModule,
    ArticleModule,
    AuthModule,
    BarModule,
    CoreModule,
    HostingModule,
    InvoiceModule,
    PartnerModule,
    PayModule,
    RestaurantModule,
    StockingModule,
    NgxMaskDirective
  ],
  providers: [
    DatePipe,
    provideAnimations(),
    provideHttpClient(withFetch(), withInterceptors([AuthInterceptor, ErrorInterceptor])),
    provideNgxMask(),
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
    { provide: LOCALE_ID, useValue: 'fr-FR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
