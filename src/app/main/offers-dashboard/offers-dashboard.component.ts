import { User } from './../../user/models/user.model';
import { UserService } from './../../user/services/user.service';
import { OfferService } from './../services/offer.service';
import { Offer } from './../models/offer.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offers-dashboard',
  templateUrl: './offers-dashboard.component.html',
  styleUrls: ['./offers-dashboard.component.scss']
})
export class OffersDashboardComponent implements OnInit {

  offers!: Offer[];
  loggedUser: User = this.userService.getLoggedUser();

  constructor(private offerService: OfferService, private userService: UserService) { }

  ngOnInit(): void {
    //this.loggedUser = this.userService.getLoggedUser()
    if (this.loggedUser.role === 'user')
      this.loadAppliedOffers(this.loggedUser.id!);
    else if (this.loggedUser.role === 'organization')
      this.loadOrganizationOffers(this.loggedUser.id!);
    
  }


  loadOrganizationOffers(id: number) {
    this.offerService.getOffers$().subscribe(response => {
      this.offers = response.filter(u => u.organizationId === id);
    })
  }

  loadAppliedOffers(id: number) {
    this.offerService.getOffers$().subscribe(response => {
      this.offers = response.filter(u => u.appliedUsers.find(user => user.id === id));
    })
  }

}
