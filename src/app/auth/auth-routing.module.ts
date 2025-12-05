import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { NewPasswordComponent } from './pages/new-password/new-password.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';

export const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [GuestGuard],
    data: {
      title: 'Création du compte'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [GuestGuard],
    data: {
      title: 'Se connecter'
    }
  },
  {
    path: 'forgot-password',
    component: ResetPasswordComponent,
    canActivate: [GuestGuard],
    data: {
      title: 'Réinitialiser mon mot de passe'
    }
  },
  {
    path: 'reset-password',
    component: NewPasswordComponent,
    canActivate: [GuestGuard],
    data: {
      title: 'Nouveau mot de passe'
    }
  },
  {
    path: 'verify-email',
    component: VerifyEmailComponent,
    canActivate: [AuthGuard],
    data: {
      title: "Vérifier votre email"
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
