import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { APP_API_URL } from '../../../env';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxPermissionsService } from 'ngx-permissions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
	public redirectUrl: string = '/';

  constructor(private http: HttpClient,
              private toastService: MatSnackBar,
              private permissionService: NgxPermissionsService,
              private router: Router) { }

  get isConnect(): boolean {
    return (this.token && this.user)?true:false;
  }

  get token(): any {
    return sessionStorage.getItem('token');
  }
  set token(value: string) {
    sessionStorage.setItem('token', value);
  }

  get permissions(): any[] {
    return this.user?.permissions || [];
  }
  get user(): any {
    const user = localStorage.getItem('user') ;
    if (user) {
      try {
        return JSON.parse(user);
      } catch (error) {
        return null;
      }
    }
    return null;
  }
  set user(value) {
    localStorage.setItem('user', JSON.stringify(value));
  }


  register(param: any, component?) {
    component.isLoad = true;

    this.http.post(`${APP_API_URL}auth/register`, param).subscribe({
      next: (response: any) => {
        this.token = response.token;
        this.user = response.user;

        component.isLoad = false;
        this.router.navigate([this.redirectUrl]);
	      this.redirectUrl = '/';
      },
      error: (error) => {
        component.isLoad = false;
      }
    });
  }

  login(param: any, component?) {
    if (component) {
      component.isLoad = true;
    }

    this.permissionService.flushPermissions();

    this.http.post(`${APP_API_URL}auth/login`, param).subscribe({
      next: (response: any) => {
        this.token = response.token;
        this.user = response.user;

        if (component) {
          component.isLoad = false;
        }

        this.toastService.open(response.message, 'OK', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          // panelClass: ["toast-success"]
        });

        this.permissionService.loadPermissions(response.user.permis || []);

        this.router.navigate([this.redirectUrl]);
	      this.redirectUrl = '/';
      },
      error: (error) => {
        if (component) {
          component.isLoad = false;
        }
      }
    });
  }

  forgotPassword(param: any, callback){
    this.http.post(`${APP_API_URL}auth/request-email`, param).subscribe({
      next: (response: any) => {
        callback(response);
      },
    });
  }

  passwordUpdate(param: any, component?) {
    component.isLoad = true;

    this.http.post(`${APP_API_URL}auth/password-update`, param).subscribe({
      next: (response: any) => {
        component.isLoad = false;
        this.router.navigate(['/aut/login']);
      },
      error: (error) => {
        component.isLoad = false;
      }
    });
  }

  sendVerificationMail(callback): void {
    this.http.post(`${APP_API_URL}auth/verification-send`, {}).subscribe({
      next: (response: any) => {
        callback(response);
      }
    });
  }

  logout() {
    // localStorage.clear();
    // sessionStorage.clear();
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    this.permissionService.flushPermissions();
    this.router.navigate(['/auth/login']);
  }

  me(callback: any) {
    this.http.get(`${APP_API_URL}user/me`).subscribe({
      next: (response: any) => {
        callback(response);
      }
    });
  }

  can(permissions: string|string []): boolean {
    const perms = this.user.permis;
    if (Array.isArray(permissions)) {
      for (let i = 0; i < permissions.length; i++) {
        const elt = permissions[i];
        if (perms.includes(elt)) {
          return true;
        }
      }
      return false;
    } else {
      return perms.includes(permissions);
    }
  }
}
