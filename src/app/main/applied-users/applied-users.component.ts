import { Offer } from './../models/offer.model';
import { User } from './../../user/models/user.model';
import { OfferService } from './../services/offer.service';
import { UserService } from './../../user/services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-applied-users',
  templateUrl: './applied-users.component.html',
  styleUrls: ['./applied-users.component.scss']
})
export class AppliedUsersComponent implements OnInit {

  offerId!: number;
  offer!: Offer;
  appliedUsers!: User[];

  constructor(private userService: UserService, private offerService: OfferService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.offerId =  params['id'];
    });

    this.offerService.getOffer$(this.offerId).subscribe(response => {
      this.offer = response;
      this.appliedUsers = response.appliedUsers;
    });


  }

  onAccept(user: User) {
    user.offerStatus![this.offerId] = 'Accepted'; 
    this.userService.updateUser$(user).subscribe();
    this.offer.appliedUsers[this.offer.appliedUsers.indexOf(user)].isProcessed = true;
    this.offer.hiredUser = user;
    this.offerService.updateOffer$(this.offer).subscribe();
  }

  onReject(user: User) {
    user.offerStatus![this.offerId] = 'Rejected';
    this.userService.updateUser$(user).subscribe();
    this.offer.appliedUsers[this.offer.appliedUsers.indexOf(user)].isProcessed = true;
    this.offerService.updateOffer$(this.offer).subscribe();
  }

}
