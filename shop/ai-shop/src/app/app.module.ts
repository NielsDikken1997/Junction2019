import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule, MatCardModule } from  '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';
import { CartComponent } from './cart/cart.component';
import { TrackingComponent } from './tracking/tracking.component';
import { AddressComponent } from './address/address.component';
import { LastcheckComponent } from './lastcheck/lastcheck.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductDetailComponent,
    CheckoutComponent,
    LoginComponent,
    LastcheckComponent,
    AddressComponent,
    HomeComponent,
    CartComponent,
    TrackingComponent,
    AddressComponent,
    LastcheckComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
