import { OffersDashboardComponent } from './offers-dashboard/offers-dashboard.component';
import { OfferFormComponent } from './offer-form/offer-form.component';
import { OffersComponent } from './offers/offers.component';
import { MainComponent } from './main/main.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'offers',
        component: OffersComponent
      },
      {
        path: 'offers/create',
        component: OfferFormComponent
      },
      {
        path: 'offers/dashboard',
        component: OffersDashboardComponent,
      },
      {
        path: 'offers/edit/:id',
        component: OfferFormComponent
      },
      {
        path: '',
        pathMatch: 'full',
        component: OffersComponent
      }
    ],
    runGuardsAndResolvers: 'always'
  }
      
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
