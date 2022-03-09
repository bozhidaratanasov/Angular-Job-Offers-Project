import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Offer } from '../models/offer.model';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  private url = `${environment.apiUrl}/offers`;

  constructor(private http: HttpClient) { }

  getOffers$(): Observable<Offer[]> {
    return this.http.get<Offer[]>(this.url);
  }
}
