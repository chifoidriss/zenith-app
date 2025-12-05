import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class VerifiedGuard {
  constructor (private auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.auth.isConnect) {
        if (this.auth.user.email_verified_at) {
          return true;
        } else {
          this.router.navigate(['/auth/verify-email']);
          return false;
        }
      } else {
        this.router.navigate(['/auth/login']);
        return false;
      }
  }

}
