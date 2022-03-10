import { User } from './../../user/models/user.model';
import { UserService } from './../../user/services/user.service';
import { OfferService } from './../services/offer.service';
import { Offer } from './../models/offer.model';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {

  offers!: Offer[];
  loggedUser!: User;
  userRole!: string;

  constructor(private offerService: OfferService, private userService: UserService) { }

  ngOnInit(): void {
    this.getOffers();
    this.loggedUser = this.userService.getLoggedUser();
    this.userRole = this.loggedUser.role;
  }

  getOffers(): void {
    this.offerService.getOffers$().subscribe( response => {
      this.offers = response;
    })
  }


  onOfferApplied(offer: Offer): void {
   
    offer.appliedUsers.push(this.loggedUser);
    this.offerService.updateOffer$(offer).subscribe();
    Swal.fire({
      title: 'Congratulations!',
      icon: 'success',
      text: 'You have successfully applied!'
    });
  }

  onOfferLiked(offer: Offer): void {
    // this.loggedUser.likedOffers?.push(offer);
    // this.userService.updateUser$(this.loggedUser).subscribe();

    // offer.likesCount += 1;
    // this.offerService.updateOffer$(offer).subscribe();

    offer.userWhoLiked.push(this.loggedUser.id!);
    this.offerService.updateOffer$(offer).subscribe();
    
  }

  onOfferUnliked(offer: Offer): void {
    // this.loggedUser.likedOffers?.splice(this.loggedUser.likedOffers.indexOf(offer), 1);
    // this.userService.updateUser$(this.loggedUser).subscribe();

    // offer.likesCount -= 1;
    // this.offerService.updateOffer$(offer).subscribe();

    offer.userWhoLiked.splice(offer.userWhoLiked.indexOf(this.loggedUser.id!), 1);
    this.offerService.updateOffer$(offer).subscribe();
  }

}
