import { Offer } from './../models/offer.model';
import { UserService } from './../../user/services/user.service';
import { OfferService } from './../services/offer.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subject, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.scss']
})
export class OfferFormComponent implements OnInit, OnDestroy {

  formGroup!: FormGroup;

  offer!: any;
  destroy$ = new Subject<boolean>();

  constructor(private formBuilder: FormBuilder, 
              private offerService: OfferService, 
              private userService: UserService,
              private router: Router,
              private route: ActivatedRoute
              ) {
                this.offer = {

                }
               }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params) => {
        if (params['id']) {
          return this.offerService.getOffer$(params['id']);
        }

        this.initializeForm();

        return of(null);
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        if (response) {
          this.offer = response;

          this.initializeForm();
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  initializeForm(): void {
    this.formGroup = this.formBuilder.group({
      id: this.offer.id,
      title: this.offer.title,
      category : this.offer.category,
      type: this.offer.type,
      description: this.offer.description
    });
  }

  onSubmit(): void {
    let loggedUser = this.userService.getLoggedUser();
    
    const offer: Offer = {
      id: this.formGroup.value.id,
      organizationId: loggedUser.id!,
      title: this.formGroup.value.title,
      category: this.formGroup.value.category,
      type: this.formGroup.value.type,
      description: this.formGroup.value.description,
      appliedUsers: [],
      userWhoLiked: []
    }

    let request$;

    if(offer.id)
      request$ = this.offerService.updateOffer$(offer);
    else
      request$ = this.offerService.createOffer$(offer);

    request$.subscribe(() => {
      this.router.navigate(['offers/dashboard']);
    })
  }
}
