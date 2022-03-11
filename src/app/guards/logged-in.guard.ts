import { UserService } from './../user/services/user.service';
import { Injectable } from "@angular/core";
import { CanLoad, Route, Router, UrlSegment } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanLoad{

  constructor(private userService: UserService, private router: Router) {}

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    const loggedUser = this.userService.getLoggedUser();

    if (loggedUser) {
      this.router.navigate(['/offers'])
      return false;
    }
    
    return true;
  }
}