import  Swal  from 'sweetalert2';
import { Offer } from './../../main/models/offer.model';
import { OfferService } from './../../main/services/offer.service';
import { UserService } from './../services/user.service';
import { User } from './../models/user.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  loggedUserId!: number;
  currentUser!: User;
  offers!: Offer[]
  offersCount!: number;

  constructor(private userService: UserService, private offerService: OfferService, private router: Router) { }

  ngOnInit(): void {
    this.loggedUserId = this.userService.getLoggedUser().id!;
    this.userService.getUser$(this.loggedUserId!).subscribe(response => {
      this.currentUser = response;

      if (this.currentUser.role === 'user')
        this.getUserOffersCount();

      else
        this.getOrganizationOffersCount();
    });
  }

  getUserOffersCount(): void {
    this.offerService.getOffers$().subscribe(response => {
      this.offers = response.filter(u => u.appliedUsers.find(user => user.id === this.loggedUserId));
      this.offersCount = this.offers.length;
    });
  }

  getOrganizationOffersCount(): void {
    this.offerService.getOffers$().subscribe(response => {
      this.offersCount = response.filter(u => u.organizationId === this.loggedUserId).length;
    })
  }

  onDelete(): void {

    Swal.fire({
      title: 'Warning!',
      text: 'Are you sure you want to delete your account?',
      icon: 'warning',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then(({isConfirmed}) => {
      if (isConfirmed) {
        
        this.userService.deleteUser$(this.loggedUserId).subscribe();
        this.userService.logout();
        this.router.navigate(['login']);

        if (this.offers) {
          for (let offer of this.offers) {
            for (let i = 0; i < offer.appliedUsers.length; i++) {
              if (offer.appliedUsers[i].id === this.loggedUserId)
              {
                offer.appliedUsers.splice(i, 1);
                this.offerService.updateOffer$(offer).subscribe();
              }
            }
          }
        }
      }
    });
  }
}
