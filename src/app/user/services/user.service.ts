import { HeaderComponent } from './../../header/header.component';
import { Login } from './../models/login.model';
import { User } from './../models/user.model';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, map, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) { }

  createUser$(user: User): Observable<User> {
    return this.http.post<User>(this.url, user, httpOptions);
  }

  updateUser$(user: User): Observable<User> {
    const url = `${this.url}/${user.id}`;

    return this.http.put<User>(url, user);
  }

  getUser$(id: number): Observable<User> {
    const url = `${this.url}/${id}`;

    return this.http.get<User>(url);
  }

  deleteUser$(id: number): Observable<void> {
    const url = `${this.url}/${id}`;
    
    return this.http.delete<void>(url);
  }

  login$(data: Login): Observable<any> {
    return this.http.get<User[]>(this.url).pipe(
      map((response: User[]) => {
        const user = response.find(u => u.email === data.email && u.password === data.password);

        if (user) 
          return user;

        return null;
      })
    )
  }


  storeUserData(user: User): void{
    localStorage.setItem('loggedUser', JSON.stringify(user));
  }

  logout(): void {
    localStorage.removeItem('loggedUser');
  }

  getLoggedUser(): User {
    return JSON.parse(localStorage.getItem('loggedUser')!);
  }

  isLogged(): boolean {
    if (localStorage.getItem('loggedUser'))
      return true;
    
    return false;
  }


}
