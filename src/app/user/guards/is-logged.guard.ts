import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class IsLoggedGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.userService.login().pipe(map(user => {
      if (user) {
        return true;
      }
      else {
        sessionStorage.setItem('redirectUrl', state.url);
        this.router.navigate(['/login']);
        return false;
      }
    }));
  }

}
