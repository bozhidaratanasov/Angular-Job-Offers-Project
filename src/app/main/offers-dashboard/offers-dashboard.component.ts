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
  loggedUser!: User;

  constructor(private offerService: OfferService, private userService: UserService) { }

  ngOnInit(): void {
    this.loggedUser = this.userService.getLoggedUser()
    this.offers = this.loggedUser.myOffers!;
  }

}
