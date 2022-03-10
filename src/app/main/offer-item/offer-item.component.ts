import { UserService } from './../../user/services/user.service';
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
  @Input() currentRoute!: string;
  appliedUser!: User;
  hasApplied!: boolean;
  isLiked!: boolean;
  userWhoLikedId!: number;
  status!: string;

  @Output() appliedOfferEmitter: EventEmitter<Offer> = new EventEmitter();
  @Output() likedOfferEmitter: EventEmitter<Offer> = new EventEmitter();
  @Output() unlikedOfferEmitter: EventEmitter<Offer> = new EventEmitter();
  @Output() deletedOfferEmitter: EventEmitter<number> = new EventEmitter();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loggedUserId = this.userService.getLoggedUser().id!;
    this.appliedUser = this.offer.appliedUsers.find(u => u.id === this.loggedUserId)!;
    this.userWhoLikedId = this.offer.userWhoLiked.find(u => u === this.loggedUserId)!;
    this.hasApplied = false;
    this.isLiked = false;
    
    this.userService.getUser$(this.loggedUserId).subscribe(response => {
      this.status = response.offerStatus![this.offer.id!];
    })
  }
  
  onApply(): void {
    this.hasApplied = true;
    this.appliedOfferEmitter.emit(this.offer);
  }

  onLike(): void {
    this.isLiked = true;
    this.likedOfferEmitter.emit(this.offer);
  }

  onUnlike(): void {
    this.isLiked = false;
    this.userWhoLikedId = undefined!;
    this.unlikedOfferEmitter.emit(this.offer);
  }

  onDelete(): void {
    this.deletedOfferEmitter.emit(this.offer.id);
  }

}
