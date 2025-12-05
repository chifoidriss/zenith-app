import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProfileSettingComponent } from './pages/profile-setting/profile-setting.component';
import { SettingComponent } from './pages/setting/setting.component';
import { SecurityComponent } from './pages/security/security.component';
import { NotificationComponent } from './pages/notification/notification.component';
import { EditInformationComponent } from './components/edit-information/edit-information.component';
import { EditSettingAppComponent } from './components/edit-setting-app/edit-setting-app.component';
import { EditAccountComponent } from './components/edit-account/edit-account.component';
import { EditPasswordComponent } from './components/edit-password/edit-password.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { UserComponent } from './pages/user/user.component';
import { AddUserComponent } from './pages/user/add-user/add-user.component';
import { RolesComponent } from './pages/roles/roles.component';
import { AddRoleComponent } from './pages/roles/add-role/add-role.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ProfileSettingComponent,
    SettingComponent,
    SecurityComponent,
    NotificationComponent,
    EditInformationComponent,
    EditSettingAppComponent,
    EditAccountComponent,
    EditPasswordComponent,
    EditProfileComponent,
    UserComponent,
    AddUserComponent,
    RolesComponent,
    AddRoleComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    // AccountRoutingModule,
    SharedModule
  ]
})
export class AccountModule { }
