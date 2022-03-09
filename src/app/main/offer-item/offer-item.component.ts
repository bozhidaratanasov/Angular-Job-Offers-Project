import { User } from './../../user/models/user.model';
import { Offer } from './../models/offer.model';
import { Component, EventEmitter, Input, OnInit, Output, DoCheck } from '@angular/core';

@Component({
  selector: 'app-offer-item',
  templateUrl: './offer-item.component.html',
  styleUrls: ['./offer-item.component.scss']
})
export class OfferItemComponent implements OnInit {

  @Input() offer!: Offer;
  @Input() userRole!: string;
  @Input() loggedUserId!: number;
  @Input() hasApplied!: boolean;
  appliedUser!: User;

  @Output() appliedOffer: EventEmitter<Offer> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.appliedUser = this.offer.appliedUsers.find(u => u.id === this.loggedUserId)!;
    this.hasApplied = false;
  }
  
  onApply(): void {
    this.appliedOffer.emit(this.offer);
  }

}
