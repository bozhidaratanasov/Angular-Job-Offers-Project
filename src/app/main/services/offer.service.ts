import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Offer } from '../models/offer.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  private url = `${environment.apiUrl}/offers`;

  constructor(private http: HttpClient) { }

  getOffers$(): Observable<Offer[]> {
    return this.http.get<Offer[]>(this.url);
  }

  getOffer$(id: number): Observable<Offer>{
    const url = `${this.url}/${id}`;

    return this.http.get<Offer>(url);
  }

  createOffer$(offer: Offer): Observable<Offer> {
    return this.http.post<Offer>(this.url, offer, httpOptions);
  }

  updateOffer$ (offer: Offer): Observable<Offer> {
    const url = `${this.url}/${offer.id}`;

    return this.http.put<Offer>(url, offer);
  }

  deleteOffer$(id: number): Observable<void> {
    const url = `${this.url}/${id}`;

    return this.http.delete<void>(url);
  }
}
