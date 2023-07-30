import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  token: any

  constructor(private route: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.token = localStorage.getItem('token');

    if(this.token != undefined)
    {
      const payload = atob(this.token.split('.')[1]); // decode payload of token
      const parsedPayload = JSON.parse(payload); // convert payload into an Object

      if(!(parsedPayload.exp > Date.now() / 1000))
      {
        this.route.navigate(['/']);
      }
    }

    if (!this.token) {
      this.route.navigate(['/']);
    }
    return true

  }

}
