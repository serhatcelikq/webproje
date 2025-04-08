import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent },
  { path: 'car/:id', component: CarDetailsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '**', redirectTo: '/login' },
];
