import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, Theme } from '../../services/theme.service';
import { FavoritesService, Car } from '../../services/favorites.service';
import { Router, ActivatedRoute } from '@angular/router';

interface CarDetail extends Car {
  details?: {
    adNumber?: string;
    adDate?: string;
    series?: string;
    modelDetail?: string;
    fuel?: string;
    transmission?: string;
    condition?: string;
    bodyType?: string;
    enginePower?: string;
    engineCapacity?: string;
    drive?: string;
    color?: string;
    warranty?: string;
    damaged?: string;
    plateNationality?: string;
    seller?: string;
    exchange?: string;
  };
}

// Araç verileri
const carData: CarDetail[] = [
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

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
})
export class CarDetailsComponent implements OnInit {
  theme: Theme;
  car: CarDetail | null = null;
  showBackButton = true;

  constructor(
    private themeService: ThemeService,
    private favoritesService: FavoritesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.theme = this.themeService.getTheme();
  }

  ngOnInit(): void {
    this.themeService.theme$.subscribe((theme) => {
      this.theme = theme;
    });

    // URL'den araç ID'sini al
    this.route.paramMap.subscribe((params) => {
      const carId = params.get('id');
      if (carId) {
        this.loadCarDetails(carId);
      }
    });
  }

  // Araç detaylarını yükle
  loadCarDetails(carId: string): void {
    // Gerçek uygulamada bir servis üzerinden veri çekilebilir
    this.car = carData.find((car) => car.id === carId) || null;

    // Araç detaylarını ekle
    if (this.car && !this.car.details) {
      this.car = {
        ...this.car,
        details: {
          adNumber: '1234787939',
          adDate: '22 Mart 2025',
          series: this.car.model,
          modelDetail: `${this.car.year} ${this.car.make} ${this.car.model}`,
          fuel: 'Benzin',
          transmission: 'Otomatik',
          condition: 'İkinci El',
          bodyType: 'Hatchback 5 kapı',
          enginePower: '130 hp',
          engineCapacity: '1199 cc',
          drive: 'Önden Çekiş',
          color: 'Mavi',
          warranty: 'Evet',
          damaged: 'Hayır',
          plateNationality: 'Türkiye (TR) Plakalı',
          seller: 'Galeriden',
          exchange: 'Evet',
        },
      };
    }
  }

  isFavorite(carId: string): boolean {
    return this.favoritesService.isFavorite(carId);
  }

  toggleFavorite(car: any): void {
    if (this.favoritesService.isFavorite(car.id)) {
      this.favoritesService.removeFavorite(car.id);
    } else {
      this.favoritesService.addFavorite(car);
    }
  }

  handleContactPress(): void {
    if (this.car) {
      // Mesajlar sekmesine yönlendir ve satıcıyla iletişime geç
      const sellerName = `${this.car.make} ${this.car.model} Satıcısı`;
      this.router.navigate(['/main'], {
        queryParams: {
          tab: 'Mesajlar',
          contactSeller: true,
          sellerId: this.car.id,
          sellerName: sellerName,
          carId: this.car.id,
          carMake: this.car.make,
          carModel: this.car.model,
          carYear: this.car.year,
        },
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/main']);
  }
}
