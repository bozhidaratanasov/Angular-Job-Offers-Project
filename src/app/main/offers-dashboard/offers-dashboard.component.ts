import  Swal  from 'sweetalert2';
import { User } from './../../user/models/user.model';
import { UserService } from './../../user/services/user.service';
import { OfferService } from './../services/offer.service';
import { Offer } from './../models/offer.model';
import { Component, OnInit, OnChanges, Input, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-offers-dashboard',
  templateUrl: './offers-dashboard.component.html',
  styleUrls: ['./offers-dashboard.component.scss']
})
export class OffersDashboardComponent implements OnInit, OnDestroy{

  offers!: Offer[];
  loggedUser!: User;
  currentRoute!: string;
  users!: User[];
  navigationSubscription: any;

  constructor(private offerService: OfferService, private userService: UserService, private router: Router) {
    this.navigationSubscription = this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        if (this.loggedUser.role === 'user')
          this.loadAppliedOffers(this.loggedUser.id!);
        else if (this.loggedUser.role === 'organization')
          this.loadOrganizationOffers(this.loggedUser.id!);
      }
    })
   }

  ngOnInit(): void {
    this.loggedUser = this.userService.getLoggedUser()
    if (this.loggedUser.role === 'user')
      this.loadAppliedOffers(this.loggedUser.id!);
    else if (this.loggedUser.role === 'organization')
      this.loadOrganizationOffers(this.loggedUser.id!);

    this.currentRoute = this.router.url;
  }

  ngOnDestroy(): void {
    if(this.navigationSubscription)
      this.navigationSubscription.unsubscribe();
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

  onDelete(id: number) {
    
    Swal.fire({
      title: 'Warning!',
      text: 'Are you sure you want to delete this offer?',
      icon: 'warning',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then(({isConfirmed}) => {
      if (isConfirmed) {
        this.offerService.deleteOffer$(id).subscribe();
        
        this.router.navigate([this.router.url]);
      }
    });
  }
}
