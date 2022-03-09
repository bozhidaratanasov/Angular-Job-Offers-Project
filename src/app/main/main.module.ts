import { MainRoutingModule } from './main-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OfferItemComponent } from './offer-item/offer-item.component';
import { OffersComponent } from './offers/offers.component';
import { OfferFormComponent } from './offer-form/offer-form.component';
import { OffersDashboardComponent } from './offers-dashboard/offers-dashboard.component';




@NgModule({
  declarations: [
  
    OfferItemComponent,
       OffersComponent,
       OfferFormComponent,
       OffersDashboardComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MainRoutingModule
  ],
})
export class MainModule { }