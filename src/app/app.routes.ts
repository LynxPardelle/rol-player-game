import { Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { ErrorComponent } from './core/components/error/error.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.routes),
  },
  {
    path: 'character',
    loadChildren: () =>
      import('./character/character.routes').then((m) => m.routes),
  },
  {
    path: '**',
    component: ErrorComponent,
  },
];
