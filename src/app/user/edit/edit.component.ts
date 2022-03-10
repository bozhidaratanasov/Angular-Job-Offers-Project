import { Offer } from './../../main/models/offer.model';
import { OfferService } from './../../main/services/offer.service';
import { User } from './../models/user.model';
import { UserService } from './../services/user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  formGroup!: FormGroup;
  loggedUser!: User;
  user!: User;
  offers!: Offer[];

  constructor(private formBuilder: FormBuilder, 
              private userService: UserService, 
              private offerService: OfferService,
              private router: Router
              ) { }

  get nameFormControl(): FormControl {
    return this.formGroup.get('name') as FormControl;
  }

  get emailFormControl(): FormControl {
    return this.formGroup.get('email') as FormControl;
  }

  get passwordFormControl(): FormControl {
    return this.formGroup.get('password') as FormControl;
  }

  ngOnInit(): void {
    this.loggedUser = this.userService.getLoggedUser();

    this.userService.getUser$(this.loggedUser.id!).subscribe(response => {
      this.user = response;

      this.initializeForm();
 
    });

    this.initializeForm();
    
  }


  initializeForm(): void {
    this.formGroup = this.formBuilder.group({
      id: this.loggedUser.id,
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      password: [this.user.password, [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {

    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();

      return;
    }

    const user: User = {
      id: this.loggedUser.id,
      name: this.formGroup.value.name,
      email: this.formGroup.value.email,
      password: this.formGroup.value.password,
      role: this.user.role
    };

    if (this.user.role === 'user')
      user.offerStatus = this.user.offerStatus;

    this.userService.storeUserData(user);

    this.userService.updateUser$(user).subscribe();

    this.offerService.getOffers$().subscribe(response => {
      this.offers = response.filter(u => u.appliedUsers.find(user => user.id === this.loggedUser.id));

      for (let offer of this.offers) {
        for (let i = 0; i < offer.appliedUsers.length; i++) {
          if (offer.appliedUsers[i].id === this.loggedUser.id)
          {
            offer.appliedUsers.splice(i, 1);
            offer.appliedUsers.push(user);
            this.offerService.updateOffer$(offer).subscribe();
          }

          
          if (offer.hiredUser!.id === this.loggedUser.id) {
            offer.hiredUser = user;
            this.offerService.updateOffer$(offer).subscribe();
          
          }
        }
      }
    });

    this.router.navigate(['profile']);
  };
}
