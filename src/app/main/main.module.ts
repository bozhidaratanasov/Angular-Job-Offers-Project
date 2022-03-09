import { MainRoutingModule } from './main-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OfferItemComponent } from './offer-item/offer-item.component';
import { OffersComponent } from './offers/offers.component';




@NgModule({
  declarations: [
  
    OfferItemComponent,
       OffersComponent
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