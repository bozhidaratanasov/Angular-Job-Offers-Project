import { User } from './../user/models/user.model';
import { UserService } from './../user/services/user.service';
import { Component, DoCheck, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, DoCheck{

  isLogged!: boolean;
  loggedUser!: User;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.isLogged = this.userService.isLogged();
  }

  ngDoCheck(): void {
    this.isLogged = this.userService.isLogged();
    this.loggedUser = this.userService.getLoggedUser();
  }

  onLogout(): void {
    this.userService.logout();
    this.isLogged = false;
  }

}
