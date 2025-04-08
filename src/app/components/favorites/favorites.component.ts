import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, Theme } from '../../services/theme.service';
import { FavoritesService, Car } from '../../services/favorites.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  theme: Theme;
  favorites: Car[] = [];

  constructor(
    private themeService: ThemeService,
    private favoritesService: FavoritesService
  ) {
    this.theme = this.themeService.getTheme();
  }

  ngOnInit(): void {
    this.themeService.theme$.subscribe((theme) => {
      this.theme = theme;
    });

    this.getFavorites();

    // Favoriler değiştiğinde güncellenecek
    this.favoritesService.favorites$.subscribe(() => {
      this.getFavorites();
    });
  }

  getFavorites(): void {
    this.favorites = this.favoritesService.getFavorites();
  }

  removeFavorite(carId: string): void {
    this.favoritesService.removeFavorite(carId);
  }
}
