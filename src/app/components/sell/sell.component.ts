import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../services/theme.service';
import { Subscription } from 'rxjs';

// Araç markaları
const carBrands = [
  'Acura',
  'Alfa Romeo',
  'Audi',
  'BMW',
  'Chevrolet',
  'Dodge',
  'Fiat',
  'Ford',
  'Honda',
  'Hyundai',
  'Infiniti',
  'Jaguar',
  'Jeep',
  'Kia',
  'Land Rover',
  'Lexus',
  'Mazda',
  'Mercedes-Benz',
  'Nissan',
  'Opel',
  'Peugeot',
  'Porsche',
  'Renault',
  'Subaru',
  'Suzuki',
  'Toyota',
  'Volkswagen',
  'Volvo',
];

// Yakıt tipleri
const fuelTypes = ['Benzin', 'Dizel', 'LPG', 'Elektrik', 'Hibrit'];

// Vites tipleri
const transmissionTypes = ['Manuel', 'Otomatik', 'Yarı Otomatik'];

// Renk seçenekleri
const colors = [
  'Siyah',
  'Beyaz',
  'Gri',
  'Kırmızı',
  'Mavi',
  'Yeşil',
  'Sarı',
  'Kahverengi',
  'Turuncu',
  'Mor',
  'Pembe',
  'Lacivert',
  'Gümüş',
  'Altın',
  'Bordo',
];

// Özellikleri tutan bir tip tanımı
type FeatureRecord = {
  airConditioner: boolean;
  sunroof: boolean;
  leatherSeats: boolean;
  navigation: boolean;
  parkingSensor: boolean;
  reverseCamera: boolean;
  cruiseControl: boolean;
  heatedSeats: boolean;
  bluetooth: boolean;
  abs: boolean;
  esp: boolean;
  airbag: boolean;
  [key: string]: boolean;
};

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class SellComponent implements OnInit, OnDestroy {
  theme: any = {};
  objectKeys = Object.keys;
  private themeSubscription: Subscription | undefined;

  carBrands = carBrands;
  fuelTypes = fuelTypes;
  transmissionTypes = transmissionTypes;
  colors = colors;

  images: string[] = [];

  // Dropdown durumları
  showBrandDropdown = false;
  showFuelTypeDropdown = false;
  showTransmissionDropdown = false;
  showColorDropdown = false;

  formData = {
    brand: '',
    model: '',
    year: null as number | null,
    kilometer: null as number | null,
    fuelType: '',
    transmission: '',
    color: '',
    price: null as number | null,
    description: '',
    features: {
      airConditioner: false,
      sunroof: false,
      leatherSeats: false,
      navigation: false,
      parkingSensor: false,
      reverseCamera: false,
      cruiseControl: false,
      heatedSeats: false,
      bluetooth: false,
      abs: false,
      esp: false,
      airbag: false,
    } as FeatureRecord,
    images: [] as string[],
  };

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.theme = this.themeService.getTheme();
    this.themeSubscription = this.themeService.theme$.subscribe((theme) => {
      this.theme = theme;
    });
  }

  ngOnDestroy(): void {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  // Form verilerini güncelle
  updateFormData(key: string, value: string): void {
    (this.formData as any)[key] = value;
  }

  // Özellik seçme
  toggleFeature(feature: string): void {
    this.formData.features[feature] = !this.formData.features[feature];
  }

  // Resim ekleme
  handleAddImage(): void {
    // Bu kısım gerçek bir uygulama için resim yükleme işlemlerini içerecektir
    // Şimdilik sadece basit bir uyarı gösterelim
    alert('Resim yükleme özelliği yakında eklenecek!');
  }

  // Form gönderme
  handleSubmit(): void {
    // Form verilerini kontrol et
    if (!this.validateForm()) {
      return;
    }

    // Form verilerini sunucuya gönderme işlemi
    console.log('Form verileri:', this.formData);
    alert('İlanınız başarıyla oluşturuldu! (Demo)');

    // Form verilerini sıfırla
    this.resetForm();
  }

  // Dropdown seçimi yapıldığında
  selectOption(field: string, value: string): void {
    // Type assertion to allow dynamic property access
    (this.formData as any)[field] = value;

    // Close dropdown
    this.toggleDropdown(field);
  }

  // Tüm dropdown'ları kapat
  closeAllDropdowns(): void {
    this.showBrandDropdown = false;
    this.showFuelTypeDropdown = false;
    this.showTransmissionDropdown = false;
    this.showColorDropdown = false;
  }

  // Dropdown'ları aç/kapat
  toggleDropdown(dropdown: string): void {
    this.closeAllDropdowns();
    switch (dropdown) {
      case 'brand':
        this.showBrandDropdown = !this.showBrandDropdown;
        break;
      case 'fuelType':
        this.showFuelTypeDropdown = !this.showFuelTypeDropdown;
        break;
      case 'transmission':
        this.showTransmissionDropdown = !this.showTransmissionDropdown;
        break;
      case 'color':
        this.showColorDropdown = !this.showColorDropdown;
        break;
    }
  }

  // Özellik ikonlarını getir
  getFeatureEmoji(feature: string): string {
    const emojis: { [key: string]: string } = {
      airConditioner: '❄️',
      sunroof: '☀️',
      leatherSeats: '🛋️',
      navigation: '🗺️',
      parkingSensor: '📍',
      reverseCamera: '📷',
      cruiseControl: '⚙️',
      heatedSeats: '🔥',
      bluetooth: '📱',
      abs: '🛑',
      esp: '🔄',
      airbag: '💨',
    };
    return emojis[feature] || '✓';
  }

  // Özellik etiketlerini getir
  getFeatureLabel(feature: string): string {
    const labels: { [key: string]: string } = {
      airConditioner: 'Klima',
      sunroof: 'Açılır Tavan',
      leatherSeats: 'Deri Koltuk',
      navigation: 'Navigasyon',
      parkingSensor: 'Park Sensörü',
      reverseCamera: 'Geri Görüş',
      cruiseControl: 'Hız Sabitleyici',
      heatedSeats: 'Isıtmalı Koltuk',
      bluetooth: 'Bluetooth',
      abs: 'ABS',
      esp: 'ESP',
      airbag: 'Hava Yastığı',
    };
    return labels[feature] || feature;
  }

  validateForm(): boolean {
    const requiredFields = [
      'brand',
      'model',
      'year',
      'kilometer',
      'fuelType',
      'transmission',
      'color',
      'price',
    ];

    for (const field of requiredFields) {
      if (!this.formData[field as keyof typeof this.formData]) {
        alert(`Lütfen ${this.getFieldLabel(field)} alanını doldurun.`);
        return false;
      }
    }

    return true;
  }

  getFieldLabel(field: string): string {
    const labels: { [key: string]: string } = {
      brand: 'Marka',
      model: 'Model',
      year: 'Yıl',
      kilometer: 'Kilometre',
      fuelType: 'Yakıt Tipi',
      transmission: 'Vites',
      color: 'Renk',
      price: 'Fiyat',
    };
    return labels[field] || field;
  }

  resetForm(): void {
    this.formData = {
      brand: '',
      model: '',
      year: null,
      kilometer: null,
      fuelType: '',
      transmission: '',
      color: '',
      price: null,
      description: '',
      features: {
        airConditioner: false,
        sunroof: false,
        leatherSeats: false,
        navigation: false,
        parkingSensor: false,
        reverseCamera: false,
        cruiseControl: false,
        heatedSeats: false,
        bluetooth: false,
        abs: false,
        esp: false,
        airbag: false,
      } as FeatureRecord,
      images: [],
    };
  }
}
