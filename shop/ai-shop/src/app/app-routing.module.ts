import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { LoginComponent } from './login/login.component';
import { DoneComponent } from './done/done.component';
import { PaymentComponent } from './payment/payment.component';
import { LastcheckComponent } from './lastcheck/lastcheck.component';
import { AddressComponent } from './address/address.component';
import { CartComponent } from './cart/cart.component';
import { TrackingComponent } from './tracking/tracking.component';
import { PredictionResolver } from './prediction.resolve';


const routes: Routes = [
  { path: 'checkout', component: CheckoutComponent },
  { path: 'login', component: LoginComponent, resolve: { 
    isShakyCustomer: PredictionResolver
   } },
  { path: 'payment', component: PaymentComponent, resolve: { 
    isShakyCustomer: PredictionResolver
   }  },
  { path: 'done', component: DoneComponent, resolve: { 
    isShakyCustomer: PredictionResolver
   }  },
  { path: 'lastcheck', component: LastcheckComponent },
  { path: 'address', component: AddressComponent, resolve: { 
    isShakyCustomer: PredictionResolver
   }  },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'cart', component: CartComponent },
  { path: 'tracking', component: TrackingComponent },
  { path: '', component: HomeComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    PredictionResolver
  ]
})
export class AppRoutingModule { }
