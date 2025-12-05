import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { InternalErrorComponent } from './pages/internal-error/internal-error.component';
import { NotAuthorizedComponent } from './pages/not-authorized/not-authorized.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      title: 'Accueil'
    },
    pathMatch: 'full'
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
    data: {
      title: 'Page ou ressource non trouvée'
    },
  },
  {
    path: 'internal-error',
    component: InternalErrorComponent,
    data: {
      title: 'Erreur interne du serveur'
    },
  },
  {
    path: 'not-authorize',
    component: NotAuthorizedComponent,
    data: {
      title: 'Non autorisé'
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
