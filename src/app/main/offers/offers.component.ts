import { UserService } from './../../user/services/user.service';
import { OfferService } from './../services/offer.service';
import { Offer } from './../models/offer.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {

  offers!: Offer[];
  userRole!: string;

  constructor(private offerService: OfferService, private userService: UserService) { }

  ngOnInit(): void {
    this.getOffers();
    this.userRole = this.userService.getLoggedUser().role;
  }

  getOffers() {
    this.offerService.getOffers$().subscribe( response => {
      this.offers = response;
    })
  }

}
