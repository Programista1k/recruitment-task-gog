import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/landing-page/landing-page').then(m => m.LandingPage)
  },
  {
    path: '**',
    loadComponent: () => import('./features/page-not-found/page-not-found').then(m => m.PageNotFound)
  }
];
