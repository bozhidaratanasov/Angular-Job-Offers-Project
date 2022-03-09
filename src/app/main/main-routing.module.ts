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
        path: '',
        pathMatch: 'full',
        component: OffersComponent
      }
    ]
  }
      
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
