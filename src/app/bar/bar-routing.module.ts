import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexBarComponent } from "./pages/index-bar/index-bar.component";

export const routes: Routes = [
  // {
  //   path: '',
  //   component: IndexBarComponent
  // },
  {
    path: 'articles',
    component: IndexBarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BarRoutingModule { }
