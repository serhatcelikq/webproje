import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Routes definitions
export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'main',
    loadComponent: () =>
      import('./components/main/main.component').then((m) => m.MainComponent),
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('./components/favorites/favorites.component').then(
        (m) => m.FavoritesComponent
      ),
  },
  {
    path: 'sell',
    loadComponent: () =>
      import('./components/sell/sell.component').then((m) => m.SellComponent),
  },
  {
    path: 'messages',
    loadComponent: () =>
      import('./components/messages/messages.component').then(
        (m) => m.MessagesComponent
      ),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./components/profile/profile.component').then(
        (m) => m.ProfileComponent
      ),
  },
  {
    path: 'car/:id',
    loadComponent: () =>
      import('./components/car-details/car-details.component').then(
        (m) => m.CarDetailsComponent
      ),
  },
  { path: '**', redirectTo: '/login' }, // Catch all route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
