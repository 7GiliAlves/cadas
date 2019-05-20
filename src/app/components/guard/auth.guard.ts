import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // console.log('VERIFY');
    // console.log(localStorage['token']);

    if (localStorage['token'] === undefined) {
      this.router.navigate(['/login']);
    }

    if (localStorage['token'] !== 'null') {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
  }
}
