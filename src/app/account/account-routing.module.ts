import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileSettingComponent } from './pages/profile-setting/profile-setting.component';
import { SecurityComponent } from './pages/security/security.component';
import { SettingComponent } from './pages/setting/setting.component';
import { NotificationComponent } from './pages/notification/notification.component';
import { UserComponent } from './pages/user/user.component';
import { RolesComponent } from './pages/roles/roles.component';

export const routes: Routes = [
  {
    path: 'profile',
    component: ProfileSettingComponent,
    data: {
      title: 'Mon compte'
    }
  },
  {
    path: 'security',
    component: SecurityComponent,
    data: {
      title: 'Sécurité'
    }
  },
  {
    path: 'settings',
    component: SettingComponent,
    data: {
      title: 'Paramètres'
    }
  },
  {
    path: 'notifications',
    component: NotificationComponent,
    data: {
      title: 'Notifications'
    }
  },
  {
    path: 'users',
    component: UserComponent,
    data: {
      title: 'Utilisateurs'
    }
  },
  {
    path: 'roles',
    component: RolesComponent,
    data: {
      title: 'Roles'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
