import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ThemeService, Theme } from '../../services/theme.service';
import { FavoritesService, Car } from '../../services/favorites.service';
import { SellComponent } from '../sell/sell.component';
import { FavoritesComponent } from '../favorites/favorites.component';
import { MessagesComponent } from '../messages/messages.component';

// Araç verileri
const carListings: Car[] = [
  {
    id: '1',
    make: 'Toyota',
    model: 'Corolla',
    year: 2019,
    price: '225.000 TL',
    mileage: '45.000 km',
    image:
      'https://images.unsplash.com/photo-1626072778346-0ab6604d39c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    location: 'İstanbul',
  },
  {
    id: '2',
    make: 'Honda',
    model: 'Civic',
    year: 2018,
    price: '245.000 TL',
    mileage: '60.000 km',
    image:
      'https://images.unsplash.com/photo-1605816988069-b11383b50717?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    location: 'Ankara',
  },
  {
    id: '3',
    make: 'Volkswagen',
    model: 'Passat',
    year: 2020,
    price: '375.000 TL',
    mileage: '30.000 km',
    image:
      'https://images.unsplash.com/photo-1632038229229-06c76eba7982?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    location: 'İzmir',
  },
  {
    id: '4',
    make: 'Mercedes',
    model: 'C-Class',
    year: 2017,
    price: '450.000 TL',
    mileage: '70.000 km',
    image:
      'https://images.unsplash.com/photo-1549399542-7e8ee6e432b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    location: 'Bursa',
  },
];

// Öne çıkan araç verileri
const featuredCars: Car[] = [
  {
    id: '5',
    make: 'BMW',
    model: 'X5',
    year: 2021,
    price: '750.000 TL',
    image:
      'https://images.unsplash.com/photo-1520031441872-265e4ff70366?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '6',
    make: 'Audi',
    model: 'A6',
    year: 2020,
    price: '650.000 TL',
    image:
      'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
  },
];

// Kategoriler
interface Category {
  id: string;
  name: string;
  icon: string;
}

const categories: Category[] = [
  { id: '1', name: 'Sedan', icon: '🚗' },
  { id: '2', name: 'SUV', icon: '🚙' },
  { id: '3', name: 'Hatchback', icon: '🏎️' },
  { id: '4', name: 'Lüks', icon: '✨' },
  { id: '5', name: 'Elektrikli', icon: '⚡' },
];

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SellComponent,
    FavoritesComponent,
    MessagesComponent,
  ],
})
export class MainComponent implements OnInit {
  theme: Theme;
  carListings = carListings;
  featuredCars = featuredCars;
  categories = categories;
  searchText = '';
  searchResults: Car[] = [];
  selectedCategory: string | null = null;
  filteredCars = carListings;
  activeTab = 'AnaSayfa';
  unreadMessageCount = 3;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private themeService: ThemeService,
    private favoritesService: FavoritesService
  ) {
    this.theme = this.themeService.getTheme();
  }

  ngOnInit(): void {
    this.themeService.theme$.subscribe((theme) => {
      this.theme = theme;
    });

    this.route.queryParams.subscribe((params) => {
      if (params['tab']) {
        this.changeTab(params['tab']);
      }
    });
  }

  // Tüm araçları birleştir
  get allCars(): Car[] {
    return [...this.carListings, ...this.featuredCars];
  }

  // Arama işlevi
  onSearchTextChange(): void {
    if (this.searchText.trim() === '') {
      this.searchResults = [];
      return;
    }

    const query = this.searchText.toLowerCase().trim();
    this.searchResults = this.allCars.filter((car) => {
      return (
        car.make.toLowerCase().includes(query) ||
        car.model.toLowerCase().includes(query) ||
        car.year.toString().includes(query) ||
        (car.location && car.location.toLowerCase().includes(query))
      );
    });
  }

  // Kategori seçme işlevi
  handleCategorySelect(categoryName: string): void {
    if (this.selectedCategory === categoryName) {
      // Aynı kategoriye tekrar tıklandığında filtreyi kaldır
      this.selectedCategory = null;
      this.filteredCars = this.carListings;
    } else {
      this.selectedCategory = categoryName;
      this.filterCarsByCategory(categoryName);
    }
  }

  // Kategoriye göre araçları filtrele
  filterCarsByCategory(categoryName: string): void {
    // Şimdilik basit bir filtreleme yapalım
    switch (categoryName) {
      case 'Sedan':
        this.filteredCars = this.carListings.filter((car) =>
          ['Corolla', 'Civic', 'C-Class'].includes(car.model)
        );
        break;
      case 'SUV':
        this.filteredCars = this.carListings.filter(
          (car) => car.model === 'X5'
        );
        break;
      case 'Hatchback':
        this.filteredCars = this.carListings.filter((car) =>
          ['Civic'].includes(car.model)
        );
        break;
      case 'Lüks':
        this.filteredCars = this.carListings.filter((car) =>
          ['Mercedes', 'BMW', 'Audi'].includes(car.make)
        );
        break;
      case 'Elektrikli':
        // Örnek veri setinde elektrikli araç yok
        this.filteredCars = [];
        break;
      default:
        this.filteredCars = this.carListings;
    }
  }

  // Profil sayfasına git
  handleProfilePress(): void {
    this.router.navigate(['/profile']);
  }

  // Favori ekleme/çıkarma
  toggleFavorite(car: Car): void {
    if (this.isFavorite(car.id)) {
      this.favoritesService.removeFavorite(car.id);
    } else {
      this.favoritesService.addFavorite(car);
    }
  }

  // Favori kontrolü
  isFavorite(carId: string): boolean {
    return this.favoritesService.isFavorite(carId);
  }

  // Tab değiştirme
  changeTab(tabName: string): void {
    this.activeTab = tabName;

    // Sayfa değiştiğinde temizlik yapıyoruz
    if (tabName === 'AnaSayfa') {
      this.searchText = '';
      this.searchResults = [];
    }

    // Mesajlar sayfasına geçtiğinde bütün mesajlar okunmuş sayılır
    if (tabName === 'Mesajlar') {
      this.unreadMessageCount = 0;
    }
  }

  // Araç detaylarına yönlendirme
  navigateToCarDetails(car: Car): void {
    this.router.navigate(['/car', car.id]);
  }

  // Filtreyi temizle
  clearFilter(): void {
    this.selectedCategory = null;
    this.filteredCars = this.carListings;
  }
}
