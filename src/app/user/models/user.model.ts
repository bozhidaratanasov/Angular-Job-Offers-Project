import { Offer } from './../../main/models/offer.model';

export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  role: string;
  likedOffers?: Offer[];
  myOffers?: Offer[]
  
}