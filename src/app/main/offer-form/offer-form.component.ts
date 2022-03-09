import { UserService } from './../../user/services/user.service';
import { OfferService } from './../services/offer.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Offer } from '../models/offer.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.scss']
})
export class OfferFormComponent implements OnInit {

  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder, 
              private offerService: OfferService, 
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      title: [''],
      category : [''],
      type: [''],
      description: ['']
    });
  }

  onSubmit() {
    const offer: Offer = {
      title: this.formGroup.value.title,
      category: this.formGroup.value.category,
      type: this.formGroup.value.type,
      description: this.formGroup.value.description
    }

    let loggedUser = this.userService.getLoggedUser();
    loggedUser.myOffers?.push(offer);
    this.userService.storeUserData(loggedUser);

    this.offerService.createOffer$(offer).subscribe();
    this.userService.updateUser$(loggedUser).subscribe();

    this.router.navigate(['offers/dashboard'])
  }
}
