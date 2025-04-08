import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: string;
  mileage?: string;
  image: string;
  location?: string;
}

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favoritesSubject = new BehaviorSubject<Car[]>([]);
  favorites$ = this.favoritesSubject.asObservable();

  constructor() {}

  getFavorites(): Car[] {
    return this.favoritesSubject.value;
  }

  addFavorite(car: Car): void {
    const currentFavorites = this.favoritesSubject.value;
    if (!this.isFavorite(car.id)) {
      this.favoritesSubject.next([...currentFavorites, car]);
    }
  }

  removeFavorite(carId: string): void {
    const currentFavorites = this.favoritesSubject.value;
    this.favoritesSubject.next(
      currentFavorites.filter((car) => car.id !== carId)
    );
  }

  isFavorite(carId: string): boolean {
    return this.favoritesSubject.value.some((car) => car.id === carId);
  }
}
